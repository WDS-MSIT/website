const allowedHrefProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:'])
const allowedResourceProtocols = new Set(['http:', 'https:'])

const isInternalPath = (value: string): boolean =>
  (value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#')

const hasProtocol = (value: string, protocols: Set<string>): boolean => {
  try {
    return protocols.has(new URL(value).protocol)
  } catch {
    return false
  }
}

export const findSafeHref = (value: null | string | undefined): string | undefined => {
  if (!value) return undefined
  if (isInternalPath(value)) return value
  return hasProtocol(value, allowedHrefProtocols) ? value : undefined
}

export const findSafeResourceUrl = (value: null | string | undefined): string | undefined => {
  if (!value) return undefined
  if (isInternalPath(value)) return value
  return hasProtocol(value, allowedResourceProtocols) ? value : undefined
}
