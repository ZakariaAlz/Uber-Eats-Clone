import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
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
import { getComponents, deleteComponent } from '../api/component';
import CodePdf from './CodePdf';  // import your PDF document component

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'code', label: 'Code', alignRight: false },
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [components, setComponents] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComponents()
            .then((res) => {
                setComponents(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = components.map((n) => n.firstname);
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

    const handleDelete = (componentId) => {
        deleteComponent(componentId)
            .then(() => {
                setComponents(components.filter((component) => component._id !== componentId));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - components.length) : 0;

    const filteredAdmins = applySortFilter(components, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredAdmins.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>Component Page</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Components
                    </Typography>
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
                                    rowCount={components.length}
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
                                            .map((component) => {
                                                const formattedDate = format(new Date(component.created_at), 'dd/MM/yyyy HH:mm:ss');
                                                const { _id, name, code } = component;
                                                const isItemSelected = selected.indexOf(_id) !== -1;

                                                const receiptData = [
                                                    { name: 'Name', value: name },
                                                    { name: 'Code', value: code },
                                                ];

                                                return (
                                                    <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>
                                                        <TableCell align="left">
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                {formattedDate}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="left">{name}</TableCell>
                                                        <TableCell align="left">{code}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton style={{ color: 'green' }}>
                                                                <PDFDownloadLink document={<CodePdf data={receiptData} />} fileName={`Code_${name}.pdf`}>
                                                                    <Iconify icon="mdi:file-pdf-box" width={20} height={20} />
                                                                </PDFDownloadLink>
                                                            </IconButton>
                                                        </TableCell>
                                                        {/* <TableCell align="right">
                                                            <IconButton style={{ color: 'red' }} onClick={() => handleDelete(_id)}>
                                                                <Iconify icon="ant-design:delete-filled" width={20} height={20} />
                                                            </IconButton>
                                                        </TableCell> */}
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
                        count={components.length}
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