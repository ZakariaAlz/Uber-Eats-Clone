import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updatePub } from '../api/pub'; // import the createUser function from your API file



export default function Update() {
    const { id, pub, ClientNom, ClientPrenom, ClientEntreprise, ClientTel, description, Hauteur, Largeur } = useLocation().state
    const [etat, setEtat] = useState("");
    const [devis, setDevis] = useState("");

    const handleDevisChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setDevis(numericOnly);
    }


    const handleSubmit = () => {

        const updatedpub = {
            ...pub,
            etat,
            devis
        }

        if (window.confirm("Voullez vous vraiment continuer cette Modification ?")) {
            updatePub(updatedpub, id)
                .then((res) => {
                    console.log(res)
                    window.alert("Modification éffectué avec Succes!");
                })
                .catch((error) => {
                    window.alert("Modification n'etait pas éffectuer!!!");
                    console.error(error);
                });
        }
    };
    return (
        <form>
            <h2> Confirmer ou Annuler une Commande de Publicité</h2>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Render text fields */}
                    <Grid item xs={6}>
                        <TextField
                            id="nom"
                            label="Nom"
                            variant="outlined"
                            value={ClientNom}
                            name="nom"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="prenom"
                            label="Prénom"
                            variant="outlined"
                            value={ClientPrenom}
                            name="prenom"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="entreprise"
                            label="Entreprise"
                            variant="outlined"
                            value={ClientEntreprise}
                            name="entreprise"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="telephone"
                            label="Téléphone"
                            variant="outlined"
                            value={ClientTel}
                            name="telephone"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            value={description}
                            name="description"
                            disabled
                            multiline
                            rows={5} // You can adjust the number of rows as needed
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="hauteur"
                            label="Hauteur"
                            variant="outlined"
                            value={Hauteur}
                            name="Hauteur"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="largeur"
                            label="Largeur"
                            variant="outlined"
                            value={Largeur}
                            name="Largeur"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl sx={{ width: '20%' }}>
                            <InputLabel id="etat-label">Etat</InputLabel>
                            <Select
                                id="outlined-basic"
                                labelId="etat-label"
                                variant="outlined"
                                value={etat}
                                onChange={(event) => {
                                    setEtat(event.target.value);
                                }}
                                label="Etat"
                            >
                                <MenuItem value="Confirmé">Confirmé</MenuItem>
                                <MenuItem value="Annulée">Annulée</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            id="devis"
                            label="Devis"
                            variant="outlined"
                            value={devis}
                            onChange={handleDevisChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            name="Devis"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/pub">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Modifer Commande
                            </Button>
                        </Link>
                    </Grid>

                    {/* Render the rest of your form... */}
                </Grid>
            </Box>
        </form>
    );
}