import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const CompanyForm = ({ company, onChange, onSubmit, error, loading }) => (
  <View style={globalStyles.formContainer}>
    <Text style={globalStyles.subtitle}>Add New Company</Text>
    <TextInput
      style={globalStyles.input}
      placeholder="Company Name"
      placeholderTextColor={'gray'}
      value={company.name}
      onChangeText={(text) => onChange('name', text)}
    />
    <TextInput
      style={globalStyles.input}
      placeholder="Address"
      placeholderTextColor={'gray'}
      value={company.address}
      onChangeText={(text) => onChange('address', text)}
    />
    <TextInput
      style={globalStyles.input}
      placeholder="Year Founded"
      placeholderTextColor={'gray'}
      value={company.year}
      onChangeText={(text) => onChange('year', text)}
      keyboardType="numeric"
    />
    <TouchableOpacity
      style={globalStyles.addButton}
      onPress={onSubmit}
      disabled={loading}
    >
      <Text style={globalStyles.buttonText}>
        {loading ? 'Adding...' : 'Add Company'}
      </Text>
    </TouchableOpacity>
    {error && <Text style={globalStyles.error}>{error}</Text>}
  </View>
);

export default CompanyForm;