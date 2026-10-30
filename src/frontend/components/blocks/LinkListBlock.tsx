import { CmsLink } from '@/frontend/components/CmsLink'
import type { LinkListBlock as LinkListBlockData } from '@/payload-types'

export function LinkListBlock({ block }: { block: LinkListBlockData }) {
  return (
    <section className="link-list">
      {block.heading ? <h2>{block.heading}</h2> : null}
      <ul>
        {block.links.map((link, index) => (
          <li key={link.id || `${link.label}-${index}`}>
            <CmsLink link={link}>{link.label}</CmsLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
