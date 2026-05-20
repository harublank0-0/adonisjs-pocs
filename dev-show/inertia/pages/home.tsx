import { Link } from '@adonisjs/inertia/react'

export default function Home() {
  return (
    <div className="hero">
      <h1>DevShow - Share what you have built</h1>
      <p>
        A small community showcase website to share your creations. Be it a project, tool,
        experiment, or anything they're proud of.
      </p>
      <div>
        <Link route="posts.index" className="button">
          Browse posts created by others
        </Link>
      </div>
    </div>
  )
}
