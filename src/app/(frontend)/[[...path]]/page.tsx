import WebsiteRoot from '@/website/WebsiteRoot'

// Every public URL goes to the website's own router (src/website/App.jsx).
// /admin and /api stay with Payload through the (payload) route group.
export default function WebsitePage() {
  return <WebsiteRoot />
}
