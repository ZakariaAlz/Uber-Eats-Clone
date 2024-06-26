import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';



export default function Update() {
    const { Client, ClientAddress, Restaurant, RestaurantAddress, State, Totalprice, Articles, Menus } = useLocation().state

   
    return (
        <form>
            <h2>Check an Order</h2>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Render text fields */}
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
                            label="Client Address"
                            variant="outlined"
                            value={ClientAddress}
                            name="Client Adress"
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
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Restaurant Address"
                            variant="outlined"
                            value={RestaurantAddress}
                            name="Restaurant Address"
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
                        <TextField
                            id="outlined-basic"
                            label="State"
                            variant="outlined"
                            value={State}
                            name="State"
                            disabled
                        />
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
                        <Link to="/dashboard/order">
                            <Button variant="contained" color="primary">
                                To Orders
                            </Button>
                        </Link>
                    </Grid>

                    {/* Render the rest of your form... */}
                </Grid>
            </Box>
        </form >
    );
}