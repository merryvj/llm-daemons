import React, { useEffect, useState } from 'react'
import styles from './modal.module.css';

export default function Modal({data, visible, onAction, markRef, daemon}) {

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
        transform: 'translateX(6rem)'
    };

    if (markRef.current) {
        console.log(markRef.current.getBoundingClientRect())
        const markPosition = markRef.current.getBoundingClientRect();
        modalStyle.top = markPosition.top - 24 + 'px';
        modalStyle.left = markPosition.left + 'px';
    }

  return (
    <div style={modalStyle}>
        <div className={isVisible ? styles.visible : styles.hidden}>
        <div className={styles.modal} style={{"--color": `rgb(${daemon.color})`}}>
            <h3 className={styles.subtitle}>{daemon.subtitle}</h3>
            <div className={styles.suggestion}>
                <p> {suggestion} </p>
                <div className={styles.actions}>
                    <button onClick={() => onAction()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6FCF97" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>                    </button>
                    <button onClick={() => onAction()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

