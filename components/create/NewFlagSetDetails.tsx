import styles from '../../styles/Home.module.css'
import { useState, FormEvent, useRef } from 'react';
import { format, isSaturday, isSunday, isTuesday, parseISO } from 'date-fns'

type IFlagDetails = {
    setIsTitleSet: Function,
    setFlagSetTitle: Function,
    setNewFlagSet: Function,
    setIsFlagSetCreated: Function,
}

export default function NewFlagSetDetails( props: IFlagDetails ) {
    const [levelNumber, setLevelNumber] = useState<string>('');
    const [weekNumber, setWeekNumber] = useState<string>('');
    const [dayNumber, setDayNumber] = useState<string>('');
    const [dayOfWeek, setDayOfWeek] = useState<string>('');
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

    function createNewFlagSet(e: FormEvent, levelNumber: string, weekNumber: string, classTime: string, date: string ) {
        e.preventDefault();
        const parsedDate: Date = parseISO(date);

        if (levelNumber === '') {
            alert('You forget to set the level!');
            return;
        }
        
        if (weekNumber === '') {
            alert('You forget to set the week number!')
            return;
        }
        if (classTime === '') {
            alert('You forget to set the class time!')
            return;
        }
        if (date === '') {
            alert('You forget to set the date!')
            return;
        }

        if (isTuesday(parsedDate) || isSaturday(parsedDate) || isSunday(parsedDate)) {
            alert('You need to choose a Monday, Wednesday, Thursday, or Friday!');
            return;
        }

        const title = `L${levelNumber} W${weekNumber} D${dayNumber} ${dayOfWeek} (${date})`;
        
        fetch('/api/flags/flagSet/create', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                level: levelNumber,
                week: weekNumber,
                date: date,
                day: dayNumber,
                dayOfWeek: dayOfWeek,
                class: classTime,
                status: 'WIP',
            }),
        })
        .then((res)=> res.json())
        .then((json) => {
            console.log(json)
            props.setNewFlagSet(json);
        })
        props.setIsFlagSetCreated(true);
        props.setIsTitleSet(true);
        props.setFlagSetTitle(title);
    }

    // I'm probably going to useRef instead of useState here
    // to save the re-renders

    return (
        <>
            
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
                <form
                    onSubmit={(e) => {createNewFlagSet(e, levelNumber, weekNumber, classTime, date,)}}
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
        </>
    );
}