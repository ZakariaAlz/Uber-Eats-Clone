import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, FormControl, InputLabel, MenuItem, Select, InputAdornment, Box, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import { createCommande } from '../api/commande';
import { getRestaurants } from '../api/restaurant';
import { getArticlebyRestaurant } from '../api/article';
import { getMenubyRestaurant } from '../api/menu';

export default function Create() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState('');
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [quantityA, setQuantityA] = useState("");
    const [quantityM, setQuantityM] = useState("");
    const [selectedArticleData, setSelectedArticleData] = useState(null);
    const [selectedMenuData, setSelectedMenuData] = useState(null);
    const [restaurants, setRestaurant] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [totalprice, setTotalprice] = useState(0);
    const [inputItems, setInputItems] = useState([]);

    const numero = generateRandomNumero();

    function generateRandomNumero() {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return `CMD${randomNum}`;
    }

    const handleArticleChange = (event) => {
        setSelectedArticle(event.target.value);
        const selectedArticleInfo = articles.find(article => article._id === event.target.value);
        setSelectedArticleData(selectedArticleInfo);
    };

    const handleMenuChange = (event) => {
        setSelectedMenu(event.target.value);
        const selectedMenuInfo = menus.find(menu => menu._id === event.target.value);
        setSelectedMenuData(selectedMenuInfo);
    };

    const handleQuantityAChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setQuantityA(numericOnly);
    };

    const handleQuantityMChange = (event) => {
        const inputText = event.target.value;
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setQuantityM(numericOnly);
    };

    const handleAddArticle = () => {
        const newInputItem = {
            id: Date.now(),
            type: 'article',
            selectedArticle,
            quantity: quantityA,
            selectedArticleData,
        };

        const priceForNewItem = (quantityA || 0) * (selectedArticleData.price || 0);
        setTotalprice(parseFloat(totalprice || 0) + priceForNewItem);
        setInputItems([...inputItems, newInputItem]);
        setSelectedArticle('');
        setQuantityA('');
        setSelectedArticleData(null);
    };

    const handleAddMenu = () => {
        const newInputItem = {
            id: Date.now(),
            type: 'menu',
            selectedMenu,
            quantity: quantityM,
            selectedMenuData,
        };

        const priceForNewItem = (quantityM || 0) * (selectedMenuData.price || 0);
        setTotalprice(parseFloat(totalprice || 0) + priceForNewItem);
        setInputItems([...inputItems, newInputItem]);
        setSelectedMenu('');
        setQuantityM('');
        setSelectedMenuData(null);
    };

    const handleRemoveItem = (itemId) => {
        const removedItem = inputItems.find(item => item.id === itemId);
        const priceForRemovedItem = (removedItem.quantity || 0) * (removedItem.type === 'article' ? (removedItem.selectedArticleData.price || 0) : (removedItem.selectedMenuData.price || 0));
        setTotalprice(parseFloat(totalprice || 0) - priceForRemovedItem);
        setInputItems(inputItems.filter(item => item.id !== itemId));
    };

    const client = JSON.parse(localStorage.getItem('client'));

    useEffect(() => {
        getRestaurants()
            .then((res) => {
                setRestaurant(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedRestaurant) {
            getArticlebyRestaurant(selectedRestaurant)
                .then(res => setArticles(res.data))
                .catch(err => console.error(err));
            getMenubyRestaurant(selectedRestaurant)
                .then(res => setMenus(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedRestaurant]);

    const handleSubmit = () => {
        const articlesList = inputItems
            .filter(item => item.type === 'article')
            .map(item => ({
                article: item.selectedArticle,
                quantity: item.quantity,
                category:item.category,
                name: item.selectedArticleData ? item.selectedArticleData.name : '',
                price: item.selectedArticleData ? item.selectedArticleData.price : 0,
                totalprice: (item.quantity || 0) * (item.selectedArticleData ? item.selectedArticleData.price : 0),
            }));

        const menusList = inputItems
            .filter(item => item.type === 'menu')
            .map(item => ({
                menu: item.selectedMenu,
                quantity: item.quantity,
                name: item.selectedMenuData ? item.selectedMenuData.name : '',
                price: item.selectedMenuData ? item.selectedMenuData.price : 0,
                totalprice: (item.quantity || 0) * (item.selectedMenuData ? item.selectedMenuData.price : 0),
            }));

        const commande = {
            no: numero,
            client: client._id,
            restaurant: selectedRestaurant,
            delivery: null,
            articles: articlesList,
            menus: menusList,
            totalprice,
            state: "New Commande",
            deliverydate: null
        };

        console.log('commande:', commande);

        createCommande(commande)
            .then((res) => {
                console.log(res);
                window.alert("Commande Created!!!");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Create a new Order
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Autocomplete
                                id="restaurant"
                                options={restaurants}
                                getOptionLabel={(option) => option.name}
                                value={restaurants.find((restaurant) => restaurant._id === selectedRestaurant) || null}
                                onChange={(event, newValue) => {
                                    setSelectedRestaurant(newValue ? newValue._id : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Restaurant"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="article-label">Article:</InputLabel>
                                <Select
                                    labelId="article-label"
                                    id="article"
                                    value={selectedArticle}
                                    onChange={handleArticleChange}
                                    label="Article"
                                >
                                    <MenuItem value="">
                                        <em>Choose an Article</em>
                                    </MenuItem>
                                    {articles.map((article) => (
                                        <MenuItem key={article._id} value={article._id}>
                                            {article.name} / {article.category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="quantityA"
                                label="Quantity Article"
                                variant="outlined"
                                value={quantityA}
                                onChange={handleQuantityAChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="unit-price"
                                label="Price"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">DZD</InputAdornment>,
                                }}
                                value={selectedArticleData ? selectedArticleData.price : ''}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="total-price"
                                label="Total Price"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">DZD</InputAdornment>,
                                }}
                                value={(quantityA * (selectedArticleData ? selectedArticleData.price : 0)).toString()}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" onClick={handleAddArticle} fullWidth>
                                Ajouter Article
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="menu-label">Menu:</InputLabel>
                                <Select
                                    labelId="menu-label"
                                    id="menu"
                                    value={selectedMenu}
                                    onChange={handleMenuChange}
                                    label="Menu"
                                >
                                    <MenuItem value="">
                                        <em>Choose a Menu</em>
                                    </MenuItem>
                                    {menus.map((menu) => (
                                        <MenuItem key={menu._id} value={menu._id}>
                                            {menu.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="quantityM"
                                label="Quantity Menu"
                                variant="outlined"
                                value={quantityM}
                                onChange={handleQuantityMChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="menu-price"
                                label="Price"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">DZD</InputAdornment>,
                                }}
                                value={selectedMenuData ? selectedMenuData.price : ''}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                id="menu-total-price"
                                label="Total Price"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">DZD</InputAdornment>,
                                }}
                                value={(quantityM * (selectedMenuData ? selectedMenuData.price : 0)).toString()}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" onClick={handleAddMenu} fullWidth>
                                Ajouter Menu
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <Typography variant="h6" component="h4" gutterBottom>
                            Selected Items
                        </Typography>
                        {inputItems.length === 0 ? (
                            <Typography>No items selected</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {inputItems.map((item) => (
                                    <Grid item xs={12} key={item.id}>
                                        <Paper elevation={1} sx={{ padding: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Typography variant="subtitle1">
                                                        {item.type === 'article' ? item.selectedArticleData.name : item.selectedMenuData.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {item.type === 'article' ? item.selectedArticleData.category : 'Menu'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="subtitle1">
                                                        {item.quantity}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="subtitle1">
                                                        {(item.type === 'article' ? item.selectedArticleData.price : item.selectedMenuData.price).toString()} DZD
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="subtitle1">
                                                        {(item.quantity * (item.type === 'article' ? item.selectedArticleData.price : item.selectedMenuData.price)).toString()} DZD
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        <Typography variant="h6" component="h4" sx={{ marginTop: 2 }}>
                            Total: {totalprice} DZD
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <Button component={Link} to="/dashboard/order" variant="contained">
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit Order
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
