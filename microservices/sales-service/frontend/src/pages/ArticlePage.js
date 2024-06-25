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

import { getArticlebyRestaurant, deleteArticle } from '../api/article'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Descritpion', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
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

  const [articles, setArticles] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true)

  const restaurant = JSON.parse(localStorage.getItem('restaurant')); // Parse restaurant data


  useEffect(() => {
    getArticlebyRestaurant(restaurant._id)
      .then((res) => {
        setArticles(res.data)
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
      const newSelecteds = articles.map((n) => n.firstname);
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

  const handleDelete = (articleId) => {
    deleteArticle(articleId)
      .then(() => {
        setArticles(articles.filter((article) => article._id !== articleId));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articles.length) : 0;

  const filteredAdmins = applySortFilter(articles, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredAdmins.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Article Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Articles
          </Typography>
          <Link to="/dashboard/create-article">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Article
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
                  rowCount={articles.length}
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
                      .map((article) => {
                        const { _id, name, description, category, price } = article;
                        const isItemSelected = selected.indexOf(_id) !== -1;

                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>
                            

                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                
                                {name}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{description}</TableCell>
                            <TableCell align="left">{category}</TableCell>
                            <TableCell align="left">{price} DZD</TableCell>
                            <TableCell align="right">


                              <Link to="/dashboard/update-article" state={{
                                id: _id,
                                Name: name,
                                Description: description,
                                Category: category,
                                Price: price
                              }}>
                                <IconButton style={{ color: "green" }}>
                                  <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                                </IconButton>
                              </Link>

                              <IconButton style={{ color: "red" }} onClick={() => {
                                if (window.confirm('Sure you want to delete this Article ?')) {
                                  handleDelete(article._id);
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
            count={articles.length}
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
