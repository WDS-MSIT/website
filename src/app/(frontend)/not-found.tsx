import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <article className="not-found-page">
      <header className="page-header">
        <h1>Page not found</h1>
      </header>
      <p>The requested page does not exist or is not currently published.</p>
      <p>
        <Link href="/">Return to the MSIT homepage</Link>
      </p>
    </article>
  )
}
