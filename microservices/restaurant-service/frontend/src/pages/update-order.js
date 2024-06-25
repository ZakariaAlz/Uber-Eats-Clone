import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { updateCommande } from '../api/commande'; // import the createUser function from your API file



export default function Update() {
    const { id, commande, Client, Delivery, Restaurant, State, Totalprice, Articles, Menus } = useLocation().state
    const [state, setState] = useState(State);

    console.log(Articles)
    const handleSubmit = () => {

        const updatedCommande = {
            ...commande,
            state,
        }

        if (window.confirm("Voullez vous vraiment continuer cet Modification ?")) {
            updateCommande(updatedCommande, id)
                .then((res) => {
                    console.log(res)
                    window.alert("Order Updated!");
                })
                .catch((error) => {
                    window.alert("Order didn't get updated !!!");
                    console.error(error);
                });
        }
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



                    {/* Render other text fields similarly... */}

                    {/* Display Articles */}
                    <Grid item xs={12}>
                        <h3>Articles</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Quantite</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                        {/* Add more table headers for other properties as needed */}
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
                                            {/* Add more table cells for other properties as needed */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Menus</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Quantite</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                        {/* Add more table headers for other properties as needed */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Menus.map((menu, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{menu.name}</TableCell>
                                            <TableCell>{menu.quantity}</TableCell>
                                            <TableCell>{menu.price}</TableCell>
                                            <TableCell>{menu.totalprice}</TableCell>
                                            {/* Add more table cells for other properties as needed */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl sx={{ width: '20%' }}>
                            <InputLabel id="etat-label">State</InputLabel>
                            <Select
                                id="outlined-basic"
                                labelId="etat-label"
                                variant="outlined"
                                value={state}
                                onChange={(event) => {
                                    setState(event.target.value);
                                }}
                                label="State"
                            >
                                <MenuItem value="Confirmé">Confirmé</MenuItem>
                                <MenuItem value="Annulée">Annulée</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
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
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/commande">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Update Order
                            </Button>
                        </Link>
                    </Grid>

                    {/* Render the rest of your form... */}
                </Grid>
            </Box>
        </form >
    );
}