import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createAdmin } from '../api/admin'; // import the createUser function from your API file



export default function Create() {

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tel, setTel] = useState("")

    const clearTextBox = () => {

        setNom("")
        setPrenom("")
        setUsername("")
        setPassword("")
        setTel("")

    }

    const handleTelChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setTel(numericOnly);
    };

    const handleSubmit = () => {

        const admin = {
            nom,
            prenom,
            username: username.toLocaleLowerCase(),
            password,
            tel
        }

        // send the FormData object to the server using axios
        createAdmin(admin)
            .then((res) => {
                console.log(res)
                window.alert("Admin ajouter avec succes!");
            })
            .catch((error) => {
                console.error(error);
            });

        clearTextBox()
    };

    return (
        <form>

            <h2>Ajouter un nouveau Admin</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Nom" variant="outlined" value={nom} onChange={(event) => {
                            setNom(event.target.value)
                        }} name="nom" required />
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
                        <TextField id="standard-basic" label="Telephone" variant="outlined" value={tel} onChange={handleTelChange}
                            name="tel" required />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => {
                            handleSubmit()
                        }}>Ajouter Admin</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}