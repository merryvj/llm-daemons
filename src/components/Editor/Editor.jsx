import React, {useEffect, useState} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';
import Modal from '../Modal/Modal';
import Daemons from '../Daemons/Daemons';


export default function Editor() {
  const [text, setText] = useState("I like meeting people born in August. Paired with Lupe today too. I wish I could pair more. It's always good to reach out for that human connection. With Lupe, we talked about how ideas for projects often arise from her family and friends. Her mom is blind, her sister is a chef, her friends are dancers. There are ideas out in the WORLD that technology can be a lens for. But I don't know how I feel about technology as the lens itself. So when I think of companies were tech is the end goal...I'm not sure. But anyways, the feeling of warmth – the idea of being with family and friends (over loneliness) is so appealing to me. I felt it talking to Amy yesterday. I learned so much from her and found it amazing how we share the experience of considering different paths (from healing to oriental medicine to massage therapy to music production and more).");
  const [textParts, setTextParts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDaemon, setActiveDaemon] = useState(null);
  const [edits, loading] = useAI(text, activeDaemon);
  
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <p className={styles.text}>{loading ? textParts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : text}</p>
      <Modal suggestion={edits.suggestions} visible={isHovered} onAction={() => setIsHovered(false)}/>
    </div>
    <Daemons onSelect={setActiveDaemon}></Daemons>
    </div>
  )
}
