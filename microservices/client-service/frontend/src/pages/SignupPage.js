import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { SignupForm } from '../sections/auth/signup';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title> Sign Up </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <img src="/favicon/CESI_Eats.png"  alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" align='center' gutterBottom>
              Sign up to CESI-Eats Client
            </Typography>

            <Typography variant="body1" sx={{ mb: 5 }}>
              You already have an account? {''}
              <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={()=>{navigate("/login")}} >Sign in</Link>
            </Typography>
            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}