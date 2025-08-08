import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
  label: string;
  backgroundColor?: string;
}

const Tag: React.FC<TagProps> = ({ label, backgroundColor = '#333' }) => {
  return (
    <View style={[styles.tag, { backgroundColor }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Tag;
