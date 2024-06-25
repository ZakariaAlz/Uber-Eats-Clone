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

const CodePdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {data.map((item, index) => (
        <Text key={index} style={styles.text}>{`${item.name}: ${item.code}`}</Text>
      ))}
    </Page>
  </Document>
);

export default CodePdf;
