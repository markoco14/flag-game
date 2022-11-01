import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { FlagSet } from '../mirage/models'
import { startOfWeek, lastDayOfWeek, isAfter, isBefore, parseISO, addDays, format } from 'date-fns'

type Day = {
    day: Date,
    classes: FlagSet[] | []
}

export default function FlagCalendar() {
    const [flagCalendar, setFlagCalendar] = useState<Day[] | undefined>(undefined);

    const fetchData = async () => {
        await fetch("/api/flags/flagsets")
        .then((res) => res.json())
        .then((json) => {
          const date = startOfWeek(new Date());
          const day1 = addDays(date, 1);
          const day2 = addDays(date, 3);
          const day3 = addDays(date, 4);
          const day4 = addDays(date, 5);
          const firstDay = startOfWeek(date);
          const lastDay = lastDayOfWeek(date);
          const thisWeek = json.flagSets.filter((flag: FlagSet) => {
            if (isAfter(parseISO(flag.date), firstDay) && isBefore(parseISO(flag.date), lastDay)) {
              return flag;
            }
          })
          const wednesdayFlags = thisWeek.filter((flag: FlagSet) => {
            if (flag.dayOfWeek === 'Wednesday') {
                return flag;
            }
          });
          const sortedWednesday = wednesdayFlags.sort((a: FlagSet, b: FlagSet) => {
            if (Number(a.class) < Number(b.class)) {
                return -1;
            }
          });
          const mondayFlags = thisWeek.filter((flag: FlagSet) => {
            if (flag.dayOfWeek === 'Monday') {
                return flag;
            }
          });
          const sortedMonday = mondayFlags.sort((a: FlagSet, b: FlagSet) => {
            if (Number(a.class) < Number(b.class)) {
                return -1;
            }
          });
          const fridayFlags = thisWeek.filter((flag: FlagSet) => {
            if (flag.dayOfWeek === 'Friday') {
                return flag;
            }
          });
          const sortedFriday = fridayFlags.sort((a: FlagSet, b: FlagSet) => {
            if (Number(a.class) < Number(b.class)) {
                return -1;
            }
          });
          const thursdayFlags = thisWeek.filter((flag: FlagSet) => {
            if (flag.dayOfWeek === 'Thursday') {
                return flag;
            }
          });
          const sortedThursday = thursdayFlags.sort((a: FlagSet, b: FlagSet) => {
            if (Number(a.class) < Number(b.class)) {
                return -1;
            }
          });
          setFlagCalendar([
            {day: day1, classes: sortedMonday},
            {day: day2, classes: sortedWednesday},
            {day: day3, classes: sortedThursday},
            {day: day4, classes: sortedFriday}
          ]);
        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
      <article>
        <div className={`${styles.card}`}>
          <div className={`${styles.grid} ${styles.flag_calendar_grid}`}>
            {flagCalendar?.map((day) => (
              <div key={format(day.day, 'EEEE')}>
                <p style={{ fontWeight: '700', fontSize: '1.2rem'}}>
                    {format(day.day, 'EEEE') + ' ' + format(day.day, 'LL') + '/' + format(day.day, 'd')}
                </p>
                <ul>
                  {day.classes?.map((flag, index) => {
                      return (
                        <li key={flag.id}> Class&nbsp;{flag.class}:&nbsp;
                          <Link href={`./flags/play/${flag.id}`}>
                            <a>{flag.title.slice(0,8)}</a>
                          </Link>
                        </li>
                      )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </article>      
    );
}