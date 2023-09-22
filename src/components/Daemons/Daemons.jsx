import React from 'react'
import styles from './daemons.module.css'

const options = [
    {
        title: "Editor",
        description: "a strict academic who is evaluating punctuation, grammar, and style",
        color: "#2F80ED"
    },
    {
        title: "Mom",
        description: "a kind and friendly mom who is empathetic and concerned",
        color: "#9B51E0"
    },
    {
        title: "Friend",
        description: "a childish friend who only wants the best for you",
        color: "#F2994A"
    },
]
function Daemons({onSelect}) {
  return (
    <div className={styles.wrapper}>
        {options.map((option, i) => (
            <div key={i} className={styles.option} onClick={() => onSelect(option)}>
                <div className={styles.icon} style={{background: option.color}}/>
                <span className={styles.label} style={{color: option.color}}>{option.title}</span>
            </div>

        ))}
    </div>
  )
}

export default Daemons

