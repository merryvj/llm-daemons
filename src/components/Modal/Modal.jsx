import React, { useEffect, useState } from 'react'
import styles from './modal.module.css';

export default function Modal({data, visible, onAction, markRef, color}) {

    const [isVisible, setIsVisible] = useState(visible);
    const [suggestion, setSuggestion] = useState("");
    
    useEffect(() => {
        setSuggestion(data.suggestions);
    }, [data])

    useEffect(() => {
        setIsVisible(visible);
    }, [visible])

    const modalStyle = {
        top: 0,
        left: 0,
        position: 'absolute',
        transform: 'translate(40%, 50%)'
    };

    if (markRef.current) {
        console.log(markRef.current.getBoundingClientRect())
        const markPosition = markRef.current.getBoundingClientRect();
        modalStyle.top = markPosition.top + 'px';
        modalStyle.left = markPosition.left + 'px';
    }

  return (
    <div style={modalStyle}>
        <div className={isVisible ? styles.visible : styles.hidden}>
        <div className={styles.modal} style={{"--color": color}}>
            <h3 className={styles.subtitle}>{suggestion}</h3>
            <button onClick={() => onAction()}>Ok</button>
        </div>
    </div>
    </div>
  )
}

