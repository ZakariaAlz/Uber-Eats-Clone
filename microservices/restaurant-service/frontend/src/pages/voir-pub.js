import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';


export default function Create() {
    const { titre, ClientNom, ClientPrenom, ClientEntreprise, Devis, description, Hauteur, Largeur, Versement } = useLocation().state
    const clientFullName = `${ClientNom} ${ClientPrenom} / ${ClientEntreprise}`;

    return (
        <form>
            <h2>Voir une Commande de publicité</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <TextField id="client" label="Client" variant="outlined" value={clientFullName} name="client" fullWidth disabled />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                            <TextField id="titre" label="Titre" variant="outlined" value={titre} name="titre" fullWidth disabled />
                        </Grid>
                    <Grid item xs={3}>
                        <TextField id="hauteur" label="Hauteur" variant="outlined" value={Hauteur} name="hauteur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} disabled />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="versement" label="Versement" variant="outlined" value={Versement} name="versement" InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} disabled />
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={3}>
                        <TextField id="largeur" label="Largeur" variant="outlined" value={Largeur} name="largeur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} disabled />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="devis" label="Devis" variant="outlined" value={Devis} name="devis" InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} disabled />
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/dashboard/pub">
                        <Button variant="contained" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                            Retourner Vers Commandes
                        </Button>
                    </Link>
                </Grid>
            </Box>
        </form>
    );
}
