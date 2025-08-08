import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedItem } from '@/types/saved';

const KEY = 'savedit:saved';

export async function loadSaved(): Promise<SavedItem[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveSaved(items: SavedItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}
