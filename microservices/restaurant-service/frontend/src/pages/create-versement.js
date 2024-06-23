import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import { createVersemnt } from '../api/versement'; // import the createUser function from your API file
import { getClients } from '../api/client';



export default function Create() {

    const [clients, setClients] = useState([]);
    const [selectedclient, setSelectedClient] = useState();

    const [montant, setMontant] = useState("")

    const [clientBalance, setClientBalance] = useState(0);

    const handleClientChange = (event, newValue) => {
        setSelectedClient(newValue);

        // Update the client balance from the selected client's "solde" property
        if (newValue) {
            setClientBalance(newValue.solde || 0);
        } else {
            setClientBalance(0);
        }
    };
    const handleMontantChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setMontant(numericOnly);
    };


    const clearTextBox = () => {

        setSelectedClient("")
        setMontant("")


    }

    useEffect(() => {
        getClients()
            .then((res) => {
                setClients(res.data);
            })
            .catch(err => console.error(err));
    }, []);



    const handleSubmit = () => {
        const versement = {
            client: selectedclient,
            montant,
        };

        // Display a confirmation dialog
        const isConfirmed = window.confirm("Voullez-vous vraiment ajouter ce Versement ?");

        if (isConfirmed) {
            // If confirmed, send the FormData object to the server using axios
            createVersemnt(versement)
                .then((res) => {
                    console.log(res);
                    window.alert("Versement ajouté avec succès!");
                })
                .catch((error) => {
                    console.error(error);
                });

            clearTextBox();
        }
    };

    return (
        <form>

            <h2>Ajouter un nouveau Versement</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        <Autocomplete
                            id="client"
                            options={clients}
                            getOptionLabel={(option) => `${option.nom} ${option.prenom} / ${option.entreprise}`}
                            value={selectedclient}
                            onChange={handleClientChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Client"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField
                            label="Dette client"
                            variant="outlined"
                            value={clientBalance}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="standard-basic" label="Montant de versement" variant="outlined" value={montant} InputProps={{
                            endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                        }} onChange={handleMontantChange} name="prenom" required />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/versement">
                            <Button variant="contained" onClick={() => {
                                handleSubmit()
                            }}>Ajouter Versement</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}