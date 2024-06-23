import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateClient } from '../api/client'; // import the createUser function from your API file


export default function Update() {
    const { id, Nom, Prenom, Tel, Email, Entreprise, Solde } = useLocation().state

    const [nom, setNom] = useState(Nom)
    const [prenom, setPrenom] = useState(Prenom)
    const [entreprise, setEntreprise] = useState(Entreprise)
    const [email, setEmail] = useState(Email)
    const [password, setPassword] = useState("")
    const [tel, setTel] = useState(Tel)
    const [solde, setSolde] = useState(Solde)


   
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

        const client = {
            nom,
            prenom,
            entreprise,
            tel,
            email: email.toLocaleLowerCase(),
            password,
            solde
        }

        if (window.confirm("Voullez vous vraiment modifier ce Client?")) {
            updateClient(client, id)
                .then((res) => {
                    console.log(res)
                    window.alert("Client Modifier avec Succes!");
                })
                .catch((error) => {
                    window.alert("Client n'etait pas modifier, Veuillez vérifier les informations saisies!!!");
                    console.error(error);
                });
        }
    };

    return (
        <form>

            <h2>Modifier un Client</h2>

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
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right'}}>
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
                            type="solde"
                            label="Solde"
                            variant="outlined"
                            value={solde}
                            onChange={handleSoldeChange}
                            name="solde"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Grid item xs={3}>
                        <Link to="/dashboard/user">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                            >
                                Modifier Client
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}