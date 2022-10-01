import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef } from "react";

export default function FlagDetails() {
    const [detailsVisible, setDetailsVisible] = useState<boolean>(true);
    const [levelNumber, setLevelNumber] = useState<number>(0);
    const [weekNumber, setWeekNumber] = useState<number>(0);
    const [dayNumber, setDayNumber] = useState<number>(0);
    const [dayOfWeek, setDayOfWeek] = useState<string>('No day');
    const weekDaySelector = useRef<HTMLSelectElement | undefined>(undefined);

    function toggleDetailsVisible() {
        detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true);
    }

    function handleChangeLevel(level: string) {
        console.log(`L${level}`);
    }

    function handleChangeWeek(week: string) {
        console.log(`W${week}`);
    }

    function handleChangeDay(day: string) {
        console.log(`D${day}`);
    }

    return (
        <>
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
                            onChange={(e) => {handleChangeLevel(e.target.value)}}
                            type="number" />
                    </div>
                    <div className={styles.flex}>
                        <div>
                            <label>Week (#)</label>
                            <input 
                                onChange={(e) => {handleChangeWeek(e.target.value)}}
                                type="number" />
                        </div>
                        <div>
                            <label>Day (#)</label>
                            <input
                                onChange={(e) => {handleChangeDay(e.target.value)}}
                                type="number" />
                        </div>
                        <div>
                            <label>Day (of Week)</label>
                            <select 
                                ref={weekDaySelector}
                            >
                                <option value="">Choose Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday   ">Friday</option>
                            </select>
                        </div>
                    </div>
                    <button>Save</button>
                </article>
                )}
                
        </>
    );
}