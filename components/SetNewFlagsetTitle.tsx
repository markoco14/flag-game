import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { parseISO, format, isTuesday, isSaturday, isSunday } from 'date-fns'

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

    const [classTime, setClassTime] = useState<string | undefined>('');

    function getInfoFromSelectedDate(date: string) {
        setDayOfWeek(format(new Date(date), 'EEEE'))
        if (['Monday', 'Wednesday'].includes(format(new Date(date), 'EEEE'))) {
            setDayNumber('1');
        } else {
            setDayNumber('2');
        }
        setDate(date)
    }

    // I'm probably going to useRef instead of useState here
    // to save the re-renders

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
                    onSubmit={(e) => {props.createFlagSet(e, levelNumber, weekNumber, dayNumber, dayOfWeek, date, classTime)}}
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
                    <fieldset>
                        <legend>Choose class time</legend>
                        <div>
                            <label htmlFor="firstClass">1:15 - 3:45</label>
                            <input onChange={(e) => {setClassTime(e.target.value)}}type="radio" id="firstClass" name="classTime" value="1"/>
                        </div>
                        <div>
                            <label htmlFor="secondClass">4:10 - 7:10</label>
                            <input onChange={(e) => {setClassTime(e.target.value)}}type="radio" id="secondClass" name="classTime" value="2"/>
                        </div>
                    </fieldset>
                    <div className={styles.flex_column}>
                        <label>Date</label>
                        <input 
                            onChange={(e) => {getInfoFromSelectedDate(e.target.value)}}
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