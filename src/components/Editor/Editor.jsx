import React, {useEffect, useState} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';
import Modal from '../Modal/Modal';

export default function Editor() {
  const [text, setText] = useState("For the love of buttery animations, modifying only transform and opacity goes a long way! Animating layout properties costs the browser a big recalculation to render changes. Modifying visual properties (e.g.'box-shadow') that trigger repaints can also get expensive.");
  const [textParts, setTextParts] = useState([]);
  const [edits, loading] = useAI(text);
  const [isHovered, setIsHovered] = useState(false);
  
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
        <mark 
          onMouseEnter={() => setIsHovered(true)}
      >{matchingSection}</mark>
      </React.Fragment> : 
      part
    ));
    setTextParts(editedText);

  }, [edits])


  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{loading ? textParts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : text}</p>
      <Modal suggestion={edits.suggestions} visible={isHovered} onAction={() => setIsHovered(false)}/>
    </div>
  )
}
