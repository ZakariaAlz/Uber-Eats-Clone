import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import { paiementCmdArticle } from '../api/cmdarticle'; // import the createUser function from your API file



export default function Update() {
    const { id, cmdarticle, ClientNom, ClientPrenom, ClientEntreprise, ClientTel, ClientSolde, Livraison, Prix, Articles } = useLocation().state
    const [versement, setVersement] = useState("");

    const handlVersementuantiteChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setVersement(numericOnly);
    };

    console.log(Articles)
    const handleSubmit = () => {
        const updatedCmdArticle = {
            ...cmdarticle,
            etat: "Confirmé",
            versement
        }

        if (Number(versement) >= Number(Prix)) {
            updatedCmdArticle.paye = "Payé";
        } else if (Number(versement) < Number(Prix)) {
            updatedCmdArticle.paye = "Payé Partiellement";
        }

        if (window.confirm("Voulez-vous vraiment continuer ce Paiement?")) {
            paiementCmdArticle(updatedCmdArticle, id)
                .then((res) => {
                    console.log(res);
                    window.alert("Paiement effectué avec succès!");
                })
                .catch((error) => {
                    window.alert("Le paiement n'a pas été effectué!!!");
                    console.error(error);
                });
        }
    };
    return (
        <form>
            <h2>Paiement d'une Commande d'achat d'article</h2>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Render text fields */}
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Nom"
                            variant="outlined"
                            value={ClientNom}
                            name="nom"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Prénom"
                            variant="outlined"
                            value={ClientPrenom}
                            name="prenom"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Entreprise"
                            variant="outlined"
                            value={ClientEntreprise}
                            name="entreprise"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Téléphone"
                            variant="outlined"
                            value={ClientTel}
                            name="telephone"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Livraison"
                            variant="outlined"
                            value={Livraison}
                            name="livraison"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Solde"
                            variant="outlined"
                            value={ClientSolde}
                            name="solde"
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
                                        <TableCell>Reference</TableCell>
                                        <TableCell>Designation</TableCell>
                                        <TableCell>Quantite</TableCell>
                                        <TableCell>Prix Unitaire</TableCell>
                                        <TableCell>Prix Total</TableCell>
                                        {/* Add more table headers for other properties as needed */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Articles.map((article, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{article.reference}</TableCell>
                                            <TableCell>{article.designation}</TableCell>
                                            <TableCell>{article.quantite}</TableCell>
                                            <TableCell>{article.prixu}</TableCell>
                                            <TableCell>{article.prixt}</TableCell>
                                            {/* Add more table cells for other properties as needed */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Versement"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            value={versement}
                            onChange={handlVersementuantiteChange}
                            name="Versement"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Total Price"
                            variant="outlined"
                            value={Prix}
                            name="Prix Total"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/dashboard/cmdarticle">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Paiement
                            </Button>
                        </Link>
                    </Grid>

                    {/* Render the rest of your form... */}
                </Grid>
            </Box>
        </form>
    );
}