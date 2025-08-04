import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/theme/colors';

interface ActionButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, children, style, isActive }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        isActive && { backgroundColor: Colors.primary },
        style
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActionButton;
