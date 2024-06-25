import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid, InputAdornment } from '@mui/material';
import { createClient } from '../api/client'; // import the createUser function from your API file


export default function CreateUser() {

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [entreprise, setEntreprise] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tel, setTel] = useState("")
    const [solde, setSolde] = useState("")



    const clearTextBox = () => {

        setNom("")
        setPrenom("")
        setEntreprise("")
        setEmail("")
        setPassword("")
        setTel("")
        setSolde("")
    }


    const handleTelChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setTel(numericOnly);
      };

      const handleSoldeChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setSolde(numericOnly);
      };

    const handleSubmit = () => {

        // create a new FormData object
        // const formData = new FormData();

        // // add the file to the FormData object
        // const profilePicFile = event.target.elements.profile_pic.files[0];
        // formData.append('profile_pic', profilePicFile, profilePicFile.name);
        // const idcardfile = event.target.elements.id_card.files[0];
        // formData.append('id_card_file', idcardfile, idcardfile.name);

        // add the other form data to the FormData object
        const client = {
            nom,
            prenom,
            entreprise,
            tel,
            email: email.toLocaleLowerCase(),
            password,
            solde
        }
        console.log(client)


        // send the FormData object to the server using axios
        createClient(client)
            .then((res) => {
                console.log(res.data)
                window.alert("User created successfully!");
            })
            .catch((error) => {
                console.error(error);
                window.alert("Email already used, Use a diffirent one!!!");
            });

        clearTextBox()

    };

    return (
        <form>

            <h2>Create a new User</h2>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Nom"
                            variant="outlined"
                            value={nom}
                            onChange={(event) => {
                                setNom(event.target.value)
                            }}
                            name="nom"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right'}}>
                        <TextField
                            id="standard-basic"
                            label="Prénom"
                            variant="outlined"
                            value={prenom}
                            onChange={(event) => {
                                setPrenom(event.target.value)
                            }}
                            name="prenom"
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Numero Téléphone"
                            variant="outlined"
                            value={tel}
                            onChange={handleTelChange}
                            name="tel"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            name="email"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Entreprise"
                            variant="outlined"
                            value={entreprise}
                            onChange={(event) => {
                                setEntreprise(event.target.value)
                            }}
                            name="entreprise"
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField
                            id="standard-basic"
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            name="password"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            id="standard-basic"
                            label="Doit"
                            variant="outlined"
                            value={solde}
                            onChange={handleSoldeChange}
                            name="solde"
                            required
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                            >
                                Ajouter Client
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}