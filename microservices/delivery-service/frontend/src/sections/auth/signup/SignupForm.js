import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Snackbar, Alert, Collapse } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
import { AuthContext } from "../../../helpers/AuthContext";

export default function SignupForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const { setAuthState } = useContext(AuthContext); // useContext(AuthContext) must return setAuthState
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phonenumber: '',
            adress: '',
            referralCodeused: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Na is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            phonenumber: Yup.number().required('Phone number is required'),
            adress: Yup.string().required('Address is required'),
        }),
        onSubmit: (values) => {
            const apiKey = process.env.REACT_APP_API_KEY;
            console.log('Using API Key:', apiKey);  // Log the API key
            
            axios.post(`${process.env.REACT_APP_AUTH_IP_ADDRESS}/user/signup`, values, {
                headers: {
                    apikey: apiKey,
                    role: process.env.REACT_APP_ROLE
                }
            }).then((response) => {
                if (response.data.error) {
                    setSnackbarContent(response.data.error);
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                } else {
                    setSnackbarContent(response.data.message);
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);
                    navigate("/login");
                }
            }).catch((error) => {
                console.log(error);
                setSnackbarContent('An error occurred. Please try again.');
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3} sx={{ mb: 3 }}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <TextField
                        name="email"
                        label="Email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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

                    <TextField
                        name="phonenumber"
                        label="Phone"
                        value={formik.values.phonenumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                        helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                    />

                    <TextField
                        name="adress"
                        label="Address"
                        value={formik.values.adress}
                        onChange={formik.handleChange}
                        error={formik.touched.adress && Boolean(formik.errors.adress)}
                        helperText={formik.touched.adress && formik.errors.adress}
                    />

                    <TextField
                        name="referralCodeused"
                        label="Referral Code"
                        value={formik.values.referralCodeused}
                        onChange={formik.handleChange}
                        error={formik.touched.referralCodeused && Boolean(formik.errors.referralCodeused)}
                        helperText={formik.touched.referralCodeused && formik.errors.referralCodeused}
                    />

                    <Collapse in={serverError !== ""}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setServerError("")
                                    }}
                                >
                                    <Cancel fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="error"
                        >
                            {serverError}
                        </Alert>
                    </Collapse>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Sign Up
                </LoadingButton>
            </form>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarContent}
                </Alert>
            </Snackbar>
        </>
    );
}
