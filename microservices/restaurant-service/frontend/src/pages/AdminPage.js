import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
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

import { getAdmins, deleteAdmin } from '../api/admin'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'prenom', label: 'Prénom', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'tel', label: 'Téléphone', alignRight: false },
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
    return filter(array, (_user) => _user.nom.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nom');

  const [filterName, setFilterName] = useState('');

  const [admins, setAdmins] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdmins()
      .then((res) => {
        setAdmins(res.data)
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
      const newSelecteds = admins.map((n) => n.firstname);
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

  const handleDelete = (adminId) => {
    deleteAdmin(adminId)
      .then(() => {
        setAdmins(admins.filter((admin) => admin._id !== adminId));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admins.length) : 0;

  const filteredAdmins = applySortFilter(admins, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredAdmins.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Admin Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admins
          </Typography>
          <Link to="/dashboard/create-admin">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Ajouter Admin
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
                  rowCount={admins.length}
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
                      .map((admin) => {
                        const { _id, nom, prenom, username, tel } = admin;
                        const isItemSelected = selected.indexOf(_id) !== -1;

                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>
                            

                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                
                                {nom}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{prenom}</TableCell>
                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">{tel}</TableCell>
                            <TableCell align="right">


                              <Link to="/dashboard/update-admin" state={{
                                id: _id,
                                Nom: nom,
                                Prenom: prenom,
                                Username: username,
                                Tel:tel
                              }}>
                                <IconButton style={{ color: "green" }}>
                                  <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                                </IconButton>
                              </Link>

                              <IconButton style={{ color: "red" }} onClick={() => {
                                if (window.confirm('Voulez-vous vraiment supprimer cet Admin ?')) {
                                  handleDelete(admin._id);
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
            count={admins.length}
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
