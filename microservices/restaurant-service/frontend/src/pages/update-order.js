import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateCommande } from '../api/commande'; // import the updateCommande function from your API file

export default function Update() {
    const { id, commande, Client, Delivery, Restaurant, Totalprice, Articles, Menus } = useLocation().state;
    const [state, setState] = useState(commande.state);

    const handleSubmit = () => {
        const updatedCommande = {
            ...commande,
            state
        };

        if (window.confirm("Are you sure you want to update?")) {
            updateCommande(updatedCommande, commande._id)
                .then((res) => {
                    console.log(res);
                    window.alert("Order Updated!");
                })
                .catch((error) => {
                    window.alert("Order update failed!");
                    console.error(error);
                });
        }
    };

    const handleStateChange = (event) => {
        setState(event.target.value); // Update state when the user selects a different option
    };

    return (
        <form>
            <h2>Update an Order</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Render text fields */}
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Order Number"
                            variant="outlined"
                            value={commande.no}
                            name="Order Number"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Client Name"
                            variant="outlined"
                            value={Client}
                            name="Client Name"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Delivery Name"
                            variant="outlined"
                            value={Delivery}
                            name="Delivery Name"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Restaurant Name"
                            variant="outlined"
                            value={Restaurant}
                            name="Restaurant Name"
                            disabled
                        />
                    </Grid>

                    {/* Display Articles */}
                    <Grid item xs={12}>
                        <h3>Articles</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Articles.map((article, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{article.name}</TableCell>
                                            <TableCell>{article.category}</TableCell>
                                            <TableCell>{article.quantity}</TableCell>
                                            <TableCell>{article.price}</TableCell>
                                            <TableCell>{article.totalprice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    {/* Display Menus */}
                    <Grid item xs={12}>
                        <h3>Menus</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Menus.map((menu, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{menu.name}</TableCell>
                                            <TableCell>{menu.quantity}</TableCell>
                                            <TableCell>{menu.price}</TableCell>
                                            <TableCell>{menu.totalprice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    {/* Select State */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl sx={{ width: '20%' }}>
                            <InputLabel id="etat-label">State</InputLabel>
                            <Select
                                labelId="etat-label"
                                id="outlined-basic"
                                value={state}
                                onChange={handleStateChange} // Update state when the user selects a different option
                                label="State"
                            >
                                <MenuItem value="In Preparation">In Preparation</MenuItem>
                                <MenuItem value="Ready for Delivery">Ready for Delivery</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Display Total Price */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            id="outlined-basic"
                            label="Total Price"
                            variant="outlined"
                            value={Totalprice}
                            name="Total Price"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DZD</InputAdornment>,
                            }}
                            disabled
                        />
                    </Grid>
                    {/* Update Button */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Update Order
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}
