import { useEffect, useState } from "react";
import { Country } from "../mirage/models";
import Image from "next/image";

type NewTileFlagSelectorProps = {
    updateId: Function
}

export default function NewTileFlagSelector(props: NewTileFlagSelectorProps) {
    const [flags, setFlags] = useState<Country[] | []>([]);

    function handleSelectFlag(flag: Country) {
        props.updateId({id: flag.id, name: flag.name, flag: flag.flag});
        console.log(flag)
    }

    useEffect(() => {
        fetch("/api/flags/countries")
        .then((res) => res.json())
        .then((json) => {
            console.log('All the flags: ', json)
            setFlags(json);
        })
    }, [])

    return (
        <>
            <h2>Choose your flags</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%', aspectRatio: '1/1'}}>
            {flags?.map((flag) => (
                <div key={flag.id} onClick={() => {handleSelectFlag(flag)}}>
                    <p>{flag.name}</p>
                    <Image
                        src={flag.flag}
                        alt='the alt text'
                        width={100}
                        height={100}
                    ></Image>
                </div>
            ))}
            </div>
        </>
    );
}