import React from 'react'
import styles from './daemons.module.css'

function Daemons() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.daemon}>
            <span className={styles.label}>Label</span>
        </div>
        <div className={styles.daemon}>
            <span className={styles.label}>Label</span>
        </div>
        <div className={styles.daemon}>
            <span className={styles.label}>Label</span>
        </div>
    </div>
  )
}

export default Daemons

