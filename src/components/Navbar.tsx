

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SavedIt</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
});