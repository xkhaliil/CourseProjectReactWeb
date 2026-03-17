import { Link } from "react-router-dom"
import games from "../../shared/games"

export function HomePage() {
  return (
    <>
      <h1>Games</h1>
      <ul>
        {Object.entries(games).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/play/${slug}`}>Play {title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
