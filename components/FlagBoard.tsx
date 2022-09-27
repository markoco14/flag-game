import Image from "next/image";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";


export default function FlagBoard() {

    const flags = [
        {
            
            image: 'https://flagicons.lipis.dev/flags/4x3/ae.svg',
            country: 'UAE',
            id: 1
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/ch.svg',
            country: 'Switzerland',
            id: 2
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/af.svg',
            country: 'Afghanistan',
            id: 3
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/ar.svg',
            country: 'Argentina',
            id: 4
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/au.svg',// 
            country: 'Australia',
            id: 5
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/az.svg',// 
            country: 'Azerbaijan',
            id: 6
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/ca.svg',// 
            country: 'Canada',
            id: 7
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/bm.svg',// 
            country: 'Bermuda',
            id: 8
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/bo.svg',// 
            country: 'Bolivia',
            id: 9
        },
        {
            image: 'https://flagicons.lipis.dev/flags/4x3/de.svg',// 
            country: 'Germany',
            id: 10
        },
    ];

    return (
        <div className={styles.flags}>
            {flags.map((flag) => (
                <div key={flag.id}>
                    <div className={styles.flag_image_container}>
                        <Image 
                            src={flag.image}
                            alt={`The flag of ${flag.country}`}
                            layout='fill'
                        />
                    </div>
                    <p className={styles.flag_country_name}>{flag.country}</p>
                </div>
            ))}
        </div>
    );
}