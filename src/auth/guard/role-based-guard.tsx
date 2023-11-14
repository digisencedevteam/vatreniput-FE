import { m } from 'framer-motion';
import { Theme, SxProps } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { MotionContainer, varBounce } from 'src/components/animate';

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const RoleBasedGuard = ({
  hasContent,
  roles,
  children,
  sx,
}: RoleBasedGuardProp) => {
  const { user } = useMockedUser();
  const currentRole = user?.role;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={{ textAlign: 'center', ...sx }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant='h3' sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>
        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>
        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }
  return <> {children} </>;
};
export default RoleBasedGuard;
