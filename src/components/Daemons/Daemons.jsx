import React, {useState} from 'react'
import styles from './daemons.module.css'

const options = [
    {
        title: "Editor",
        subtitle: "Suggestions",
        description: "a strict academic who is evaluating punctuation, grammar, and style",
        color: "47, 128, 237",
    },
    {
        title: "Mom",
        subtitle: "Impressions",
        description: "a kind and friendly mom who is empathetic and concerned",
        color: "151, 81, 224",
    },
    {
        title: "Friend",
        subtitle: "Reactions",
        description: "a childish friend who only wants the best for you",
        color: "242, 153, 74",
    },
]
function Daemons({onSelect}) {
    const [active, setActive] = useState(null);

    const handleClick = (option) => {
        onSelect(option)
    }

  return (
    <div className={styles.wrapper}>
        {options.map((option, i) => (
            <div key={i} className={styles.option} onClick={() => handleClick(option)}>
                <div className={styles.icon} style={{"--color": option.color}}>
                    <div className={styles.face}>
                        <svg viewBox="0 0 100 100">
                            <circle cx="30" cy="40" r="7" />
                            <circle cx="70" cy="40" r="7" />
                            <path d="M 35 62 C 40 70, 60 70, 65 62" stroke="black" strokeWidth={10} strokeLinecap='round' fill="transparent"/>

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

