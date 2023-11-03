import React, { useState } from "react";
import { ScrollableContainerProps } from "src/types";

const StoryContext = React.createContext({
    currentStoryIndex: 0,
    setCurrentStoryIndex: (index: number) => { }
});

export const StoryProvider = ({ children }: ScrollableContainerProps) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    return (
        <StoryContext.Provider value={{ currentStoryIndex, setCurrentStoryIndex }}>
            {children}
        </StoryContext.Provider>
    );
};

export const useStoryContext = () => React.useContext(StoryContext);
