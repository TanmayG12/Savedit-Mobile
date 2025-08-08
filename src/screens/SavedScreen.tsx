import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '@/theme/ThemeProvider';
import AddLinkModal, { AddLinkData } from '@/components/AddLinkModal';
import { SavedItem } from '@/types/saved';
import { loadSaved, saveSaved } from '@/lib/storage';
import {
  detectPlatform,
  domainFrom,
  isImageUrl,
  youtubeThumb,
  fallbackFavicon,
} from '@/lib/preview';
import { fetchOg } from '@/lib/og';
import { supabase } from '@/lib/supabase';
import SavedCard from '@/components/ui/SavedCard';

const SavedScreen = () => {
  const { theme } = useAppTheme();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cloudEmpty, setCloudEmpty] = useState(false);

  useEffect(() => {
    loadSaved().then(setItems);
    if (supabase) {
      (async () => {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (!user) return;
        const { data } = await supabase.from('saved_items').select('*');
        if (data && data.length) {
          const mapped: SavedItem[] = data.map((d: any) => ({
            id: d.id,
            url: d.url,
            title: d.title || d.url,
            platform: d.platform,
            tags: d.tags || [],
            notes: d.notes || undefined,
            addedAt: new Date(d.added_at).getTime(),
            domain: d.domain || domainFrom(d.url),
            image: null,
          }));
          setItems(mapped);
          setCloudEmpty(false);
        } else {
          setCloudEmpty(true);
        }
      })();
    }
  }, []);

  useEffect(() => {
    saveSaved(items);
  }, [items]);

  const handleSave = async (data: AddLinkData) => {
    const platform = detectPlatform(data.url);
    const domain = domainFrom(data.url);
    let image: string | null = null;
    if (isImageUrl(data.url)) {
      image = data.url;
    } else if (platform === 'youtube') {
      image = youtubeThumb(data.url);
    } else {
      const key = `savedit:og:${encodeURIComponent(data.url)}`;
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        try {
          image = JSON.parse(cached).image || null;
        } catch {
          image = null;
        }
      }
      if (!image) {
        const og = await fetchOg(data.url);
        if (og) {
          image = og.image || null;
          await AsyncStorage.setItem(key, JSON.stringify(og));
        }
      }
      if (!image) {
        image = fallbackFavicon(domain);
      }
    }
    const newItem: SavedItem = {
      id: Date.now().toString(),
      url: data.url,
      title: data.title || data.url,
      platform,
      tags: data.tags,
      notes: data.notes,
      addedAt: Date.now(),
      domain,
      image,
    };
    setItems((prev) => [newItem, ...prev]);
    setModalVisible(false);
  };

  const uploadCloud = async () => {
    if (!supabase) return;
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;
    await supabase.from('saved_items').insert(
      items.map((i) => ({
        url: i.url,
        title: i.title,
        platform: i.platform,
        tags: i.tags,
        notes: i.notes,
        domain: i.domain,
        added_at: new Date(i.addedAt).toISOString(),
      })),
    );
    setCloudEmpty(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>\n      <Pressable
        style={[styles.hero, { backgroundColor: theme.card }]}
        onPress={() => setModalVisible(true)}\n      >\n        <Text style={[styles.heroText, { color: theme.primary }]}>+ Save a link</Text>\n      </Pressable>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SavedCard item={item} />}
        contentContainerStyle={{ paddingTop: 16 }}
      />
      {supabase && cloudEmpty && items.length > 0 && (
        <Pressable
          onPress={uploadCloud}
          style={[styles.upload, { backgroundColor: theme.card }]}
        >
          <Text style={{ color: theme.primary }}>Upload local → cloud</Text>
        </Pressable>
      )}
      <AddLinkModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  hero: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    fontSize: 18,
    fontWeight: '600',
  },
  upload: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
});
