import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { SavedItem } from '@/types/saved';
import { useAppTheme } from '@/theme/ThemeProvider';

interface Props {
  item: SavedItem;
}

const SavedCard: React.FC<Props> = ({ item }) => {
  const { theme } = useAppTheme();

  const handleOpen = () => Linking.openURL(item.url);
  const handleCopy = () => Clipboard.setStringAsync(item.url);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: theme.border }]} />
      )}
      <View style={styles.pills}>
        <Text style={[styles.pill, { backgroundColor: theme.primary, color: '#fff' }]}>
          {item.platform}
        </Text>
        <Text style={[styles.pill, { backgroundColor: theme.border, color: theme.text }]}>
          {item.domain}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.url, { color: theme.text }]} numberOfLines={1}>
          {item.url}
        </Text>
        {item.tags.length > 0 && (
          <Text style={[styles.tags, { color: theme.text }]} numberOfLines={1}>
            {item.tags.join(', ')}
          </Text>
        )}
        <View style={styles.actions}>
          <Pressable onPress={handleOpen}>
            <Text style={[styles.actionText, { color: theme.primary }]}>Open</Text>
          </Pressable>
          <Pressable onPress={handleCopy}>
            <Text style={[styles.actionText, { color: theme.primary }]}>Copy URL</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default SavedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  pills: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  url: {
    fontSize: 12,
    marginTop: 4,
  },
  tags: {
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
