import { Outlet, Link } from "react-router-dom"
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
      <Outlet />
    </div>
  )
}
