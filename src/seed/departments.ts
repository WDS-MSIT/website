import type { Payload } from 'payload'

type DepartmentSeed = {
  code?: string
  legacyPath: string
  missions: string[]
  name: string
  overview: string
  slug: string
  sortOrder: number
  vision?: string
}

const departments: DepartmentSeed[] = [
  {
    code: 'CSE',
    legacyPath: '/cse',
    missions: [
      'To impart quality engineering education to the students by providing effective teaching learning, research and application based innovative environment.',
      'To inculcate creativity team-spirit, leadership and ethical competence through continuous collective curricular, co-curricular and extracurricular activities.',
    ],
    name: 'Computer Science and Engineering',
    overview:
      'The Computer Science and Engineering Department was established in the year 2001 with the vision to offer Bachelor of Engineering degree in Computer Science & Engineering and impart world class education to the students. A group of well qualified, experienced and highly motivated faculty is engaged in providing quality education to the future computer engineer and keeping them abreast of the fast technological development.',
    slug: 'cse',
    sortOrder: 10,
    vision:
      'To maintain academic excellence aiming to produce competent technocrats imbibed with ethical values to serve the national emerging technological needs.',
  },
  {
    code: 'IT',
    legacyPath: '/it',
    missions: [
      "To develop 'educational pathways' so that students can take their career towards success.",
      'To imbibe curiosity and support innovativeness by providing guidance to use the technology effectively.',
      'To inculcate management skills, integrity and honesty through curricular, co-curricular and extra-curricular activities.',
    ],
    name: 'Information Technology',
    overview:
      'Information Technology is a prominent and rapidly developing field. The department provides computer laboratories, communication hardware and software, internet access, and guidance from qualified faculty to expose students to current and growing technologies.',
    slug: 'it',
    sortOrder: 20,
    vision:
      'To build a culture of innovation and research in students and make them capable to solve upcoming challenges of human life using computing.',
  },
  {
    code: 'ECE',
    legacyPath: '/ece',
    missions: [
      'To impart high quality education in the field of electronics & communication engineering to meet the national and global challenges.',
      'To provide adequate facilities, infrastructure and environment to the students as well as faculty members thereby creating an ambience conducive for teaching-learning process.',
      'To empower the students by enhancing their soft skills and ethics to create social awareness and imbibe national values so as to become good citizen.',
      'Creating a thrust for life-long learning through interaction with outside world on contemporary issues and technological trends.',
    ],
    name: 'Electronics and Communication Engineering',
    overview:
      'The Department of Electronics & Communication Engineering provides undergraduate education through experienced and developing faculty. Its research interests cover multiple sub-disciplines, and its laboratories and infrastructure are regularly upgraded with support from the institute and industry.',
    slug: 'ece',
    sortOrder: 30,
    vision:
      'ECE department strives to become a centre of quality education to meet the global technological needs for the benefit of mankind.',
  },
  {
    code: 'EEE',
    legacyPath: '/eee',
    missions: [
      'Imparting quality technical education to the students of Electrical and Electronics Engineering with the supportive environment, preparing them for competitive exams for higher education, employment, and entrepreneur practices.',
      'To confer the students with professional attitude, research aptitude, technical and communication skills with sensitivity towards the environment and society.',
    ],
    name: 'Electrical and Electronics Engineering',
    overview:
      'The Department of Electrical & Electronics Engineering provides undergraduate education in areas including power systems, high voltage engineering, advanced control systems, power electronics and drives, signal processing, and energy studies. Its curriculum and laboratories are updated as technology changes.',
    slug: 'eee',
    sortOrder: 40,
    vision:
      'To achieve global standards in the field of Electrical and Electronics Engineering to minimize skill gap between academia and industry.',
  },
  {
    legacyPath: '/ap',
    missions: [],
    name: 'Applied Sciences',
    overview:
      'The Department of Applied Sciences comprises Physics, Chemistry, Mathematics, Communication Skills, Organizational Behavior, Workshop, and Mechanical Engineering teaching. Its laboratories and workshop support foundational engineering education.',
    slug: 'applied-sciences',
    sortOrder: 50,
  },
]

export const seedDepartments = async (payload: Payload): Promise<void> => {
  for (const department of departments) {
    const existing = await payload.find({
      collection: 'departments',
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: department.slug,
        },
      },
    })

    if (existing.docs[0]) {
      payload.logger.info(`Department ${department.name} already exists; leaving it unchanged`)
      continue
    }

    await payload.create({
      collection: 'departments',
      data: {
        _status: 'draft',
        code: department.code,
        legacyPath: department.legacyPath,
        missions: department.missions.map((statement) => ({ statement })),
        name: department.name,
        overview: department.overview,
        slug: department.slug,
        sortOrder: department.sortOrder,
        vision: department.vision,
      },
      draft: true,
      overrideAccess: true,
    })

    payload.logger.info(`Seeded draft department ${department.name}`)
  }
}
