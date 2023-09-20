import React, { useEffect, useState } from 'react'
import styles from './modal.module.css';

export default function Modal({data, visible, onAction}) {

    const [isVisible, setIsVisible] = useState(visible);
    const [suggestion, setSuggestion] = useState("");
    
    useEffect(() => {
        setSuggestion(data.suggestions);
    }, [data])

    useEffect(() => {
        setIsVisible(visible);
    }, [visible])

  return (
    <div className={isVisible ? styles.visible : styles.hidden}>
        <div className={styles.wrapper}>
            <p>{suggestion}</p>
            <button onClick={() => onAction()}>Ok</button>
        </div>
    </div>
  )
}

