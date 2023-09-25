import React, {useState, useEffect} from 'react'
import styles from './daemons.module.css'

const options = [
    {
        title: "Editor",
        subtitle: "Suggestions",
        description: "A strict writing editor, suggest a weak line that can be improved for clarity, grammar, punctuation",
        color: "47, 128, 237",
    },
    {
        title: "Parent",
        subtitle: "Impressions",
        description: "As if you an empathetic parent, suggest a line that makes you the most concerned",
        color: "151, 81, 224",
    },
    {
        title: "Devil",
        subtitle: "Reactions",
        description: "As if you are a devil's advocate, find a line from the text and suggest how it might not be true",
        color: "242, 153, 74",
    },
]

function Daemons({onSelect, loading}) {
    const [active, setActive] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 4100);
    }, [loading])

    const handleClick = (option) => {
        onSelect(option);
        setActive(option);
    }

  return (
    <div className={styles.wrapper}>
        {options.map((option, i) => (
            <div key={i} className={styles.option} onClick={() => handleClick(option)}>
                <div className={styles.icon} style={{"--color": option.color}} data-loading={option === active && isLoading}>
                    <div className={styles.face}>
                        <svg viewBox="0 0 100 100">
                            <circle cx="30" cy="40" r="7" />
                            <circle cx="70" cy="40" r="7" />
                            <path d="M 35 62 C 40 70, 60 70, 65 62" strokeWidth={10} strokeLinecap='round' fill="transparent"/>

                        </svg>
                    </div>
                </div>
                <span className={styles.label} style={{color: `rgb(${option.color})`}}>{option.title}</span>
            </div>

        ))}
    </div>
  )
}

export default Daemons

