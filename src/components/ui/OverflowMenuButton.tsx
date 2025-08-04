import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const OverflowMenuButton = ({ onPress }: { onPress?: () => void }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <TouchableOpacity onPress={onPress}>
      <Entypo name="dots-three-vertical" size={18} color={iconColor} />
    </TouchableOpacity>
  );
};

export default OverflowMenuButton;