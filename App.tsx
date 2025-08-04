import { SafeAreaView, StatusBar } from 'react-native';
import SavedContent from './src/components/SavedContent';
import Navbar from './src/components/Navbar';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Navbar />
      <SavedContent />
    </SafeAreaView>
  );
}
