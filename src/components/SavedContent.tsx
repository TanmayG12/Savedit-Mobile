import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ScrollView, View } from 'react-native';
import Card from './ui/card'; // adjust if card.tsx is in a different location

const SavedContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Saved Content</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card
          item={{
            title: "Sunset in Santorini",
            username: "@wanderlust_diaries",
            description: "The perfect spot to watch the sunset in Oia. Get there early for the best view!",
            location: "Santorini, Greece",
            likes: 3421,
            comments: 156,
            source: "Instagram",
            tag: "Travel",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" // example image
          }}
        />
        <Card
          item={{
            title: "Cafe in Paris",
            username: "@paris_foodie",
            description: "Must-visit cafe with the best croissants in town!",
            location: "Paris, France",
            likes: 987,
            comments: 45,
            source: "Instagram",
            tag: "Food",
            imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" // example image
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
