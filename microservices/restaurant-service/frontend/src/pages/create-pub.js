import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, InputAdornment, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import { createPub } from '../api/pub';
import { getClients } from '../api/client';


export default function Create() {
    const [clients, setClients] = useState([]);
    const [selectedclient, setSelectedClient] = useState('');
    const [hauteur, setHauteur] = useState('');
    const [largeur, setLargeur] = useState('');
    const [description, setDescription] = useState('');
    const [devis, setDevis] = useState('');
    const [versement, setVersement] = useState('');
    const [titre, setTitre] = useState('');
    const titleList = ['Carte de visite', 'Carte de Rendez-Vous', 'Flyer','Dépliant','Etiquettes','Ordonnance','Banner','Banderole','Panneau publicitaire avec Bache','Habillage de vitrine','Habillage de voiture','Habillage de façades extérieures','Lettre boitier', 'Lettre en Forex', 'Lettre en Alucobond', 'Caissons luminaux', 'LED neon flexible', 'Flocage T-shirt', 'Flocage Casquette', 'Flocage Sac', 'Habillage façade en Aluco']; // Replace with your list of titles


    const handleVersementChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setVersement(numericOnly);
    };
    const handleDevisChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setDevis(numericOnly);
    };
    const handleHauteurChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setHauteur(numericOnly);
    };
    const handleLargeurChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setLargeur(numericOnly);
    };



    useEffect(() => {
        getClients()
            .then((res) => {
                setClients(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = () => {
        const pub = {
            client: selectedclient,
            titre,
            dimension: {
                hauteur,
                largeur
            },
            description,
            devis,
            etat: "Confirmé",
            versement,
        };

        if (versement <= 0) {
            pub.paye = "Non Payé";
        } else if (versement >= devis) {
            pub.paye = "Payé";
        } else {
            pub.paye = "Payé Partiellement";
        }
        console.log('pub:', pub);

        // Send the FormData object to the server using axios
        createPub(pub)
            .then((res) => {
                console.log(res);
                window.alert("Commande de publicité ajoutée avec succès!");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form>
            <h2>Ajouter une nouvelle Commande de publicité</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={10}>
                        <Autocomplete
                            id="client"
                            options={clients}
                            getOptionLabel={(option) => `${option.nom} ${option.prenom} / ${option.entreprise}`}
                            value={clients.find((client) => client._id === selectedclient) || null}
                            onChange={(event, newValue) => {
                                setSelectedClient(newValue ? newValue._id : '');
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Client"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="titre"
                            label="Titre"
                            variant="outlined"
                            value={titre}
                            onChange={(event) => setTitre(event.target.value)}
                            name="titre"
                            select
                            fullWidth
                            required
                        >
                            {titleList.map((title, index) => (
                                <MenuItem key={index} value={title}>
                                    {title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="hauteur" label="Hauteur" variant="outlined" value={hauteur} onChange={handleHauteurChange} name="hauteur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="versement" label="Versement" variant="outlined" value={versement} onChange={handleVersementChange} name="devis" InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            name="description"
                            required
                            multiline
                            rows={5} // You can adjust the number of rows as needed
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="largeur" label="Largeur" variant="outlined" value={largeur} onChange={handleLargeurChange} name="largeur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="devis" label="Devis" variant="outlined" value={devis} onChange={handleDevisChange} name="devis" InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} required />
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/dashboard/pub">
                        <Button variant="contained" onClick={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                            Ajouter Commande de pub
                        </Button>
                    </Link>
                </Grid>
            </Box>
        </form>
    );
}
