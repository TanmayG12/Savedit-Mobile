// App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeProvider';
import SavedContent from './src/components/SavedContent';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SavedContent />
        <StatusBar barStyle="light-content" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}