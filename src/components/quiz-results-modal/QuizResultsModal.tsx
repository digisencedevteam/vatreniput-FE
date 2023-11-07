import { Modal, Box, Typography, CardMedia, Button } from '@mui/material';

export interface QuizResultsModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  quizResults?: {
    dateTaken: string | number | Date;
    quiz: {
      title: string;
      thumbnail: string;
    };
    score: number;
    duration: number;
  };
  formattedDateTaken: string;
}

const QuizResultsModal = ({
  isModalOpen,
  closeModal,
  quizResults,
  formattedDateTaken,
}: QuizResultsModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby='quiz-results-modal'
      aria-describedby='quiz-results-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        {quizResults && (
          <>
            <Typography variant='h5'>{quizResults.quiz.title}</Typography>
            <CardMedia
              component='img'
              src={quizResults.quiz.thumbnail}
              alt='Slika kviza'
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                marginY: '16px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                m: 5,
              }}
            >
              <Typography variant='caption' id='quiz-results-description'>
                Riješenost kviza: {Math.round(quizResults.score)}%
              </Typography>
              <Typography variant='caption'>
                Kviz riješen za {quizResults.duration} sekundi
              </Typography>
              <Typography variant='caption'>
                Kviz riješen: {formattedDateTaken}
              </Typography>
            </Box>
          </>
        )}
        <Button onClick={closeModal} variant='contained'>
          Zatvori
        </Button>
      </Box>
    </Modal>
  );
};

export default QuizResultsModal;
