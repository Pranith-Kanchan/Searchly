import React from 'react';
import { View, TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const SearchBar = ({ value, onChangeText, onFocus, onBlur }) => (
  <View style={globalStyles.searchContainer}>
    <TextInput
      style={globalStyles.searchInput}
      placeholder="Search companies..."
      placeholderTextColor={'gray'}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </View>
);

export default SearchBar;