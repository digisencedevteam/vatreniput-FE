import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { ScrollableContainerProps } from "src/types";

interface StoryContextType {
    currentStoryIndex: number;
    setCurrentStoryIndex: Dispatch<SetStateAction<number>>;
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
