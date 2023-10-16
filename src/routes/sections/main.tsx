import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import CompactLayout from 'src/layouts/compact';
import ForgotPassword from 'src/pages/ForgotPassword';

const Page404 = lazy(() => import('src/pages/404'));
const Faq = lazy(() => import('src/pages/Faq'))
const QuizPage = lazy(() => import('src/sections/quiz/index'));

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [{ path: '404', element: <Page404 /> },
    { path: 'faq', element: <Faq /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    {
      path: 'quiz/:quizId',
      element: <QuizPage />
    },
    ],
  },
];
