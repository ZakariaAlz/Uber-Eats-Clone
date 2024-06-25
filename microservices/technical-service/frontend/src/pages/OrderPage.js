import { Helmet } from 'react-helmet-async';
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
// import ReceiptPDF from './PaiementRecieptPdf'; // Import the ReceiptPDF component
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { getCommandes, deleteCommande } from '../api/commande'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'delivery', label: 'Delivery', alignRight: false },
  { id: 'restaurant', label: 'Restaurant', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'totalprice', label: 'Total Price', alignRight: false },
  { id: 'deliverydate', label: 'Del Time', alignRight: false },
  { id: 'download', label: '', alignRight: true },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, commandeBy) {
  if (b[commandeBy] < a[commandeBy]) {
    return -1;
  }
  if (b[commandeBy] > a[commandeBy]) {
    return 1;
  }
  return 0;
}

function getComparator(commande, commandeBy) {
  return commande === 'desc'
    ? (a, b) => descendingComparator(a, b, commandeBy)
    : (a, b) => -descendingComparator(a, b, commandeBy);
}


function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const commande = comparator(a[0], b[0]);
    if (commande !== 0) return commande;
    return a[1] - b[1];
  });

  if (query) {
    const filteredArray = stabilizedThis.filter((item) => {
      const lowerQuery = query.toLowerCase();
      const lowerNo = item[0].numero.toLowerCase();
      const lowerNom = `${item[0].client.nom} ${item[0].client.prenom}`.toLowerCase();
      return lowerNo.includes(lowerQuery) || lowerNom.includes(lowerQuery);
    });
    return filteredArray.map((el) => el[0]);
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [page, setPage] = useState(0);

  const [commande, setCommande] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [commandeBy, setCommandeBy] = useState('nom');

  const [filterName, setFilterName] = useState('');

  const [commandes, setCommandes] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCommandes()
      .then((res) => {
        setCommandes(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = commandeBy === property && commande === 'asc';
    setCommande(isAsc ? 'desc' : 'asc');
    setCommandeBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = commandes.map((n) => n.firstname);
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

  const handleDelete = (commandeID) => {
    deleteCommande(commandeID)
      .then(() => {
        setCommandes(commandes.filter((commande) => commande._id !== commandeID));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - commandes.length) : 0;

  const filteredAdmins = applySortFilter(commandes, getComparator(commande, commandeBy), filterName);

  const isNotFound = !filteredAdmins.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Orders Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          {/* <Link to="/dashboard/create-commande">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Create Commande 
            </Button>
          </Link> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer component={Paper}>
              <Table>
                <UserListHead
                  commande={commande}
                  commandeBy={commandeBy}
                  headLabel={TABLE_HEAD}
                  rowCount={commandes.length}
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
                      .map((commande) => {
                        const formattedDate = format(new Date(commande.created_at), 'dd/MM/yyyy HH:mm:ss');
                        const { _id, no, client, delivery, restaurant, state, totalprice, deliverydate , articles, menus } = commande;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        const generateReceiptData = {
                          // No: commande.no,
                          // ClientNom: commande.client ? commande.client.nom || 'N/A' : 'N/A',
                          // ClientPrenom: commande.client ? commande.client.prenom || 'N/A' : 'N/A',
                          // ClientEntreprise: commande.client ? commande.client.entreprise || 'N/A' : 'N/A',
                          // Versement: commande.versement,
                          // Prix: commande.prixtotal,
                          // Solde: commande.client ? commande.client.solde || 'N/A' : 'N/A',
                        };


                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>


                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>

                                {no}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{formattedDate}</TableCell>
                            <TableCell align="left">
                              {client && client.name ? `${client.name}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">
                              {delivery && delivery.name ? `${delivery.name}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">
                              {restaurant && restaurant.name ? `${restaurant.name}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">{state}</TableCell>
                            <TableCell align="left">{totalprice}DZD</TableCell>
                            <TableCell align="left">{deliverydate}</TableCell>
                            <TableCell align="right">
                              {/* {state === 'Delivered' ? (
                                <PDFDownloadLink
                                  document={<ReceiptPDF data={generateReceiptData} articles={articles} />}
                                  fileName={`payment_receipt_${no}.pdf`}
                                >
                                  {({ url, loading }) => (
                                    loading ? 'Téléchargement en cours...' : (
                                      <IconButton
                                        variant="contained"
                                        color="secondary"
                                        component="a"
                                        href={url}
                                        target="_blank"
                                        download={`payment_receipt_${no}.pdf`}
                                      >
                                        <Iconify icon="ant-design:download-outlined" width={20} height={20} />
                                      </IconButton>
                                    )
                                  )}
                                </PDFDownloadLink>
                              ) :
                                (null)} */}

                              <IconButton style={{ color: "red" }} onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Order?')) {
                                  handleDelete(commande._id);
                                }
                              }}>
                                <Iconify icon="ant-design:delete-filled" width={20} height={20} />
                              </IconButton>


                              <Link to="/dashboard/voir-commande" state={{
                                id: _id,
                                commande,
                                Client: client?.name || 'N/A',
                                Delivery: delivery?.name || 'N/A',
                                Restaurant: restaurant?.name || 'N/A',
                                State: state || 'N/A',
                                Totalprice: totalprice || 'N/A',
                                Articles: articles,
                                Menus: menus
                              }}>
                                <IconButton style={{ color: "purple" }}>
                                  <Iconify icon="iconoir:eye" width={20} height={20} />
                                </IconButton>
                              </Link>
                              <Link to="/dashboard/update-commande" state={{
                                id: _id,
                                commande,
                                Client: client?.name || 'N/A',
                                Delivery: delivery?.name || 'N/A',
                                Restaurant: restaurant?.name || 'N/A',
                                State: state || 'N/A',
                                Totalprice: totalprice || 'N/A',
                                Articles: articles,
                                Menus: menus
                              }}>
                                {state !== "Delivered" && (
                                  <IconButton style={{ color: "orange" }}>
                                    <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                                  </IconButton>
                                )}
                              </Link>

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
            count={commandes.length}
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
