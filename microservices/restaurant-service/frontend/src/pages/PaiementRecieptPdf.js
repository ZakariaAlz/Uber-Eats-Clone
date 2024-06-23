import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const ReceiptPDF = ({ data, articles }) => {
    // Get the current date and format it as "DD-MM-YYYY"
    const currentDate = new Date().toLocaleDateString('en-GB');

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.contentContainer}>
                    <View style={styles.leftContent}>
                        <Text style={styles.header}>Reçu de paiement</Text>
                        <View>
                            <Text style={styles.smallText}>Numéro de la commande : {data.No}</Text>
                            <Text style={styles.smallText}>Client : {data.ClientNom} {data.ClientPrenom}</Text>
                            <Text style={styles.smallText}>Entreprise : {data.ClientEntreprise}</Text>
                            <Text style={styles.smallText}>Date d'impression : {currentDate}</Text> {/* Current date */}
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <Text style={styles.tableHeader}>Articles</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Reference</Text>
                        <Text style={styles.tableCell}>Designation</Text>
                        <Text style={styles.tableCell}>Quantite (Unité)</Text>
                        <Text style={styles.tableCell}>Prix Unitaire (DA)</Text>
                        <Text style={styles.tableCell}>Prix Total(DA)</Text>
                    </View>
                    {articles.map((article, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{article.reference}</Text>
                            <Text style={styles.tableCell}>{article.designation}</Text>
                            <Text style={styles.tableCell}>{article.quantite}</Text>
                            <Text style={styles.tableCell}>{article.prixu}</Text>
                            <Text style={styles.tableCell}>{article.prixt}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.rightContent}>
                        <Text style={styles.smallText}>Versement: {data.Versement} DA</Text>
                        <Text style={styles.smallText}>Prix Total: {data.Prix} DA</Text>
                        <Text style={styles.smallText}>Solde: {data.Solde} DA</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

ReceiptPDF.propTypes = {
    data: PropTypes.shape({
        No: PropTypes.string,
        ClientNom: PropTypes.string,
        ClientPrenom: PropTypes.string,
        ClientEntreprise: PropTypes.string,
        Versement: PropTypes.string,
        Prix: PropTypes.string,
        Solde: PropTypes.string,
    }),
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            reference: PropTypes.string,
            designation: PropTypes.string,
            quantite: PropTypes.string,
            prixu: PropTypes.string,
            prixt: PropTypes.string,
        })
    ),
};

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContent: {
        width: '70%',
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
    },
    smallText: {
        fontSize: 10,
    },
    table: {
        marginTop: 10,
    },
    tableHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 5,
    },
    tableCell: {
        flex: 1,
        fontSize: 12,
    },
    rightContent: {
        marginTop: 10,
    },
});

export default ReceiptPDF;
