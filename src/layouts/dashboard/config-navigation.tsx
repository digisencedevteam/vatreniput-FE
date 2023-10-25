import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import QuizIcon from '@mui/icons-material/Quiz';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export function useNavData() {
  const data = useMemo(
    () => [
      // Main navigation
      {
        subheader: 'Glavni Izbornik',
        items: [
          {
            title: 'Početna',
            path: paths.dashboard.root,
            icon: <HomeIcon />,
          },
          {
            title: 'Moja Kolekcija',
            path: paths.dashboard.two,
            icon: <CollectionsIcon />,
          },
          {
            title: 'Glasanje',
            path: paths.dashboard.five,
            icon: <HowToVoteIcon />,
          },
        ],
      },

      {
        subheader: '',
        items: [
          {
            title: 'Kvizovi',
            path: paths.dashboard.quizGroup.root,
            icon: <QuizIcon />,
            children: [
              {
                title: `Svi Kvizovi`,
                path: paths.dashboard.quizGroup.root,
              },
              {
                title: 'Rezultati',
                path: paths.dashboard.quizGroup.results,
              },
            ],
          },
        ],
      },

      // Story Mode
      {
        subheader: 'Vatrene Priče',
        items: [
          {
            title: 'Moje otključane priče',
            path: paths.dashboard.story.root,
            icon: <AutoStoriesIcon />,
            children: [
              {
                title: `Zlatna Generacija '98`,
                path: paths.dashboard.story.root,
              },
              {
                title: 'Od Zadra do Madrida',
                path: paths.dashboard.story.seven,
              },
              {
                title: 'Srebrni San 2018',
                path: paths.dashboard.story.eight,
              },
            ],
          },
        ],
      },
    ],
    []
  );
  return data;
}
