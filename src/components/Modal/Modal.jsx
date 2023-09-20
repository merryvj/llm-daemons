import React from 'react'
import styles from './modal.module.css';

export default function Modal({suggestion, visible}) {
  return (
    <div className={styles.wrapper} style={{visibility: visible ? 'visible' : 'hidden'}}>
        {suggestion}
    </div>
  )
}
