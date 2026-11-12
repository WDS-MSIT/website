import Link from 'next/link'

import { RichTextContent } from '@/frontend/components/RichTextContent'
import { findSafeHref } from '@/frontend/data/urls'
import type { Document, Programme } from '@/payload-types'

const label = (value: string): string =>
  value.replaceAll('-', ' ').replace(/^./, (character) => character.toUpperCase())

const documentHref = (document: Document): string | undefined =>
  findSafeHref(document.url || document.legacyUrl)

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'Asia/Kolkata' }).format(
    new Date(value),
  )

export function ProgrammeTemplate({ programme }: { programme: Programme }) {
  const department = typeof programme.department === 'object' ? programme.department : undefined
  const documents = (programme.documents || []).filter(
    (document): document is Document =>
      typeof document === 'object' && Boolean(documentHref(document)),
  )

  return (
    <article className="programme-page">
      <header className="page-header">
        <h1>{programme.name}</h1>
        {programme.shortName ? <p>{programme.shortName}</p> : null}
        <dl>
          <div>
            <dt>Code</dt>
            <dd>{programme.code}</dd>
          </div>
          <div>
            <dt>Degree</dt>
            <dd>{programme.degree}</dd>
          </div>
          <div>
            <dt>Level</dt>
            <dd>{label(programme.level)}</dd>
          </div>
          {programme.durationYears ? (
            <div>
              <dt>Duration</dt>
              <dd>
                {programme.durationYears} year{programme.durationYears === 1 ? '' : 's'}
              </dd>
            </div>
          ) : null}
          {department ? (
            <div>
              <dt>Department</dt>
              <dd>
                <Link href={`/departments/${department.slug}`}>{department.name}</Link>
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      {programme.description ? (
        <section aria-labelledby="programme-description-heading" className="content-section">
          <h2 id="programme-description-heading">About the programme</h2>
          <RichTextContent data={programme.description} />
        </section>
      ) : null}

      {programme.intakes?.length ? (
        <section aria-labelledby="programme-intake-heading" className="content-section">
          <h2 id="programme-intake-heading">Intake</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Academic year</th>
                <th scope="col">Shift</th>
                <th scope="col">Seats</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {programme.intakes.map((intake, index) => (
                <tr key={intake.id || index}>
                  <td>{intake.academicYear || 'Not specified'}</td>
                  <td>{label(intake.shift)}</td>
                  <td>{intake.seats}</td>
                  <td>{intake.sourceNote || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {programme.educationalObjectives?.length ? (
        <section aria-labelledby="programme-objectives-heading" className="content-section">
          <h2 id="programme-objectives-heading">Programme educational objectives</h2>
          <dl>
            {programme.educationalObjectives.map((objective, index) => (
              <div key={objective.id || index}>
                <dt>{objective.code}</dt>
                <dd>{objective.statement}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {programme.programmeOutcomes?.length ? (
        <section aria-labelledby="programme-outcomes-heading" className="content-section">
          <h2 id="programme-outcomes-heading">Programme outcomes</h2>
          <dl>
            {programme.programmeOutcomes.map((outcome, index) => (
              <div key={outcome.id || index}>
                <dt>
                  {outcome.code}
                  {outcome.title ? ` — ${outcome.title}` : ''}
                </dt>
                <dd>{outcome.statement}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {programme.programmeSpecificOutcomes?.length ? (
        <section aria-labelledby="programme-specific-outcomes-heading" className="content-section">
          <h2 id="programme-specific-outcomes-heading">Programme-specific outcomes</h2>
          <dl>
            {programme.programmeSpecificOutcomes.map((outcome, index) => (
              <div key={outcome.id || index}>
                <dt>{outcome.code}</dt>
                <dd>{outcome.statement}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {documents.length || programme.legacyResources?.length ? (
        <section aria-labelledby="programme-resources-heading" className="content-section">
          <h2 id="programme-resources-heading">Curriculum and resources</h2>
          <ul>
            {documents.map((document) => (
              <li key={document.id}>
                <a href={documentHref(document)}>{document.title}</a>
              </li>
            ))}
            {(programme.legacyResources || []).map((resource, index) => {
              const href = findSafeHref(resource.url)
              if (!href) return null

              return (
                <li key={resource.id || index}>
                  <a href={href}>{resource.label}</a> ({label(resource.type)})
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {programme.accreditations?.length ? (
        <section aria-labelledby="programme-accreditation-heading" className="content-section">
          <h2 id="programme-accreditation-heading">Accreditation</h2>
          <ul className="record-list accreditation-list">
            {programme.accreditations.map((accreditation, index) => (
              <li key={accreditation.id || index}>
                <article>
                  <h3>{accreditation.accreditingBody}</h3>
                  <p>Status: {label(accreditation.accreditationStatus)}</p>
                  {accreditation.validFrom || accreditation.validUntil ? (
                    <p>
                      Valid{' '}
                      {accreditation.validFrom ? `from ${formatDate(accreditation.validFrom)}` : ''}
                      {accreditation.validUntil
                        ? ` until ${formatDate(accreditation.validUntil)}`
                        : ''}
                    </p>
                  ) : null}
                  {accreditation.note ? <p>{accreditation.note}</p> : null}
                  {accreditation.evidence?.length || accreditation.legacyEvidence?.length ? (
                    <ul>
                      {(accreditation.evidence || []).map((evidence) => {
                        if (typeof evidence !== 'object') return null
                        const href = documentHref(evidence)
                        return href ? (
                          <li key={evidence.id}>
                            <a href={href}>{evidence.title}</a>
                          </li>
                        ) : null
                      })}
                      {(accreditation.legacyEvidence || []).map((evidence, evidenceIndex) => {
                        const href = findSafeHref(evidence.url)
                        return href ? (
                          <li key={evidence.id || evidenceIndex}>
                            <a href={href}>{evidence.label}</a>
                          </li>
                        ) : null
                      })}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
