import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateClient } from '../api/client'; // import the createUser function from your API file


export default function Update() {
    // const { id, Nom, Prenom, Tel, Email, Entreprise, Solde } = useLocation().state

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [adress, setAdress] = useState()
    const [state, setState] = useState()


   
    const handleTelChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setPhonenumber(numericOnly);
      };


    const handleSubmit = () => {

        const client = {
            ...client,
            name,
            phonenumber,
            adress,
            state
        }

        if (window.confirm("You sure want to update this Client?")) {
            updateClient(client, )
                .then((res) => {
                    console.log(res)
                    window.alert("Client Updated!");
                })
                .catch((error) => {
                    window.alert("Client n'etait pas modifier, Veuillez vérifier les informations saisies!!!");
                    console.error(error);
                });
        }
    };

    return (
        <form>

            <h2>Update a Client</h2>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            name="name"
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Phone Number"
                            variant="outlined"
                            value={phonenumber}
                            onChange={handleTelChange}
                            name="phonenumber"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex'}}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            name="email"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Address"
                            variant="outlined"
                            value={adress}
                            onChange={(event) => {
                                setAdress(event.target.value)
                            }}
                            name="adress"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                            displayEmpty
                            required
                        >
                            <MenuItem value="" disabled>
                                Select Category
                            </MenuItem>
                            <MenuItem value="Drinks">Activated</MenuItem>
                            <MenuItem value="Deserts">Not Activated</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Grid item xs={3}>
                        <Link to="/dashboard/client">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                            >
                                Update Client
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}