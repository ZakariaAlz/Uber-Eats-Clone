// ReceiptPDF.js
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Component</Text>
      {data.map((item, index) => (
        <Text key={index} style={styles.text}>{`${item.name}: ${item.value}`}</Text>
      ))}
    </Page>
  </Document>
);

export default ReceiptPDF;
