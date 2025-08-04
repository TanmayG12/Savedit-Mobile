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
import Typography from '@/theme/Typography';
import { Spacing } from '@/theme/spacing';
import ActionButton from './ActionButton';

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
      <View style={styles.contentContainer}>
        <Text style={Typography?.heading || { fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          {item.title}
        </Text>
        <Text style={Typography?.body || { fontSize: 14, color: '#555' }}>
          {item.description}
        </Text>
        <IconBar
          likes={item.liked ? 1 : 0}
          comments={4}
          onLikePress={onLike ?? (() => {})}
          onCommentPress={() => {}}
          onCalendarPress={() => {}}
          onLinkPress={() => {}}
          onSavePress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
  },
});
