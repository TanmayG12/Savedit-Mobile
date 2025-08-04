import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/theme/ThemeProvider';
import ActionButton from './ActionButton';

interface IconBarProps {
  likes: number;
  comments: number;
  liked?: boolean;
  saved?: boolean;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onCalendarPress?: () => void;
  onLinkPress?: () => void;
  onSavePress?: () => void;
}

const IconBar: React.FC<IconBarProps> = ({
  likes,
  comments,
  liked,
  saved,
  onLikePress,
  onCommentPress,
  onCalendarPress,
  onLinkPress,
  onSavePress,
}) => {
  const { theme } = useAppTheme(); // ✅ CORRECT DESTRUCTURING
  const iconColor = theme.text;

  return (
    <View style={styles.container}>
      <ActionButton onPress={onLikePress}>
        <View style={styles.iconWrapper}>
          <FontAwesome name={liked ? 'heart' : 'heart-o'} size={18} color={iconColor} />
          <Text style={[styles.iconText, { color: iconColor }]}>{likes}</Text>
        </View>
      </ActionButton>
      <ActionButton onPress={onCommentPress}>
        <View style={styles.iconWrapper}>
          <Feather name="message-circle" size={18} color={iconColor} />
          <Text style={[styles.iconText, { color: iconColor }]}>{comments}</Text>
        </View>
      </ActionButton>
      <ActionButton onPress={onCalendarPress}>
        <View style={styles.iconWrapper}>
          <Feather name="calendar" size={18} color={iconColor} />
          <Text style={[styles.iconText, { color: iconColor }]}>{' '}</Text>
        </View>
      </ActionButton>
      <ActionButton onPress={onLinkPress}>
        <View style={styles.iconWrapper}>
          <Feather name="link" size={18} color={iconColor} />
          <Text style={[styles.iconText, { color: iconColor }]}>{' '}</Text>
        </View>
      </ActionButton>
      <ActionButton onPress={onSavePress}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name={saved ? 'bookmark' : 'inbox'} size={18} color={iconColor} />
          <Text style={[styles.iconText, { color: iconColor }]}>{' '}</Text>
        </View>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 4,
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default IconBar;