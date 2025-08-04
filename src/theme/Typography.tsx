import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from './colors';

export const useTypography = () => {
  const mode = useColorScheme() ?? 'light';
  const theme = Colors[mode];

  return StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.foreground,
    },
    subheading: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.foreground,
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.mutedForeground,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.primaryForeground,
    },
  });
};

export default useTypography;
