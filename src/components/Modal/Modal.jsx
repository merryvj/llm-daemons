import React from 'react'
import styles from './modal.module.css';

export default function Modal({suggestion}) {
  return (
    <div className={styles.wrapper}>
        {suggestion}
    </div>
  )
}
