import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const CompanyCard = ({ company }) => (
  <View style={globalStyles.card}>
    <Text style={globalStyles.companyName}>{company.name}</Text>
    <Text>Address: {company.address}</Text>
    <Text>Year Founded: {company.year}</Text>
  </View>
);

export default CompanyCard;