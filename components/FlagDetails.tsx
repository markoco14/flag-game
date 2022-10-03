import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef } from "react";

export default function FlagDetails() {
    const [title, setTitle] = useState<string>('This set has no title.');
    const [detailsVisible, setDetailsVisible] = useState<boolean>(true);
    const levelNumberRef = useRef<HTMLInputElement>(null);
    const weekNumberRef = useRef<HTMLInputElement>(null);
    const dayNumberRef = useRef<HTMLInputElement>(null);
    const dayOfWeekRef = useRef<HTMLSelectElement>(null);

    function handleSetTitle() {
        const levelNumber = levelNumberRef?.current?.value;
        const weekNumber = weekNumberRef?.current?.value;
        const dayNumber = dayNumberRef?.current?.value;
        const dayOfWeek = dayOfWeekRef?.current?.value;

        if (levelNumber === '' || weekNumber === '' || dayNumber === '' || dayOfWeek === '') {
            alert('You need to set choose the level, week, day, and week day');
            return;
        }

        setTitle(`L${levelNumber} W${weekNumber} D${dayNumber} ${dayOfWeek}`);
    }

    function toggleDetailsVisible() {
        detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true);
    }

    return (
        <>
            <div className={`${styles.flex} ${styles.flex_between}`} style={{ padding: '0 1rem',}}>
                <h2>{title}</h2>
                <span>Questions: 0</span>
            </div>
            <div className={`${styles.flex} ${styles.flex_between}`}>
                <p>Details</p>
                <button 
                    onClick={toggleDetailsVisible}
                    style={{ border: 'none', background: 'none', color: 'black'}}
                >
                <span className="material-symbols-outlined">
                    close
                </span>
                </button>
                </div>
                {detailsVisible && (
                <article>
                    <div>
                        <label>Level</label>
                        <input 
                            ref={levelNumberRef}
                            type="number" />
                    </div>
                    <div className={styles.flex}>
                        <div>
                            <label>Week (#)</label>
                            <input 
                                ref={weekNumberRef}
                                type="number" />
                        </div>
                        <div>
                            <label>Day (#)</label>
                            <input
                                ref={dayNumberRef}
                                type="number" />
                        </div>
                        <div>
                            <label>Day (of Week)</label>
                            <select 
                                ref={dayOfWeekRef}
                            >
                                <option value="">Choose Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday   ">Friday</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSetTitle}>Save</button>
                </article>
                )}
        </>
    );
}