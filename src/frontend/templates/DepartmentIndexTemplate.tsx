import Link from 'next/link'

import type { Department } from '@/payload-types'

export function DepartmentIndexTemplate({ departments }: { departments: Department[] }) {
  return (
    <article className="department-index">
      <header className="page-header">
        <h1>Departments</h1>
      </header>

      {departments.length ? (
        <ul className="record-list department-list">
          {departments.map((department) => (
            <li key={department.id}>
              <article className="department-summary">
                <h2>
                  <Link href={`/departments/${department.slug}`}>{department.name}</Link>
                </h2>
                {department.code ? <p>{department.code}</p> : null}
                <p>{department.overview}</p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No published departments are currently available.</p>
      )}
    </article>
  )
}
