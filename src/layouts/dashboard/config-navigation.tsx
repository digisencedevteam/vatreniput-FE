import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import QuizIcon from '@mui/icons-material/Quiz';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
            title: 'Sveti Dres',
            path: paths.dashboard.nine,
            icon: <CollectionsIcon />,
          },
        ],
      },

      // Story Mode
      {
        subheader: 'Vatrene Priče',
        items: [
          {
            title: 'Vatrene Priče',
            path: paths.dashboard.story.root,
            icon: <LocalFireDepartmentIcon />,
            children: [
              {
                title: `Euro 1996`,
                path: paths.dashboard.story.root,
              },
              {
                title: 'Svjetsko prvenstvo 1998',
                path: paths.dashboard.story.sp98,
              },
              {
                title: 'Euro 2000',
                path: paths.dashboard.story.sp98,
              },
              {
                title: 'Svjetsko prvenstvo 2002',
                path: paths.dashboard.story.sp02,
              },
              {
                title: 'Euro 2004',
                path: paths.dashboard.story.euro04,
              },
              {
                title: 'Svjetsko prvenstvo 2006',
                path: paths.dashboard.story.sp06,
              },
              {
                title: 'Euro 2008',
                path: paths.dashboard.story.euro08,
              },
              {
                title: 'Svjetsko prvenstvo 2010',
                path: paths.dashboard.story.euro08,
              },
              {
                title: 'Euro 2012',
                path: paths.dashboard.story.sp12,
              },
              {
                title: 'Svjetsko prvenstvo 2014',
                path: paths.dashboard.story.sp14,
              },
              {
                title: 'Euro 2016',
                path: paths.dashboard.story.euro16,
              },
              {
                title: 'Svjetsko prvenstvo 2018',
                path: paths.dashboard.story.sp18,
              },
              {
                title: 'Euro 2020',
                path: paths.dashboard.story.euro2020,
              },
              {
                title: 'Svjetsko Prvenstvo 2022',
                path: paths.dashboard.story.sp2022,
              },
              {
                title: 'Liga Nacija 2023',
                path: paths.dashboard.story.ligaNacija2023,
              },
            ],
          },
        ],
      },

      {
        subheader: 'Zabava',
        items: [
          {
            title: 'Glasanje',
            path: paths.dashboard.five,
            icon: <HowToVoteIcon />,
          },
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
    ],
    []
  );
  return data;
}
