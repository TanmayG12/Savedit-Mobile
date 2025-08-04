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
import { colors } from '@/theme/colors';

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

  return (
    <View style={styles.card}>
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
            <Tag label={item.platform === 'instagram' ? 'Instagram' : 'TikTok'} backgroundColor={item.platform === 'instagram' ? '#E1306C' : '#000'} />
            <Tag label="Travel" backgroundColor="#444" />
          </View>
          <View style={styles.bookmark}>
            <ActionButton icon="🔖" onPress={() => {}} />
          </View>
        </LinearGradient>
      </ImageBackground>
      <LinearGradient
        colors={(colors?.cardGradient) ?? ['#222', '#111']}
        style={styles.contentContainer}
      >
        <Text style={[typography.heading, { color: colors?.textPrimary ?? '#fff' }]}>
          {item.title}
        </Text>
        <Text style={[typography.caption ?? typography.body, { color: colors?.textSecondary ?? '#aaa', marginTop: 2 }]}>
          @wanderlust
        </Text>
        <Text
          style={[typography.body, { color: colors?.textSecondary ?? '#ccc', marginTop: 4 }]}
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
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
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
    backgroundColor: '#111',
  },
});
