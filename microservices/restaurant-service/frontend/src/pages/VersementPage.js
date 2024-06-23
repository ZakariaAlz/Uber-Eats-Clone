import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { getVersements, deleteVersement } from '../api/versement'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'nom', label: 'Nom', alignRight: false },
    { id: 'prenom', label: 'Prénom', alignRight: false },
    { id: 'entreprise', label: 'Entreprise', alignRight: false },
    { id: 'tel', label: 'Téléphone', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'montant', label: 'Montant', alignRight: false },
    { id: 'delete', label: '', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        const filteredArray = stabilizedThis.filter((user) => {
            const lowerQuery = query.toLowerCase();
            const lowerName = user[0].client.nom.toLowerCase();
            const lowerPrneom = user[0].client.prenom.toLowerCase();
            const lowerEnterprise = user[0].client.entreprise.toLowerCase();
            return lowerName.includes(lowerQuery) || lowerPrneom.includes(lowerQuery) || lowerEnterprise.includes(lowerQuery);
        });
        return filteredArray.map((el) => el[0]);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('nom');

    const [filterName, setFilterName] = useState('');

    const [versements, setVersements] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getVersements()
            .then((res) => {
                setVersements(res.data)
                setLoading(false)
            })
            .catch(err => console.error(err));
    }, []);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = versements.map((n) => n.nom);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleDelete = (versementId) => {
        deleteVersement(versementId)
            .then(() => {
                setVersements(versements.filter((versement) => versement._id !== versementId));
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - versements.length) : 0;

    const filteredAdmins = applySortFilter(versements, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredAdmins.length && !!filterName;


    return (
        <>
            <Helmet>
                <title> Versements Page </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Versements
                    </Typography>
                    <Link to="/dashboard/create-versement">
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Ajouter Versement
                        </Button>
                    </Link>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={versements.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : isNotFound ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                No matching records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredAdmins
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((versement) => {
                                                const formattedDate = format(new Date(versement.created_at), 'dd/MM/yyyy'); // Or use the format that matches your desired date format
                                                const { _id, client, montant } = versement;
                                                const isItemSelected = selected.indexOf(_id) !== -1;

                                                return (
                                                    <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>


                                                        <TableCell align="left">
                                                            <Stack direction="row" alignItems="center" spacing={1}>

                                                                {client && client.nom ? `${client.nom}` : 'N/A'}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="left">{client && client.prenom ? `${client.prenom}` : 'N/A'}</TableCell>
                                                        
                                                        <TableCell align="left">{client && client.entreprise ? `${client.entreprise}` : 'N/A'}</TableCell>
                                                        <TableCell align="left">{client && client.tel ? `${client.tel}` : 'N/A'}</TableCell>
                                                        <TableCell align="left">{formattedDate}</TableCell>
                                                        <TableCell align="left">{montant} DA</TableCell>
                                                        <TableCell align="right">




                                                            <IconButton style={{ color: "red" }} onClick={() => {
                                                                if (window.confirm('Voulez-vous vraiment supprimer ce Versement ?')) {
                                                                    handleDelete(versement._id);
                                                                }
                                                            }}>
                                                                <Iconify icon="ant-design:delete-filled" width={20} height={20} />
                                                            </IconButton>

                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={versements.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>


        </>
    );
}
