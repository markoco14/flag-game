import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";

export default function FlagList() {

    

    return (
        <article className={`${styles.card}`}>
            <h2>Your Flags</h2>
            <ul>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L8 W5 D2</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L8 W5 D1</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L5 W5 D2</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L5 W5 D1</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L4 W5 D2</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L4 W5 D1</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L12 W5 D2</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
                <li className={`${styles.flex} ${styles.flex_between}`}>
                    <span>L12 W5 D1</span>
                    <div className={`${styles.flex} ${styles.flex_gap}`}>
                        <Link href="#"><a>Play</a></Link>
                        <Link href="#"><a>Edit</a></Link>
                    </div>
                </li>
            </ul>
        </article>
    );
}