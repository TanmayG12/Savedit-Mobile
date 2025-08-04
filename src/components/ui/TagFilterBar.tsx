import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Tag from './Tag';
import { useAppTheme } from '@/theme/ThemeProvider';

interface Props {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const TagFilterBar: React.FC<Props> = ({ tags, selectedTag, onTagSelect }) => {
  const { theme, isDarkMode } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {tags.map((tag) => {
        const isSelected = selectedTag === tag;
        const backgroundColor = isSelected
          ? theme.primary
          : isDarkMode
            ? theme.card
            : '#e5e5ea';

        const textColor = isSelected
          ? '#fff'
          : isDarkMode
            ? '#aaa'
            : '#333';

        return (
          <TouchableOpacity
            key={tag}
            onPress={() => onTagSelect(tag)}
            style={[styles.tag, { backgroundColor }]}
          >
            <Text style={{ color: textColor, fontWeight: isSelected ? 'bold' : 'normal' }}>
              {tag}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
});

export default TagFilterBar;