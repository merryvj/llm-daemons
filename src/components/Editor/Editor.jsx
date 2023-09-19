import React, {useEffect, useState} from 'react'
import styles from './editor.module.css';
import useAI from '../../hooks/useAI';

export default function Editor() {
  const [edits, loading] = useAI();
  const [text, setText] = useState("Went to the Kernel magazine launch today. First one there! Met nice people, talked about the difficulties of text messaging as a communication medium...with confusion and frustration from the different levels of intimacy all expected to take place in chat form. Deblina was super nice as a greeter and I felt more comfortable. Maybe I should have been more enthusiastic to say hi to Omar? ");

  const findMatchingSection = (sentence) => {
    const section = text.match(new RegExp(`\\b${sentence}\\b`, "i"));
    return section ? section[0] : null;
  }

  useEffect(() => {
    const matchingSection = findMatchingSection(edits.line);

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
