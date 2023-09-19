import React from 'react'
import styles from './editor.module.css';

export default function Editor() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Hey type some text here</p>
    </div>
  )
}
