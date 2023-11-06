import ScrollableImageContainer from "src/components/scrollable-container/scrollable-image-container";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { Fan, StoryContentProps } from "src/types/story";

const FansContent = ({ story }: StoryContentProps) => {
    if (!story?.Fans) {
        return null;
    }
    return (
        <>
            {story?.Fans && (
                <StorySectionWrapper title="Navijači">
                    <ScrollableImageContainer>
                        {story.Fans.map((fan: Fan, index: number) => (
                            <img
                                key={index}
                                src={fan.imgUrl}
                                alt={`Fan ${index + 1}`}
                                style={{ maxWidth: '100%', marginBottom: '10px', borderRadius: 8 }}
                            />
                        ))}
                    </ScrollableImageContainer>
                </StorySectionWrapper>
            )}
        </>
    );
};

export default FansContent;
