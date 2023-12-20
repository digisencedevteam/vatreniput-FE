import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import CompactLayout from 'src/layouts/compact';
import RegisterInfo from 'src/pages/auth/RegisterInfo';
import VerifyEmailPage from 'src/pages/auth/verify';
import ForgotPassword from 'src/pages/ForgotPassword';
import ResetPassword from 'src/pages/ResetPassword';

const Page404 = lazy(() => import('src/pages/404'));
const Faq = lazy(() => import('src/pages/Faq'));
const PrivacyPolicyPage = lazy(
  () => import('src/pages/PrivacyPolicyPage')
);
const UsagePolicyPage = lazy(
  () => import('src/pages/UsagePolicyPage')
);
const QuizPage = lazy(() => import('src/sections/quiz/index'));
const RewardPage = lazy(() => import('src/pages/QuizRewardInfo'));

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      { path: '404', element: <Page404 /> },
      { path: 'faq', element: <Faq /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'usage', element: <UsagePolicyPage /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:tokenId', element: <ResetPassword /> },
      { path: 'email-verified', element: <VerifyEmailPage /> },
      { path: 'email-verification', element: <RegisterInfo /> },
      {
        path: 'quiz/:quizId',
        element: <QuizPage />,
      },
      {
        path: 'quiz-reward-info',
        element: <RewardPage />,
      },
    ],
  },
];
