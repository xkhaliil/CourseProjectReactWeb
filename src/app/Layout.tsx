import { Outlet, Link } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import styles from "./App.module.css"

export const Layout = () => {
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Play
        </Link>
        <Link to="/leaderboard" className={styles.navLink}>
          Leaderboard
        </Link>
      </nav>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}
