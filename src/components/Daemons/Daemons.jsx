import React from 'react'
import styles from './daemons.module.css'

const options = [
    {
        title: "Editor",
        description: "This is really strict",
        color: "#ffaaaa"
    },
    {
        title: "Mom",
        description: "This is really strict",
        color: "#aaffaa"
    },
    {
        title: "Friend",
        description: "This is really strict",
        color: "#aaaaff"
    },
]
function Daemons() {
  return (
    <div className={styles.wrapper}>
        {options.map((option, i) => (
            <div key={i} className={styles.option}>
                <div className={styles.icon} style={{background: option.color}}/>
                <span className={styles.label} style={{color: option.color}}>{option.title}</span>
            </div>

        ))}
    </div>
  )
}

export default Daemons

