import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

import { getClients, deleteClient } from '../api/client'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phonenumber', label: "Phone Number", alignRight: false },
    { id: 'adress', label: 'Address', alignRight: false },
    { id: 'referralcode', label: 'Referral Code', alignRight: false },
    { id: 'state', label: 'State', alignRight: false },
    { id: 'edit', label: '', alignRight: true },
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
            const lowerName = user[0].nom.toLowerCase();
            const lowerEnterprise = user[0].entreprise.toLowerCase();
            return lowerName.includes(lowerQuery) || lowerEnterprise.includes(lowerQuery);
        });
        return filteredArray.map((el) => el[0]);
    }

    return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('firstname');

    const [filterName, setFilterName] = useState('');

    const [clients, setClients] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClients()
            .then((res) => {
                setClients(res.data)
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
            const newSelecteds = clients.map((n) => n.firstName);
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

    const handleDelete = (clientId) => {
        deleteClient(clientId)
            .then(() => {
                setClients(clients.filter((client) => client._id !== clientId));
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

    const filteredUsers = applySortFilter(clients, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;


    return (
        <>
            <Helmet>
                <title> Client Page </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Clients
                    </Typography>
                    {/* <Link to="/dashboard/create-client">
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Ajouter Client
                        </Button>
                    </Link> */}
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
                                    rowCount={clients.length}
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
                                        filteredUsers
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((client) => {
                                                const { _id, name, email, phonenumber, adresse, state } = client;
                                                const isItemSelected = selected.indexOf(_id) !== -1;

                                                return (
                                                    <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>

                                                        <TableCell align="left">
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                {name}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="left">{email}</TableCell>
                                                        <TableCell align="left">{phonenumber}</TableCell>
                                                        <TableCell align="left">{adresse}</TableCell>
                                                        <TableCell align="left">{state}</TableCell>
                                                        <TableCell align="right">

                                                            <Link to="/dashboard/update-client" state={{
                                                                // id: _id,
                                                                // Name: name,
                                                                // Email: email,
                                                                // Phonenumber: phonenumber,
                                                                // Adresse: adresse,
                                                                // State: state
                                                            }}>
                                                                <IconButton style={{ color: "green" }}>
                                                                    <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                                                                </IconButton>
                                                            </Link>

                                                            <IconButton style={{ color: "red" }} onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete this admin?')) {
                                                                    handleDelete(client._id);
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
                        count={clients.length}
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
