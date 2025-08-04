import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress?: () => void;
};

const SaveActionButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>＋ Save It!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A259FF', // Matches SavedIt icon color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SaveActionButton;
