import React, {useEffect, useState, useRef} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';
import Modal from '../Modal/Modal';
import Daemons from '../Daemons/Daemons';


export default function Editor() {
  const [text, setText] = useState("Digital pets are these really cool virtual creatures that you can take care of, almost like a game but not exactly. You get to feed them, play with them, and they do all sorts of neat things on your computer or phone. It's all made up of pixels and stuff, and it's just a super fun way to pass the time and have a little digital companion to keep you company.");
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
        <mark 
          ref={markRef}
          onMouseEnter={() => setIsHovered(true)}
          style={{backgroundColor: activeDaemon.color}}
      >{matchingSection}</mark>
      </React.Fragment> : 
      part
    ));
    setTextParts(editedText);

  }, [edits])


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <p className={styles.text}>{loading ? textParts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : text}</p>
      <Modal data={edits} visible={isHovered} onAction={() => setIsHovered(false)} markRef={markRef}/>
    </div>
    <Daemons onSelect={setActiveDaemon}></Daemons>
    </div>
  )
}
