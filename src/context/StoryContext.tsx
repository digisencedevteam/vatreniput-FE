import { createContext, useContext, useState } from 'react';

interface StoryContextType {
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
  childrenCount: number;
}
const StoryContext = createContext<StoryContextType>({
  currentStoryIndex: 0,
  setCurrentStoryIndex: () => {},
  childrenCount: 0,
});

interface StoryProviderProps {
  children: React.ReactNode;
  childrenCount: number;
}

export const StoryProvider = ({
  children,
  childrenCount,
}: StoryProviderProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  return (
    <StoryContext.Provider
      value={{ currentStoryIndex, setCurrentStoryIndex, childrenCount }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
