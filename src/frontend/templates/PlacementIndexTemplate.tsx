import Link from 'next/link'
import type { PlacementYear } from '@/payload-types'
export function PlacementIndexTemplate({ years }: { years: PlacementYear[] }) {
  return (
    <article className="placement-index">
      <header className="page-header">
        <h1>Placements</h1>
      </header>
      {years.length ? (
        <table>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Status</th>
              <th scope="col">Offers</th>
              <th scope="col">Highest package</th>
              <th scope="col">Average package</th>
            </tr>
          </thead>
          <tbody>
            {years.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <Link href={`/placements/${item.year}`}>{item.year}</Link>
                </th>
                <td>{item.placementStatus}</td>
                <td>{item.offerCount ?? ''}</td>
                <td>{item.highestPackageLpa != null ? `${item.highestPackageLpa} LPA` : ''}</td>
                <td>{item.averagePackageLpa != null ? `${item.averagePackageLpa} LPA` : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No published placement years are currently available.</p>
      )}
    </article>
  )
}
