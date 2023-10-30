import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import ProfileView from 'src/sections/profile/view';
import ManageQuiz from 'src/sections/manageQuiz/view';
import ManageVoting from 'src/sections/manageVoting/view';

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/collections'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
const PageSeven = lazy(() => import('src/pages/dashboard/seven'));
const PageEight = lazy(() => import('src/pages/dashboard/eight'));
const QuizPage = lazy(() => import('src/sections/quiz/index'));
const VotingPage = lazy(() => import('src/sections/voting/index'));
const QuizResults = lazy(() => import('src/sections/quiz-results/view'));
const VotingResults = lazy(
  () => import('src/sections/voting/voting-results-screen')
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      { path: 'four', element: <PageFour /> },
      { path: 'five', element: <PageFive /> },
      { path: 'profile', element: <ProfileView /> },
      { path: 'quiz/:quizId', element: <QuizPage /> },
      { path: 'voting/:votingId', element: <VotingPage /> },
      { path: 'createQuiz', element: <ManageQuiz /> },
      { path: 'editQuiz/:quizId', element: <ManageQuiz /> },
      { path: 'editVoting/:votingId', element: <ManageVoting /> },
      { path: 'createVoting', element: <ManageVoting /> },
      {
        path: 'votingResults/:votingId/:votingTitle',
        element: <VotingResults />,
      },

      {
        path: 'group',
        children: [
          { element: <PageSix />, index: true },
          { path: 'seven', element: <PageSeven /> },
          { path: 'eight', element: <PageEight /> },
        ],
      },

      {
        path: 'quizGroup',
        children: [
          { element: <PageThree />, index: true },
          { path: 'three', element: <PageThree /> },
          { path: 'results', element: <QuizResults /> },
        ],
      },
    ],
  },
];
