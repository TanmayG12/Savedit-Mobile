import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from './ui/card';
import SearchBar from './ui/SearchBar';
import TagFilterBar from './ui/TagFilterBar';
import SaveActionButton from './ui/SaveActionButton';
import OverflowMenuButton from './ui/OverflowMenuButton';
import ManualLinkModal from './ui/ManualLinkModal';

import { useAppTheme } from '../theme/ThemeProvider';

const SavedContent = () => {
  const { theme } = useAppTheme();

  type Item = {
    id: string;
    title: string;
    imageUrl: string;
    liked: boolean;
    platform: 'instagram' | 'tiktok';
    description: string;
    tag: string;
  };

  const initialItems: Item[] = [
    {
      id: '1',
      title: 'Sunset in Santorini',
      description:
        'The perfect spot to watch the sunset in Oia. Get there early for the best view!',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      liked: false,
      platform: 'instagram',
      tag: 'Travel',
    },
    {
      id: '2',
      title: 'Cafe in Paris',
      description: 'Must-visit cafe with the best croissants in town!',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      liked: false,
      platform: 'instagram',
      tag: 'Food',
    },
  ];

  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedTag, setSelectedTag] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const tags = useMemo(
    () => ['All', ...Array.from(new Set(items.map((item) => item.tag)))],
    [items]
  );

  const filteredItems = useMemo(() => {
    if (selectedTag === 'All') return items;
    return items.filter((item) => item.tag === selectedTag);
  }, [items, selectedTag]);

  const handleSaveLink = (title: string, url: string) => {
    const platform = url.includes('tiktok') ? 'tiktok' : 'instagram';
    const newItem: Item = {
      id: Date.now().toString(),
      title,
      description: url,
      imageUrl: 'https://via.placeholder.com/300x200.png?text=No+Image',
      liked: false,
      platform,
      tag: 'Misc',
    };
    setItems((prev) => [newItem, ...prev]);
    setSelectedTag('All');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#000000' ? 'light-content' : 'dark-content'} />

      <View style={styles.topBar}>
        <View style={styles.branding}>
          <Ionicons name="bookmark" size={22} color={theme.primary} />
          <Text style={[styles.brandText, { color: theme.text }]}>SavedIt</Text>
        </View>
        <View style={styles.topActions}>
          <SaveActionButton onPress={() => setModalVisible(true)} />
          <OverflowMenuButton />
        </View>
      </View>

      <View style={styles.searchSpacing}>
        <SearchBar />
      </View>

      <View style={styles.tagSpacing}>
        <TagFilterBar tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: theme.background },
        ]}
      >
        {filteredItems.map((item) => (
          <Card key={item.id} item={item} onLike={() => {}} />
        ))}
      </ScrollView>
      <ManualLinkModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveLink}
      />
    </SafeAreaView>
  );
};

export default SavedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 0,
    flexGrow: 1,
  },
  searchSpacing: {
    marginTop: 4,
    marginBottom: 6, // less space between Search and Filter
  },
  tagSpacing: {
    marginBottom: 16, // more space before Cards
  },
});