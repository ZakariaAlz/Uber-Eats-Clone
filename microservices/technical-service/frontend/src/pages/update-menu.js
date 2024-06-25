import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useLocation } from 'react-router-dom';
import { updateMenu } from '../api/menu'; // import the createUser function from your API file


export default function Update() {
    const { id, Name, Description, Price } = useLocation().state

    const [name, setName] = useState(Name);
    const [description, setDescription] = useState(Description);
    const [price, setPrice] = useState(Price);

    const handlePriceChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setPrice(numericOnly);
    };

    const handleSubmit = () => {

        const menu = {
            name,
            description,
            price
        }

        if (window.confirm("Update???")) {
            updateMenu(menu, id)
                .then((res) => {
                    console.log(res)
                    window.alert("Menu Updated!!!");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <form>
            <h2>Update a Menu</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            name="name"
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <TextField
                            id="standard-basic"
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            name="description"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            id="standard-basic"
                            label="Price"
                            variant="outlined"
                            value={price}
                            onChange={handlePriceChange}
                            name="price"
                            required
                            InputProps={{
                                endAdornment: <InputAdornment>DZD</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleSubmit}>Update Menu</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}
