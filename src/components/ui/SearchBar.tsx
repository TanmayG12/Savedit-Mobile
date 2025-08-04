import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/theme/ThemeProvider';

const SearchBar = () => {
  const { theme, isDarkMode } = useAppTheme();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7',
      }
    ]}>
      <Ionicons
        name="search"
        size={20}
        color={isDarkMode ? '#aaa' : '#444'}
        style={styles.icon}
      />
      <TextInput
        placeholder="Search your saved content..."
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        style={[
          styles.input,
          { color: theme.text }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;