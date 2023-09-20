import React, {useEffect, useState} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';
import Modal from '../Modal/Modal';

export default function Editor() {
  const [text, setText] = useState("Those interested in utilizing their Samaritans experience toward this end must enter a volunteer training class in the semester PRIOR to the course which they anticipate applying their hotline experience. Requirements vary by course, program and institution and it is the responsibility of each volunteer to determine how their Samaritans experience will fit in the context of their individual circumstance. Please note, supervision of accrued hours are for the purpose of satisfying individual courses and shorter-term experiences. Samaritans does not provide clinical supervision for practitioner licensing.");
  const [textParts, setTextParts] = useState([]);
  const [edits, loading] = useAI(text);
  const [modal, setModal] = useState(false);

  
  const showModal = (e) => {
    setModal(true);
  }

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
      <React.Fragment key={i}>{part}<mark>{matchingSection}</mark></React.Fragment> : 
      part
    ));
    setTextParts(editedText);

  }, [edits])


  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{loading ? textParts.map((part, i) => <React.Fragment key={i} className={styles.text}>{part}</React.Fragment>) : text}</p>
      {loading && <Modal suggestion={edits.suggestions} visible={modal}/>}
    </div>
  )
}
