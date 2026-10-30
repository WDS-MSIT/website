export const parsePage = (value: string | string[] | undefined): number => {
  const parsed = Number(Array.isArray(value) ? value[0] : value)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1
}
