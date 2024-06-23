import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateArticle } from '../api/article';

export default function Update() {
    const { id, Reference, Designation, Quantite, Prixunitaire, Prixdachat } = useLocation().state;

    const [reference, setReference] = useState(Reference);
    const [designation, setDesignation] = useState(Designation);
    const [quantite, setQuantite] = useState(Quantite);
    const [prixunitaire, setPrixunitaire] = useState(Prixunitaire);
    const [prixdachat, setPrixdachat] = useState(Prixdachat);



    const handleQuantiteChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setQuantite(numericOnly);
    };

    const handlePrixunitaireChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setPrixunitaire(numericOnly);
    };

    const handlePrixdachatChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setPrixdachat(numericOnly);
    };

    const handleSubmit = () => {

        const article = {
            reference,
            designation,
            quantite,
            prixunitaire,
            prixdachat
        };

        if (window.confirm("Voulez-vous vraiment modifier cet Article?")) {
            updateArticle(article, id)
                .then((res) => {
                    console.log(res);
                    window.alert("Article Modifié avec Succès!");
                })
                .catch((error) => {
                    window.alert("L'article n'a pas été modifié. Veuillez vérifier les informations saisies.");
                    console.error(error);
                });
        }
    };

    return (
        <form>
            <h2>Modifier un Article</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Reference"
                            variant="outlined"
                            value={reference}
                            onChange={(event) => setReference(event.target.value)}
                            name="reference"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Prix D'achat" variant="outlined" value={prixdachat} onChange={handlePrixdachatChange} name="prixunitaire" required InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Designation"
                            variant="outlined"
                            value={designation}
                            onChange={(event) => setDesignation(event.target.value)}
                            name="designation"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            id="standard-basic"
                            label="Prix Unitaire"
                            variant="outlined"
                            value={prixunitaire}
                            onChange={handlePrixunitaireChange}
                            name="prixunitaire"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="start">Piéces</InputAdornment>,
                            }}
                            id="standard-basic"
                            label="Quantité"
                            variant="outlined"
                            value={quantite}
                            onChange={handleQuantiteChange}
                            name="quantite"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/products">
                            <Button variant="contained" onClick={handleSubmit}>
                                Modifier Article
                            </Button>
                        </Link>
                    </Grid>
                </Grid>

            </Box>
        </form>
    );
}