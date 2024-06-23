import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateAdmin } from '../api/admin'; // import the createUser function from your API file


export default function Update() {
    const { id, Nom, Prenom, Username, Tel } = useLocation().state

    const [nom, setNom] = useState(Nom)
    const [prenom, setPrenom] = useState(Prenom)
    const [username, setUsername] = useState(Username)
    const [tel, setTel] = useState(Tel)
    const [password, setPassword] = useState("")


    const handleSubmit = () => {

        const admin = {
            nom,
            prenom,
            username,
            password,
            tel
        }

        if (window.confirm("Voullez vous vraiment modifier cet Admin?")) {
            updateAdmin(admin, id)
                .then((res) => {
                    console.log(res)
                    window.alert("Admin Modifier avec Succes!");
                })
                .catch((error) => {
                    window.alert("Admin n'etait pas modifier, Veuillez vérifier les informations saisies!!!");
                    console.error(error);
                });
        }
    };

    return (
        <form>

            <h2>Modifier un Admin</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Nom" variant="outlined" value={nom} onChange={(event) => {
                            setNom(event.target.value)
                        }} name="firstname" required />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField id="standard-basic" label="Prenom" variant="outlined" value={prenom} onChange={(event) => {
                            setPrenom(event.target.value)
                        }} name="prenom" required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="UserName" variant="outlined" value={username} onChange={(event) => {
                            setUsername(event.target.value)
                        }} name="username" required />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField id="standard-basic" label="PassWord" variant="outlined" value={password} onChange={(event) => {
                            setPassword(event.target.value)
                        }} name="password" type="password" required />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Telephone" variant="outlined" value={tel} onChange={(event) => {
                            setTel(event.target.value)
                        }} name="tel" required />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/admin">
                            <Button variant="contained" onClick={() => {
                                handleSubmit()
                            }}>Modifier Admin</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}