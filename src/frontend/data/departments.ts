import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Department, Facility, Person, Programme } from '@/payload-types'

export type DepartmentPageData = {
  department: Department
  facilities: Facility[]
  people: Person[]
  programmes: Programme[]
}

export const findDepartments = cache(async (): Promise<Department[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'departments',
    depth: 0,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs
})

export const findDepartmentBySlug = cache(
  async (slug: string): Promise<DepartmentPageData | undefined> => {
    const payload = await getPublicPayload()
    const departmentResult = await payload.find({
      collection: 'departments',
      depth: 0,
      draft: false,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
    })
    const department = departmentResult.docs[0]

    if (!department) return undefined

    const published = {
      equals: 'published' as const,
    }
    const [programmesResult, peopleResult, facilitiesResult] = await Promise.all([
      payload.find({
        collection: 'programmes',
        depth: 1,
        draft: false,
        limit: 100,
        overrideAccess: false,
        pagination: false,
        sort: 'name',
        where: {
          and: [{ department: { equals: department.id } }, { _status: published }],
        },
      }),
      payload.find({
        collection: 'people',
        depth: 1,
        draft: false,
        limit: 500,
        overrideAccess: false,
        pagination: false,
        sort: ['sortOrder', 'name'],
        where: {
          and: [{ departments: { in: [department.id] } }, { _status: published }],
        },
      }),
      payload.find({
        collection: 'facilities',
        depth: 1,
        draft: false,
        limit: 100,
        overrideAccess: false,
        pagination: false,
        sort: 'sortOrder',
        where: {
          and: [{ department: { equals: department.id } }, { _status: published }],
        },
      }),
    ])

    return {
      department,
      facilities: facilitiesResult.docs,
      people: peopleResult.docs,
      programmes: programmesResult.docs,
    }
  },
)
