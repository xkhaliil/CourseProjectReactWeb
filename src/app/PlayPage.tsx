import { Link, useParams } from "react-router-dom"
import games from "../games"

const PlayPage: React.FC = () => {
  const { slug } = useParams()

  const game = slug && games[slug]
  if (!game) {
    return (
      <>
        <h1>Error</h1>
        <p>Cannot find game {slug}.</p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </>
    )
  }

  const { title, Play } = game

  return (
    <>
      <h1>Play {title}</h1>
      <Play />
    </>
  )
}

export default PlayPage
