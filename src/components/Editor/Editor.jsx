import React, {useEffect, useState} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';
import { escapeRegExp } from 'lodash';

export default function Editor() {
  const [text, setText] = useState("Those interested in utilizing their Samaritans experience toward this end must enter a volunteer training class in the semester PRIOR to the course which they anticipate applying their hotline experience. Requirements vary by course, program and institution and it is the responsibility of each volunteer to determine how their Samaritans experience will fit in the context of their individual circumstance. Please note, supervision of accrued hours are for the purpose of satisfying individual courses and shorter-term experiences. Samaritans does not provide clinical supervision for practitioner licensing.");
  const [edits, loading] = useAI(text);

  const findMatchingSection = (sentence) => {
    const escapedSentence = escapeRegExp(sentence);
    const section = text.match(new RegExp(`${escapedSentence}`, "i"));
    return section ? section[0] : null;
  }

  useEffect(() => {
    const matchingSection = findMatchingSection(String(edits.line));
    console.log(matchingSection);
    // // Get the position and bounding box of the matching section
    // const position = matchingSection ? text.indexOf(matchingSection) : -1;
    // const boundingBox = matchingSection ? {
    //   start: position,
    //   end: position + matchingSection.length,
    // } : null;

    // console.log("Position:", position);
    // console.log("Bounding Box:", boundingBox);
    const editedText = matchingSection ? text.replace(matchingSection, `<mark>${matchingSection}</mark>`) : text;
    setText(editedText);

  }, [edits])


  return (
    <div className={styles.wrapper}>
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  )
}
