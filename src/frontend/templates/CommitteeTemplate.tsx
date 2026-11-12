import Link from 'next/link'

import { findSafeHref } from '@/frontend/data/urls'
import type { Committee } from '@/payload-types'

export function CommitteeTemplate({ committee }: { committee: Committee }) {
  return (
    <article className="committee-page">
      <header className="page-header">
        <h1>{committee.name}</h1>
      </header>
      {committee.members?.length ? (
        <section aria-labelledby="committee-members-heading" className="content-section">
          <h2 id="committee-members-heading">Members</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Committee role</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {committee.members.map((member, index) => (
                <tr key={member.id || index}>
                  <th scope="row">
                    {member.person && typeof member.person === 'object' ? (
                      <Link href={`/people/${member.person.slug}`}>{member.name}</Link>
                    ) : (
                      member.name
                    )}
                  </th>
                  <td>{member.designation || ''}</td>
                  <td>{member.committeeRole || ''}</td>
                  <td>
                    {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
                    {member.phone ? (
                      <>
                        <br />
                        <a href={`tel:${member.phone}`}>{member.phone}</a>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
      {committee.links?.length ? (
        <section aria-labelledby="committee-links-heading" className="content-section">
          <h2 id="committee-links-heading">Related links</h2>
          <ul>
            {committee.links.map((link, index) => {
              const href = findSafeHref(link.url)
              return href ? (
                <li key={link.id || index}>
                  <a href={href}>{link.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
