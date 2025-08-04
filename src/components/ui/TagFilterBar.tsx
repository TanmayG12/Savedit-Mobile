import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';

import Tag from './Tag';

interface Props {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const TagFilterBar: React.FC<Props> = ({ tags, selectedTag, onTagSelect }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {tags.map((tag) => (
        <TouchableOpacity
          key={tag}
          onPress={() => onTagSelect(tag)}
          style={[
            styles.tag,
            {
              backgroundColor:
                selectedTag === tag
                  ? isDark
                    ? '#6e6ef8'
                    : '#a77cf2'
                  : isDark
                  ? '#2c2c2e'
                  : '#e5e5ea',
            },
          ]}
        >
          <Text
            style={{
              color:
                selectedTag === tag
                  ? '#fff'
                  : isDark
                  ? '#aaa'
                  : '#333',
              fontWeight: selectedTag === tag ? 'bold' : 'normal',
            }}
          >
            {tag}
          </Text>
        </TouchableOpacity>
      ))}
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