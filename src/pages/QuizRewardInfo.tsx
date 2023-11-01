import { Helmet } from 'react-helmet-async';
import QuizRewardInfo from 'src/sections/quiz/quiz-reward-info';

const InvalidAlbumPage = () => {
  return (
    <>
      <Helmet>
        <title>Pravila nagradnih kvizova</title>
      </Helmet>
      <QuizRewardInfo />
    </>
  );
};
export default InvalidAlbumPage;
