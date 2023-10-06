import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import ProfileView from 'src/sections/profile/view';

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/collections'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
const PageSeven = lazy(() => import('src/pages/dashboard/seven'));
const PageEight = lazy(() => import('src/pages/dashboard/eight'));
const QuizPage = lazy(() => import('src/sections/quiz/index'));

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
      {
        path: 'group',
        children: [
          { element: <PageSix />, index: true },
          { path: 'seven', element: <PageSeven /> },
          { path: 'eight', element: <PageEight /> },
        ],
      },
    ],
  },
];
