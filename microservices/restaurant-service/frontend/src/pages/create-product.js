import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { createArticle } from '../api/article'; // import the createUser function from your API file


export default function Create() {
    const [reference, setReference] = useState("")
    const [designation, setDesignation] = useState("")
    const [quantite, setQuantite] = useState("")
    const [prixunitaire, setPrixunitaire] = useState("")
    const [prixdachat, setPrixdachat] = useState("")

    const clearTextBox = () => {

        setReference("")
        setDesignation("")
        setQuantite("")
        setPrixunitaire("")
        setPrixdachat("");

    }

    const handleQuantiteChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setQuantite(numericOnly);
    }

    const handlePrixunitaireChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
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
        }

        // send the FormData object to the server using axios
        createArticle(article)
            .then((res) => {
                console.log(res)
                window.alert("Produit ajouter avec succes!");
            })
            .catch((error) => {
                console.error(error);
            });

        clearTextBox()
    };

    return (
        <form>

            <h2>Ajouter un nouveau Produit</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Reference" variant="outlined" value={reference} onChange={(event) => {
                            setReference(event.target.value)
                        }} name="reference" required />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Prix D'achat" variant="outlined" value={prixdachat} onChange={handlePrixdachatChange} name="prixunitaire" required InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Designation" variant="outlined" value={designation} onChange={(event) => {
                            setDesignation(event.target.value)
                        }} name="designation" required />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Prix Unitaire" variant="outlined" value={prixunitaire} onChange={handlePrixunitaireChange} name="prixunitaire" required InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}/>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Quantité" variant="outlined" value={quantite} onChange={handleQuantiteChange} name="quantite" required InputProps={{
                                endAdornment: <InputAdornment position="start">Piéces</InputAdornment>,
                            }}/>
                    </Grid>
                    
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => {
                            handleSubmit()
                        }}>Ajouter Article</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}