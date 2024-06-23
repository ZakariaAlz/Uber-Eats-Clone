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
import ReceiptPDF from './PaeimentRecieptPub'; // Import the ReceiptPDF component
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { getPubs, deletePub } from '../api/pub'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'titre', label: 'Service', alignRight: false },
  { id: 'tel', label: 'Télephone', alignRight: false },
  { id: 'dimension', label: 'Dimension', alignRight: false },
  { id: 'etat', label: 'Etat', alignRight: false },
  { id: 'devis', label: 'Devis', alignRight: false },
  { id: 'versement', label: 'Versement', alignRight: false },
  { id: 'paye', label: 'Payé', alignRight: false },
  { id: 'download', label: '', alignRight: true },
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
    const filteredArray = stabilizedThis.filter((item) => {
      const lowerQuery = query.toLowerCase();
      const lowerNom = `${item[0].client.nom} ${item[0].client.prenom}`.toLowerCase();
      return lowerNom.includes(lowerQuery);
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

  const [pubs, setPubs] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPubs()
      .then((res) => {
        setPubs(res.data)
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
      const newSelecteds = pubs.map((n) => n.firstname);
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

  const handleDelete = (pubID) => {
    deletePub(pubID)
      .then(() => {
        setPubs(pubs.filter((pub) => pub._id !== pubID));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pubs.length) : 0;

  const filteredAdmins = applySortFilter(pubs, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredAdmins.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Commande de Pub Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Commandes de Publicité
          </Typography>
          <Link to="/dashboard/create-pub">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Ajouter Commande Pub
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
                  rowCount={pubs.length}
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
                      .map((pub) => {
                        const formattedDate = format(new Date(pub.created_at), 'dd/MM/yyyy HH:mm:ss'); // Or use the format that matches your desired date format
                        const { _id, client, titre, description, dimension, etat, devis, paye, versement } = pub;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        const generateReceiptData = {
                          ClientNom: pub.client ? pub.client.nom || 'N/A' : 'N/A',
                          ClientPrenom: pub.client ? pub.client.prenom || 'N/A' : 'N/A',
                          ClientEntreprise: pub.client ? pub.client.entreprise || 'N/A' : 'N/A',
                          Hauteur: pub.dimension.hauteur,
                          Largeur: pub.dimension.largeur,
                          Description: description,
                          Versement: pub.versement,
                          Devis: pub.devis,
                          Solde: pub.client ? pub.client.solde || 'N/A' : 'N/A',
                          Titre: titre,
                        }

                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>


                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>

                                {client && client.nom ? `${client.nom} ${client.prenom}` : 'N/A'}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{formattedDate}</TableCell>
                            <TableCell align="left">{titre}</TableCell>
                            <TableCell align="left">
                              {client && client.tel ? `${client.tel}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">{dimension.hauteur} Cm X {dimension.largeur} Cm</TableCell>
                            <TableCell align="left">{etat}</TableCell>
                            <TableCell align="left">{devis} DA</TableCell>
                            <TableCell align="left">{versement} DA</TableCell>
                            <TableCell align="left">{paye}</TableCell>
                            <TableCell align="right">
                              {paye === 'Non Payé' ? (
                                null // Render nothing if "Payé" is "Non Payé"
                              ) : (
                                <PDFDownloadLink
                                  document={<ReceiptPDF data={generateReceiptData} entreprise={client?.entreprise} />}
                                  fileName={`payment_receipt_${client && client.nom ? `${client.nom}` : 'N/A'}.pdf`}
                                >
                                  {({ url, loading }) => (
                                    loading ? 'Téléchargement en cours...' : (
                                      <IconButton
                                        variant="contained"
                                        color="secondary"
                                        component="a"
                                        href={url}
                                        target="_blank"
                                        download={`payment_receipt_${client && client.nom ? `${client.nom}` : 'N/A'}.pdf`}
                                      >
                                        <Iconify icon="ant-design:download-outlined" width={20} height={20} />
                                      </IconButton>
                                    )
                                  )}
                                </PDFDownloadLink>
                              )}



                              <Link to="/dashboard/pay-pub" state={{
                                id: _id,
                                pub,
                                titre,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Etat: etat || 'N/A',
                                Devis: devis || 'N/A',
                                description,
                                Hauteur: dimension.hauteur || 'N/A',
                                Largeur: dimension.largeur || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                              }}>
                                {paye !== "Payé" && paye !== "Payé Partiellement" && (
                                  <IconButton style={{ color: "green" }}>
                                    <Iconify icon="uiw:pay" width={20} height={20} />
                                  </IconButton>
                                )}
                              </Link>

                              <IconButton style={{ color: "red" }} onClick={() => {
                                if (window.confirm('Are you sure you want to delete this admin?')) {
                                  handleDelete(pub._id);
                                }
                              }}>
                                <Iconify icon="ant-design:delete-filled" width={20} height={20} />
                              </IconButton>

                              <Link to="/dashboard/voir-pub" state={{
                                id: _id,
                                pub,
                                titre,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Etat: etat || 'N/A',
                                Devis: devis || 'N/A',
                                description,
                                Hauteur: dimension.hauteur || 'N/A',
                                Largeur: dimension.largeur || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                              }}>
                                <IconButton style={{ color: "purple" }}>
                                  <Iconify icon="iconoir:eye" width={20} height={20} />
                                </IconButton>
                              </Link>

                              <Link to="/dashboard/update-pub" state={{
                                id: _id,
                                pub,
                                titre,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Etat: etat || 'N/A',
                                Devis: devis || 'N/A',
                                description,
                                Hauteur: dimension.hauteur || 'N/A',
                                Largeur: dimension.largeur || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                              }}>
                                {paye !== "Payé" && paye !== "Payé Partiellement" && (
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
            count={pubs.length}
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
