// hooks/useTruncatedText.ts
import { useState } from 'react';

export const useTruncatedText = (
  initialText: string
  // truncateLength: number
) => {
  const [text, setText] = useState(initialText);
  const [expanded, setExpanded] = useState(false);
  const truncateLength = 400;

  const toggleLines = () => setExpanded(!expanded);

  const truncatedText = expanded ? text : text.slice(0, truncateLength) + '...';
  const isTruncated = text.length > truncateLength;

  return {
    text,
    setText,
    expanded,
    setExpanded,
    toggleLines,
    truncatedText,
    isTruncated,
    less: 'Sakri',
    more: 'Proširi',
  };
};
