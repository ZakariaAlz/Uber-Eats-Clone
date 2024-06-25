import { useContext, useState, useEffect } from 'react';
import { Box, Card, Typography, CardHeader, CardContent, Container, TextField, Grid, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { updateTechnical } from '../api/technical';

function ProfilePage() {
    const { authState, setAuthState } = useContext(AuthContext); // Added setAuthState to update auth state
    const userInfo = authState.userInfo;
    const technical = JSON.parse(localStorage.getItem('technical'));// Parse restaurant data
    console.log(technical)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phonenumber: userInfo?.phonenumber || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phonenumber: Yup.number().required('Phone number is required'),
        }),
        onSubmit: values => {

            // Update other fields in MongoDB
            const technicalUpdate = {
                ...technical,
                name: values.name,
                phonenumber: values.phonenumber,
            };

            updateTechnical(technicalUpdate, technical._id)
                .then((res) => {
                    console.log(res);
                    setSnackbarContent('Profile updated !');
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    console.error(error);
                    setSnackbarContent('An error occurred while updating MongoDB. Please try again.');
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                });
        }
    });

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_AUTH_IP_ADDRESS}/user/${userInfo.id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
                apikey: process.env.REACT_APP_API_KEY,
                role: process.env.REACT_APP_ROLE
            },
        }).then((response) => {
            if (response.data.error) {
                setSnackbarContent(response.data.error);
                setSnackbarSeverity("error");
            } else {
                setSnackbarContent('Account deleted successfully');
                setSnackbarSeverity("success");
                localStorage.removeItem("accessToken")
                setAuthState({ // Reset the auth state
                    userInfo: null,
                    isAuthenticated: false
                });
                navigate("/login")
            }
            setSnackbarOpen(true);
        }).catch((error) => {
            console.error(error);
            setSnackbarContent('An error occurred. Please try again.');
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        });
    };


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_AUTH_IP_ADDRESS}/user/checkAuth`, { headers: { accessToken: localStorage.getItem("accessToken"), apikey: process.env.REACT_APP_API_KEY, role: process.env.REACT_APP_ROLE } }).then((response) => {
            if (response.data.error) {
                setAuthState({ userInfo: null, isAuthenticated: false });
            } else {
                setAuthState({
                    userInfo: {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        role: response.data.user.role
                    },
                    isAuthenticated: true
                });
            }
        }).catch((error) => {
            console.error("Error fetching authentication status:", error);
            setAuthState({ userInfo: null, isAuthenticated: false });
        });
    }, [setAuthState]);

    return (
        <Container>
            <Card>
                <CardHeader title="Profile" subheader="Edit your profile" />
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phonenumber"
                                    value={formik.values.phonenumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                                    helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                />
                            </Grid>
                            
                            <Grid item  sm={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Save
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
                                Delete
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarContent}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default ProfilePage
