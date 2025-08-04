import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import SavedContent from './src/components/SavedContent';

const ThemedStatusBar = () => {
  const { isDarkMode } = useAppTheme();
  return <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedStatusBar />
        <SavedContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}