import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './ui/card'; // adjust if card.tsx is in a different location
import SearchBar from './ui/SearchBar';
import TagFilterBar from './ui/TagFilterBar';
import SaveActionButton from './ui/SaveActionButton';
import OverflowMenuButton from './ui/OverflowMenuButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedContent = () => {
  const items = [
    {
      title: "Sunset in Santorini",
      username: "@wanderlust_diaries",
      description: "The perfect spot to watch the sunset in Oia. Get there early for the best view!",
      location: "Santorini, Greece",
      likes: 3421,
      comments: 156,
      source: "Instagram",
      tag: "Travel",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
      title: "Cafe in Paris",
      username: "@paris_foodie",
      description: "Must-visit cafe with the best croissants in town!",
      location: "Paris, France",
      likes: 987,
      comments: 45,
      source: "Instagram",
      tag: "Food",
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    }
  ];

  const [selectedTag, setSelectedTag] = useState('All');

  const tags = useMemo(() => ['All', ...Array.from(new Set(items.map(item => item.tag)))], [items]);

  const filteredItems = useMemo(() => {
    if (selectedTag === 'All') return items;
    return items.filter(item => item.tag === selectedTag);
  }, [items, selectedTag]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.branding}>
          <Ionicons name="bookmark" size={22} color="#a78bfa" />
          <Text style={styles.brandText}>SavedIt</Text>
        </View>
        <View style={styles.topActions}>
          <SaveActionButton />
          <OverflowMenuButton />
        </View>
      </View>
      <View style={styles.sectionSpacing}>
        <SearchBar />
      </View>
      <View style={styles.sectionSpacing}>
        <TagFilterBar
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredItems.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10, // Fixed padding so top bar sits at the very top
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 10,
    marginBottom: 0,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
  sectionSpacing: {
    marginVertical: 4,
  },
});
