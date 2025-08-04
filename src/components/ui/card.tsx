import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Tag from './Tag';
import IconBar from './IconBar';
import { useTypography } from '@/theme/Typography';
import { Spacing } from '@/theme/spacing';
import ActionButton from './ActionButton';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@/theme/ThemeProvider';

type CardProps = {
  item: {
    id: string;
    title: string;
    imageUrl: string;
    liked: boolean;
    platform: 'instagram' | 'tiktok';
    description: string;
  };
  onLike: () => void;
};

export default function Card({ item, onLike }: CardProps) {
  const typography = useTypography();
  const [liked, setLiked] = React.useState(item.liked);
  const [saved, setSaved] = React.useState(false);
  const { theme } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <ImageBackground
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image' }}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent']}
          style={styles.gradientOverlay}
        >
          <View style={styles.tagContainer}>
            <Tag
              label={item.platform === 'instagram' ? 'Instagram' : 'TikTok'}
              backgroundColor={item.platform === 'instagram' ? '#E1306C' : '#000'}
            />
            <Tag label="Travel" backgroundColor={theme.border} />
          </View>
          <View style={styles.bookmark}>
            <ActionButton icon="🔖" onPress={() => {}} />
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={[styles.contentContainer, { backgroundColor: theme.card }]}>
        <Text style={[typography.heading, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[typography.caption ?? typography.body, { color: theme.text, marginTop: 2 }]}>
          @wanderlust
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Feather name="map-pin" size={14} color={theme.text} />
          <Text style={[typography.caption ?? typography.body, { color: theme.text, marginLeft: 4 }]}>
            Santorini, Greece
          </Text>
        </View>
        <Text
          style={[typography.body, { color: theme.text, marginTop: 4 }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <IconBar
          likes={liked ? 1 : 0}
          comments={4}
          liked={liked}
          saved={saved}
          onLikePress={() => {
            setLiked(!liked);
            onLike?.();
          }}
          onCommentPress={() => {}}
          onCalendarPress={() => {}}
          onLinkPress={() => {}}
          onSavePress={() => setSaved(!saved)}
          style={{ marginTop: 12 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    zIndex: 1,
  },
  tagContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  bookmark: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
