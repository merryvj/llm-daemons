import React from 'react'
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
  return (
    <div className={styles.wrapper}>
        {options.map((option, i) => (
            <div key={i} className={styles.option} onClick={() => onSelect(option)}>
                <div className={styles.icon} style={{background: `rgb(${option.color})`}}/>
                <span className={styles.label} style={{color: `rgb(${option.color})`}}>{option.title}</span>
            </div>

        ))}
    </div>
  )
}

export default Daemons

