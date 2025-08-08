import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';
import SaveActionButton from './ui/SaveActionButton';
import OverflowMenuButton from './ui/OverflowMenuButton';

const Navbar = () => {
  const { theme } = useAppTheme(); // ✅ FIXED

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      <Text style={[styles.logo, { color: theme.text }]}>SavedIt</Text>
      <View style={styles.actions}>
        <SaveActionButton />
        <OverflowMenuButton />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});