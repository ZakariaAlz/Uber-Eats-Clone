import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { getClients } from '../api/client';
import { getArticles } from '../api/article';
import { getCmdArticles } from '../api/cmdarticle';
import { getVersements } from '../api/versement';
import { getDeliverybyemail, getDeliverybySqlid } from '../api/delivery';


import { AuthContext } from "../helpers/AuthContext";


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [, setLoading] = useState(true);
  const theme = useTheme();
  const { authState } = useContext(AuthContext);
  const userInfo = authState.userInfo;

  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.email) {
      getDeliverybyemail(userInfo.email)
        .then((res) => {
          const deliveryData = Array.isArray(res.data) ? res.data[0] : res.data;
          setDelivery(deliveryData);
          console.log(deliveryData)
          localStorage.setItem('delivery', JSON.stringify(deliveryData)); // Store delivery data in local storage
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching delivery data:", error.response ? error.response.data : error.message);
          setLoading(false);
        });
    } else {
      console.error("User info or user ID is not available.");
      setLoading(false);
    }
  }, []);





  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <div>
        <div>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Welcome, {delivery && delivery.name}!
          </Typography>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              Statistiques
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} >
                <AppWidgetSummary title="Clients" color="info" icon={'mdi:user-group-outline'} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Produits" color="info" icon={'mdi:cart'} />
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <AppWidgetSummary title="Doit Total" color="info" icon={'ant-design:android-filled'} />
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <AppWidgetSummary title="Versement Total" color="info" icon={'ant-design:android-filled'} />
              </Grid>

              <Grid item xs={12} >
                <h3>Commandes d'achat(s) d'article(s) :</h3>
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Nombre De Commandes" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Commandes Payées" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Total Revenu Commande D'Article" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Net Revenu Commande D'Article" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={12} >
                <h3>   Commandes de publicité :</h3>
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Nombre De Commandes" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Commandes Payées" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3} >
                <AppWidgetSummary title="Devis De Toutes Les Commandes De Pubilicités" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={3}>
                <AppWidgetSummary title="Net Revenu Commandes De Pubilicités" icon={'ant-design:windows-filled'} />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}
