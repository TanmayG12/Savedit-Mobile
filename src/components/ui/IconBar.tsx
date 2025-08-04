import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import ActionButton from './ActionButton';

interface IconBarProps {
  likes: number;
  comments: number;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onCalendarPress?: () => void;
  onLinkPress?: () => void;
  onSavePress?: () => void;
}

const IconBar: React.FC<IconBarProps> = ({
  likes,
  comments,
  onLikePress,
  onCommentPress,
  onCalendarPress,
  onLinkPress,
  onSavePress,
}) => {
  return (
    <View style={styles.container}>
      <ActionButton icon={<FontAwesome name="heart-o" size={18} color={Colors.mutedForeground} />} onPress={onLikePress} />
      <ActionButton icon={<Feather name="message-circle" size={18} color={Colors.mutedForeground} />} onPress={onCommentPress} />
      <ActionButton icon={<Feather name="calendar" size={18} color={Colors.mutedForeground} />} onPress={onCalendarPress} />
      <ActionButton icon={<Feather name="link" size={18} color={Colors.mutedForeground} />} onPress={onLinkPress} />
      <ActionButton icon={<MaterialIcons name="inbox" size={18} color={Colors.mutedForeground} />} onPress={onSavePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
    marginBottom: 4,
    alignItems: 'center',
  },
});

export default IconBar;
