import Link from 'next/link'

export function Pagination({
  basePath,
  hasNextPage,
  hasPrevPage,
  page,
  totalPages,
}: {
  basePath: string
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Pagination" className="pagination">
      <p>
        Page {page} of {totalPages}
      </p>
      <ul>
        {hasPrevPage ? (
          <li>
            <Link href={`${basePath}?page=${page - 1}`} rel="prev">
              Previous
            </Link>
          </li>
        ) : null}
        {hasNextPage ? (
          <li>
            <Link href={`${basePath}?page=${page + 1}`} rel="next">
              Next
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
