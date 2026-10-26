export type RichTextNode = {
  type: string
  version: number
  children?: RichTextNode[]
  text?: string
  direction?: 'ltr' | null
  format?: string | number
  indent?: number
  detail?: number
  mode?: string
  style?: string
}

export type RichText = {
  root: {
    type: 'root'
    children: RichTextNode[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

type LabDescription = { name: string; description?: RichText }
type LabSubject = { name: string; code?: string; classSemester?: string }
type LabSoftware = { name: string }

type ParsedLabContent = {
  description?: RichText
  lab?: {
    equipment?: RichText
    descriptions?: LabDescription[]
    subjects?: LabSubject[]
    software?: LabSoftware[]
  }
}

const normalize = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim()

const cleanLine = (value: string): string =>
  value
    .replace(/^\s*(?:[•●∙]|[-–])\s*/, '')
    .replace(/^\s*(?:\d+|[ivx]+)[.)]\s*/i, '')
    .trim()

const richText = (blocks: string[]): RichText | undefined => {
  const values = blocks.map(normalize).filter(Boolean)
  if (!values.length) return undefined
  return {
    root: {
      type: 'root',
      children: values.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: null,
        format: '',
        indent: 0,
        children: [
          { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
        ],
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const equipmentMarker =
  /^(?:total\s+number\s+of\s+(?:systems?|kits?|hardware)|systems?\s+configuration|list\s+of\s+equipments?|hardware\s+(?:configuration|equipment|equipment's|components?)|equipment\s+(?:available|details)?)/i
const subjectsMarker = /^(?:\d+\.?\s*)?subjects\s+taught\s*:/i
const softwareMarker = /^(?:software\s+(?:installed|used)|software\s*\/\s*hardware)\s*:/i
const aboutMarker = /^(?:\d+\.?\s*)?about\s+the\s+lab\s*:/i
const sectionMarker =
  /^(?:total\s+number|systems?\s+configuration|system\s+configuration|hardware\s+|equipment\s+|subjects\s+taught|software\s+(?:installed|used)|about\s+the\s+lab)/i

const isNamedLab = (line: string): boolean => {
  const value = line.replace(/^\s*(?:\d+|[ivx]+)[.)]\s*/i, '').trim()
  return (
    value.length < 180 &&
    /\blab\b/i.test(value) &&
    (/:\s*$/.test(value) || /\blab\s*$/i.test(value))
  )
}

const splitBullets = (line: string): string[] => {
  const values = line
    .split(/(?=[•●∙])/g)
    .map(cleanLine)
    .filter(Boolean)
  return values.length ? values : [cleanLine(line)].filter(Boolean)
}

const subjectCode = (line: string): string | undefined => {
  const pattern =
    '[A-Z]{2,8}\\s*-?\\s*\\d{2,4}(?:\\s*[A-Z]\\b)?(?:\\s*/\\s*(?:[A-Z]{2,8}\\s*-?\\s*)?\\d{2,4}(?:\\s*[A-Z]\\b)?)*'
  const explicit = line.match(new RegExp(`subject\\s+code\\s*[–-]\\s*(${pattern})`, 'i'))?.[1]
  if (explicit) return normalize(explicit)
  const parenthesized = line.match(new RegExp(`\\(\\s*(${pattern})\\s*\\)`, 'i'))?.[1]
  if (parenthesized) return normalize(parenthesized)
  return line.match(new RegExp(`\\b(${pattern})\\b`, 'i'))?.[1]
}

const parseSubject = (line: string): LabSubject => {
  const code = subjectCode(line)
  const pattern =
    '[A-Z]{2,8}\\s*-?\\s*\\d{2,4}(?:\\s*[A-Z]\\b)?(?:\\s*/\\s*(?:[A-Z]{2,8}\\s*-?\\s*)?\\d{2,4}(?:\\s*[A-Z]\\b)?)*'
  const classSemester = line.match(/\(([^)]*\bsem(?:ester)?\b[^)]*)\)/i)?.[1]
  const name = line
    .replace(new RegExp(`,?\\s*subject\\s+code\\s*[–-]\\s*${pattern}`, 'i'), '')
    .replace(new RegExp(`\\(\\s*${pattern}\\s*\\)`, 'i'), '')
    .replace(new RegExp(`\\s*[–-]?\\s*\\b${pattern}\\b`, 'i'), '')
    .replace(/\([^)]*\bsem(?:ester)?\b[^)]*\)/i, '')
    .replace(/[,;]\s*$/, '')
    .trim()
  return { name, code: code ? normalize(code) : undefined, classSemester }
}

const softwareValues = (line: string): string[] => {
  const suffix = line.replace(softwareMarker, '').trim()
  if (!suffix || /^[-–=]+$/.test(suffix)) return []
  if (/^(?:in|this|the|during|students)\b/i.test(suffix) || /[.!?]\s/.test(suffix)) return []
  return suffix
    .split(/[,;|]/)
    .map((value) => value.replace(/^[-–=]\s*/, '').trim())
    .filter((value) => value && value.length < 100 && !/[.!?]\s/.test(value))
}

export const parseLabContent = (blocks: string[]): ParsedLabContent => {
  const lines = blocks
    .flatMap((block, index) =>
      normalize(block)
        .split('\n')
        .filter((_line, lineIndex) => !(index === 0 && lineIndex === 0))
        .map(cleanLine),
    )
    .filter(Boolean)
  const root: string[] = []
  const equipment: string[] = []
  const subjects: LabSubject[] = []
  const software: LabSoftware[] = []
  const descriptions: LabDescription[] = []
  let state: 'root' | 'equipment' | 'subjects' | 'software' | 'description' = 'root'
  let currentDescription: { name: string; lines: string[] } | undefined
  let currentSubject: LabSubject | undefined

  const flushDescription = () => {
    if (currentDescription)
      descriptions.push({
        name: currentDescription.name,
        description: richText(currentDescription.lines),
      })
    currentDescription = undefined
  }
  const flushSubject = () => {
    if (currentSubject) subjects.push(currentSubject)
    currentSubject = undefined
  }

  for (const rawLine of lines) {
    const line = normalize(rawLine)
    if (!line || /^[-–=_]+$/.test(line)) continue
    if (/\blab\s+view\b/i.test(line)) continue

    if (isNamedLab(line) && !equipmentMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'description'
      currentDescription = { name: line.replace(/\s*:\s*$/, '').trim(), lines: [] }
      continue
    }
    if (equipmentMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'equipment'
      equipment.push(line)
      continue
    }
    if (subjectsMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'subjects'
      const remainder = line.replace(subjectsMarker, '').trim()
      if (remainder && !/^[-–]+$/.test(remainder)) currentSubject = parseSubject(remainder)
      continue
    }
    if (softwareMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'software'
      software.push(...softwareValues(line).map((name) => ({ name })))
      continue
    }
    const inlineSoftware = line.match(/\b(?:has|have)\s+(.+?)\s+software\s+installed\b/i)?.[1]
    if (inlineSoftware && inlineSoftware.length < 100) {
      software.push({ name: normalize(inlineSoftware) })
      continue
    }
    if (/\b(?:cpu|processor)\b/i.test(line) && /\b(?:ram|hdd|operating\s+system)\b/i.test(line)) {
      equipment.push(line)
      state = 'equipment'
      continue
    }
    if (aboutMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'description'
      currentDescription = { name: 'About the Lab', lines: [] }
      const remainder = line.replace(aboutMarker, '').trim()
      if (remainder && !/^[-–]+$/.test(remainder)) currentDescription.lines.push(remainder)
      continue
    }
    if (sectionMarker.test(line)) {
      flushDescription()
      flushSubject()
      state = 'root'
      root.push(line)
      continue
    }

    if (state === 'equipment') equipment.push(line)
    else if (state === 'subjects') {
      for (const value of splitBullets(line)) {
        if (/^class\s*\/\s*branch\s*:/i.test(value)) {
          if (currentSubject)
            currentSubject.classSemester = value.replace(/^class\s*\/\s*branch\s*:\s*/i, '').trim()
        } else if (/^(?:this|the|in this|in the|students)\b/i.test(value) && value.length > 120) {
          flushSubject()
          root.push(value)
          state = 'root'
        } else if (value) {
          flushSubject()
          currentSubject = parseSubject(value)
        }
      }
    } else if (state === 'software') {
      const values = softwareValues(line)
      if (values.length) software.push(...values.map((name) => ({ name })))
      else {
        root.push(line)
        state = 'root'
      }
    } else if (state === 'description' && currentDescription) currentDescription.lines.push(line)
    else root.push(line)
  }
  flushDescription()
  flushSubject()

  const lab: ParsedLabContent['lab'] = {}
  const equipmentText = richText(equipment)
  if (equipmentText) lab.equipment = equipmentText
  if (descriptions.length) lab.descriptions = descriptions
  if (subjects.length) lab.subjects = subjects
  if (software.length) lab.software = software
  const description = richText(root)
  return Object.keys(lab).length ? { description, lab } : { description }
}
