import { useState } from 'react';

export const useTruncatedText = (
  initialText: string,
  truncateLength: number
) => {
  const [text, setText] = useState(initialText);
  const [expanded, setExpanded] = useState(false);

  const toggleLines = () => setExpanded(!expanded);

  const truncatedText = expanded ? text : text.slice(0, truncateLength) + '...';
  const isTruncated = text.length > truncateLength;
  const truncate = (inputText: string, maxLength: number) => {
    return inputText.length > maxLength
      ? inputText.slice(0, maxLength) + '...'
      : inputText;
  };

  return {
    text,
    setText,
    expanded,
    setExpanded,
    toggleLines,
    truncatedText,
    isTruncated,
    less: 'Sakrij',
    more: 'Proširi',
    truncate,
  };
};
