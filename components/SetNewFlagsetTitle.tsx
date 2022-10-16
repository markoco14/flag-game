import styles from '../styles/Home.module.css'
import { useState } from 'react';

type IFlagDetails = {
    createFlagSet: Function,
    isTitleSet: boolean,
    title: string | undefined
}

export default function FlagDetails( props: IFlagDetails ) {
    const [levelNumber, setLevelNumber] = useState<string | undefined>('');
    const [weekNumber, setWeekNumber] = useState<string | undefined>('');
    const [dayNumber, setDayNumber] = useState<string | undefined>('');
    const [dayOfWeek, setDayOfWeek] = useState<string | undefined>('');
    const [date, setDate] = useState<string>('');

    return (
        <>
            <div 
                className={`${styles.flex} ${styles.flex_between}`} 
                style={{ padding: '0 1rem', marginBottom: '1rem'}}
            >
                <h2>Flagset Name: {props.title}</h2>
                <span>Qusetions: 0</span>
            </div>
            <div className={`${styles.flex} ${styles.flex_between}`}>
                <h3>Details</h3>
                <button
                    style={{ border: 'none', background: 'none', color: 'black'}}
                >
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
            {!props.isTitleSet && (
                <form
                    onSubmit={(e) => {props.createFlagSet(e, levelNumber, weekNumber, dayNumber, dayOfWeek, date)}}
                >
                    <div className={styles.flex_column}>
                        <label>Level</label>
                        <input 
                            // ref={levelNumberRef}
                            onChange={(e) => {setLevelNumber(e.target.value)}}
                            type="number" />
                    </div>
                    <div className={styles.flex_column}>
                        <label>Week (#)</label>
                        <input 
                            // ref={weekNumberRef}
                            onChange={(e) => {setWeekNumber(e.target.value)}}
                            type="number" />
                    </div>
                    <div className={styles.flex_column}>
                        <label>Day (#)</label>
                        <input
                            onChange={(e) => {setDayNumber(e.target.value)}}
                            type="number" />
                    </div>
                    <div className={styles.flex_column}>
                        <label>Day (of Week)</label>
                        <select 
                            onChange={(e) => {setDayOfWeek(e.target.value)}}
                        >
                            <option value="">Choose Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </div>
                    <div className={styles.flex_column}>
                        <label>Date</label>
                        <input 
                            onChange={(e) => {setDate(e.target.value)}}
                            type='date'
                        >
                        </input>
                    </div>
                    <div className={`${styles.flex} ${styles.flex_grow}`}>
                        <button type="submit">Save</button>
                    </div>
                </form>
            )}
            {props.isTitleSet && (
                <div>
                    <p>Level: {levelNumber}</p>
                    <p>Week: {weekNumber}</p>
                    <p>Day: {dayNumber}</p>
                    <p>Day of Week: {dayOfWeek}</p>
                    <button onClick={() => {console.log('You clicked the update button')}}>Update</button>
                </div>
            )}
        </>
    );
}