import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const ReceiptPDF = ({ data }) => {
    // Get the current date and format it as "DD-MM-YYYY"
    const currentDate = new Date().toLocaleDateString('en-GB');

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.contentContainer}>
                    <View style={styles.leftContent}>
                        <Text style={styles.header}>Reçu de paiement de Publicité </Text>
                        <View>
                            <Text style={styles}>Information Commande:</Text>
                            <Text style={styles.smallText}>Client : {data.ClientNom} {data.ClientPrenom}</Text>
                            <Text style={styles.smallText}>Entreprise : {data.ClientEntreprise}</Text>
                            <Text style={styles.smallText}>Date d'impression : {currentDate}</Text> {/* Current date */}
                        </View>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.rightContent}>
                        <Text style={styles}>Titre :</Text>
                        <Text style={styles.smallText}>{data.Titre}</Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.rightContent}>
                        <Text style={styles}>Description :</Text>
                        <Text style={styles.smallText}>{data.Description}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.rightContent}>
                        <Text style={styles}>Dimensions :</Text>
                        <Text style={styles.smallText}>Hauteur : {data.Hauteur} Cm</Text>
                        <Text style={styles.smallText}>Largeur : {data.Largeur} Cm</Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.rightContent}>
                        <Text style={styles}>Information Paiement :</Text>
                        <Text style={styles.smallText}>Devis: {data.Devis} DA</Text>
                        <Text style={styles.smallText}>Versement: {data.Versement} DA</Text>
                        <Text style={styles.smallText}>Solde: {data.Solde} DA</Text>
                    </View>
                </View>
            </Page >
        </Document >
    );
};

ReceiptPDF.propTypes = {
    data: PropTypes.shape({
        No: PropTypes.string,
        ClientNom: PropTypes.string,
        ClientPrenom: PropTypes.string,
        ClientEntreprise: PropTypes.string,
        Description: PropTypes.string,
        Versement: PropTypes.string,
        Devis: PropTypes.string,
        Solde: PropTypes.string,
        Hauteur: PropTypes.string,
        Largeur: PropTypes.string,
        Titre: PropTypes.string,
    }),
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
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center', // Center the text horizontally
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