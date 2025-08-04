import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TagProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Tag: React.FC<TagProps> = ({
  label,
  backgroundColor = '#4B5563', // Default: gray-700
  textColor = '#FFFFFF',        // Default: white
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.tag, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Tag;
