import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { paiementPub } from '../api/pub'; // import the createUser function from your API file



export default function Update() {
    const { id, pub, titre, ClientNom, ClientPrenom, ClientEntreprise, ClientTel, Devis, description, Hauteur, Largeur } = useLocation().state
    const [versement, setVersement] = useState("");

    const handlVersementChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setVersement(numericOnly);
    };
    const handleSubmit = () => {
        const updatedpub = {
            ...pub,
            etat: "Confirmé",
            versement
        }

        if (versement >= Devis) {
            updatedpub.paye = "Payé";
        } else {
            updatedpub.paye = "Payé Partiellement";
        }

        if (window.confirm("Voulez-vous vraiment continuer ce Paiement?")) {
            paiementPub(updatedpub, id)
                .then((res) => {
                    console.log(res);
                    window.alert("Paiement effectué avec succès!");
                })
                .catch((error) => {
                    window.alert("Le paiement n'a pas été effectué!!!");
                    console.error(error);
                });
        }
    };
    return (
        <form>
            <h2>Paiement d'une Commande de Publicité</h2>

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
                            id="versement"
                            label="Versement"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            value={versement}
                            onChange={handlVersementChange}
                            name="Versement"
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
                    <Grid item xs={6}>
                        <TextField
                            id="devis"
                            label="Devis"
                            variant="outlined"
                            value={Devis}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            name="Devis"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/pub">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Paiement
                            </Button>
                        </Link>
                    </Grid>

                    {/* Render the rest of your form... */}
                </Grid>
            </Box>
        </form>
    );
}