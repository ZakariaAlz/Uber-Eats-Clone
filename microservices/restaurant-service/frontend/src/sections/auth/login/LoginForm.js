import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../api/auth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(username, password);
      await localStorage.setItem('token', res.data.token);
      await localStorage.setItem('admin', JSON.stringify(res.data.admin));
      console.log(res.data.user)
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Box style={{ marginTop: '1rem' }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin} loading={loading}>
          Login
        </LoadingButton>
      </Box>
    </>
  );
}
