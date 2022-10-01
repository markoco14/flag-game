import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";

export default function DashboardNav() {

    return (
        <nav className={`${styles.flex} ${styles.flex_column} ${styles.dashboard_nav}`}>
          <Link href="/teachers"><a>Dashboard</a></Link>
          <Link href="/teachers/flags"><a>Flags</a></Link>
          <Link href="#"><a>Facts</a></Link>
          <Link href="#"><a>Homework</a></Link>
          <Link href="#"><a>Common Mistakes</a></Link>
          <Link href="#"><a>Reports</a></Link>
        </nav>
    );
}