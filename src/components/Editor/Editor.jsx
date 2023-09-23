import React, {useEffect, useState, useRef, useCallback} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';
import Modal from '../Modal/Modal';
import Daemons from '../Daemons/Daemons';

export default function Editor() {
  const [text, setText] = useState("Type something to analyze...");
  const [textParts, setTextParts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDaemon, setActiveDaemon] = useState(null);
  const [edits, loading] = useAI(text, activeDaemon);
  const markRef = useRef(null);
  
  const findMatchingSection = (sentence) => {
    const escapedSentence = escapeRegExp(sentence);
    const section = text.match(new RegExp(`${escapedSentence}`, "i"));
    return section ? section[0] : null;
  }

  useEffect(() => {
    const matchingSection = findMatchingSection(String(edits.line));
    const parts = text.split(matchingSection);
    const editedText = parts.map((part, i) => (
      i < parts.length - 1 ? 
      <React.Fragment key={i}>{part}
        <span 
          ref={markRef}
          className='highlight'
          onMouseEnter={() => setIsHovered(true)}
          style={{'--markColor': activeDaemon.color}}
          // style={{backgroundColor: `rgb(${activeDaemon.color}, 0.3)`}}
      >{matchingSection}</span>
      </React.Fragment> : 
      part
    ));
    setTextParts(editedText);

  }, [edits])


  const handlePaste = (e) => {
    e.preventDefault();
    const plain = e.clipboardData.getData('text/plain');
    setText(plain);
  }

  const handleBlur = useCallback((e) => {
    setText(e.target.innerText)
  }, [])

  const changeDaemon = (selectedDaemon) => {
    setActiveDaemon(selectedDaemon);
    setIsHovered(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <div contentEditable='true' className={styles.text} onBlur={handleBlur} onPaste={handlePaste}> {textParts.length > 1 ? textParts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : text}</div>
      {activeDaemon && <Modal data={edits} visible={isHovered} onAction={() => setIsHovered(false)} markRef={markRef} daemon={activeDaemon}/>
}
    </div>
    <Daemons onSelect={changeDaemon}></Daemons>
    </div>
  )
}
