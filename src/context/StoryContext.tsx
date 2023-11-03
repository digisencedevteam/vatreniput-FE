import { createContext, useContext, useState } from "react";
import { ScrollableContainerProps } from "src/types";

interface StoryContextType {
    currentStoryIndex: number;
    setCurrentStoryIndex: (index: number) => void;
}
const StoryContext = createContext<StoryContextType>({
    currentStoryIndex: 0,
    setCurrentStoryIndex: () => { }
});

export const StoryProvider = ({ children }: ScrollableContainerProps) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    return (
        <StoryContext.Provider value={{ currentStoryIndex, setCurrentStoryIndex }}>
            {children}
        </StoryContext.Provider>
    );
};

export const useStoryContext = () => useContext(StoryContext);
