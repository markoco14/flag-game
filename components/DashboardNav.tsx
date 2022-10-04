import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from 'next/router'

export default function DashboardNav() {
    const router = useRouter()
    console.log(router);


    return (
        <nav className={`${styles.flex} ${styles.flex_column} ${styles.dashboard_nav}`}>
          <Link href="/teachers"><a>Home</a></Link>
          <Link href="/teachers/flags"><a>Flags</a></Link>
          <Link href="#"><a>Facts</a></Link>
          <Link href="#"><a>Homework</a></Link>
          <Link href="#"><a>Common Mistakes</a></Link>
          <Link href="#"><a>Reports</a></Link>

          {router.pathname === "/mario" && (
          <>
            <h2>Admin Links</h2>
            <Link href="#"><a>Weekly Reports</a></Link>
            <Link href="#"><a>Teacher Prep</a></Link>
          </>
          )}
        </nav>
    );
}