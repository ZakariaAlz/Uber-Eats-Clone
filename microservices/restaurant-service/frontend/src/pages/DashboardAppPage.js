import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { getClients } from '../api/client';
import { getArticles } from '../api/article';
import { getCmdArticles } from '../api/cmdarticle';
import { getPubs } from '../api/pub';
import { getVersements } from '../api/versement';
import PasswordProtection from './passwordprotection';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [, setLoading] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [articles, setArticles] = useState()
  const [clients, setClients] = useState()
  const [cmdarticles, setCmdArticles] = useState()
  const [pubs, setPubs] = useState()
  const [versements, setVersements] = useState()


  const handlePasswordCorrect = () => {
    setIsPasswordCorrect(true);
  };

  useEffect(() => {

    getArticles().then((res) => {
      setArticles(res.data)
      setLoading(false)
    })
    getClients().then((res) => {
      setClients(res.data)
      setLoading(false)
    })
    getCmdArticles().then((res) => {
      setCmdArticles(res.data)
      setLoading(false)
    })
    getPubs().then((res) => {
      setPubs(res.data)
      setLoading(false)
    })
    getVersements().then((res) => {
      setVersements(res.data)
      setLoading(false)
    })
  }, [])

  const clientscount = clients ? clients.length : 0;
  const articlescount = articles ? articles.length : 0;
  const cmdarticlecount = cmdarticles ? cmdarticles.length : 0;
  const pubcount = pubs ? pubs.length : 0;



  const doittotale = () => {
    let totalCredits = 0;
    clients.forEach(client => {
      totalCredits += client.solde;
    });
    return totalCredits;
  };

  const netrevenutotale = () => {
    let revenu = 0;
    cmdarticles.forEach(cmdarticle => {
      if (cmdarticle.paye === "Payé Partiellement" || cmdarticle.paye === "Payé") {
        cmdarticle.articles.forEach(article => {
          revenu += article.prixd;
        });
      }
    });
    return revenu;
  };

  const articlepaye = () => {
    let revenu = 0;
    cmdarticles.forEach(cmdarticle => {
      if (cmdarticle.paye === "Payé Partiellement" || cmdarticle.paye === "Payé") {
        revenu += 1;
      }
    });
    return revenu;
  };

  const revenutotale = () => {
    let revenu = 0;
    cmdarticles.forEach(cmdarticle => {
      if (cmdarticle.paye === "Payé Partiellement" || cmdarticle.paye === "Payé") {
        revenu += cmdarticle.prixtotal;
      }
    });
    return revenu;
  };

  const revenutotalepub = () => {
    let revenu = 0;
    pubs.forEach(pub => {
      if (pub.paye === "Payé Partiellement" || pub.paye === "Payé") {
        revenu += pub.devis;
      }
    });
    return revenu;
  };

  const nombrepubpaye = () => {
    let revenu = 0;
    pubs.forEach(pub => {
      if (pub.paye === "Payé Partiellement" || pub.paye === "Payé") {
        revenu += 1;
      }
    });
    return revenu;
  };

  const revenunetpub = () => {
    let revenu = 0;
    pubs.forEach(pub => {
      if (pub.paye === "Payé Partiellement" || pub.paye === "Payé") {
        revenu += pub.versement;
      }
    });
    return revenu;
  };

  const versementtotal = () => {
    let revenu = 0;
    versements.forEach(versement => {
      revenu += versement.montant;
    });
    return revenu;
  };



  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <div>
        {isPasswordCorrect ? (
          <div>
            <Container maxWidth="xl">
              <Typography variant="h4" sx={{ mb: 5 }}>
                Statistiques
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} >
                  <AppWidgetSummary title="Clients" total={clientscount} color="info" icon={'mdi:user-group-outline'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary title="Produits" total={articlescount} color="info" icon={'mdi:cart'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                  <AppWidgetSummary title="Doit Total" total={doittotale()} color="info" icon={'ant-design:android-filled'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                  <AppWidgetSummary title="Versement Total" total={versementtotal()} color="info" icon={'ant-design:android-filled'} />
                </Grid>

                <Grid item xs={12} >
                <h3>Commandes d'achat(s) d'article(s) :</h3>
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Nombre De Commandes" total={cmdarticlecount} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Commandes Payées" total={articlepaye()} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Total Revenu Commande D'Article" total={revenutotale()} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Net Revenu Commande D'Article" total={netrevenutotale()} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={12} >
                <h3>   Commandes de publicité :</h3>
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Nombre De Commandes" total={pubcount} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Commandes Payées" total={nombrepubpaye()} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3} >
                  <AppWidgetSummary title="Devis De Toutes Les Commandes De Pubilicités" total={revenutotalepub()} icon={'ant-design:windows-filled'} />
                </Grid>

                <Grid item xs={3}>
                  <AppWidgetSummary title="Net Revenu Commandes De Pubilicités" total={revenunetpub()} icon={'ant-design:windows-filled'} />
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : (
          <PasswordProtection correctPassword="applicationweb" onPasswordCorrect={handlePasswordCorrect}>
            {/* Optional: You can pass any additional content here */}
          </PasswordProtection>
        )}
      </div>
    </>
  );
}
