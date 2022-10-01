import Image from "next/image";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef, useEffect } from 'react';
import { Flag } from "../interfaces";


export default function FlagCalendar() {

    const data = [
        {
            id: 0,
            day: "Monday",
            flags: ["L5 W3 D1", "L8 W3 D1"]
        },
        {
            id: 1,
            day: "Wednesday",
            flags: ["L5 W3 D1", "L8 W3 D1"]
        },
        {
            id: 2,
            day: "Thursday",
            flags: ["L5 W3 D2", "L8 W3 D2"]
        },
        {
            id: 3,
            day: "Friday",
            flags: ["L5 W3 D2", "L8 W3 D2"]
        }
    ]

    return (
        <article>
            <div className={`${styles.card}`}>
                <h2>This week&apos;s flags</h2>
                <div className={`${styles.grid} ${styles.flag_calendar_grid}`}>
                { data.map((day) => (
                    <div key={day.id}>
                        <p>{day.day}</p>
                        <ul>
                            <li>{day.flags[0]}</li>
                            <li>{day.flags[1]}</li>
                        </ul>
                    </div>
                ))}
                </div>
            </div>
        </article>
    );
}