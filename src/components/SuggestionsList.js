import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const SuggestionsList = ({ suggestions, onSelect, visible }) => {
  if (!visible || !suggestions.length) return null;

  return (
    <View style={globalStyles.suggestionsContainer}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.suggestionItem}
            onPress={() => onSelect(item.name)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default SuggestionsList;