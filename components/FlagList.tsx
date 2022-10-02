import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";

export default function FlagList() {

    return (
        <article className={`${styles.card}`}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Recent Flags</h2>
                <Link href="#"><a>See All</a></Link>
            </div>
            <ul>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L8 W5 D2</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L8 W5 D1</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L5 W5 D2</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L5 W5 D1</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L4 W5 D2</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L4 W5 D1</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L12 W5 D2</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <p>L12 W5 D1</p>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
            </ul>
        </article>
    );
}