import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  useColorScheme,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
};

const OverflowMenuButton = ({ onEdit, onDelete, onShare }: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const openMenu = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => setVisible(false));
  };

  const handleAction = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  return (
    <>
      <TouchableOpacity
        onPress={openMenu}
        style={[
          styles.iconButton,
          {
            backgroundColor: isDark ? '#2c2c2e' : '#e5e5e5',
            borderColor: isDark ? '#444' : '#ccc',
          },
        ]}
      >
        <Entypo name="dots-three-vertical" size={18} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={closeMenu}
      >
        <Pressable
          style={[
            styles.backdrop,
            {
              paddingTop: Platform.OS === 'ios' ? insets.top + 60 : 56,
              paddingRight: 16,
            },
          ]}
          onPress={closeMenu}
        >
          <Animated.View
            style={[
              styles.menuContainer,
              {
                backgroundColor: isDark ? '#2c2c2e' : '#fff',
                shadowColor: isDark ? '#000' : '#aaa',
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Pressable onPress={() => handleAction(onEdit)} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: isDark ? '#fff' : '#111' }]}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleAction(onShare)} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: isDark ? '#fff' : '#111' }]}>Share</Text>
            </Pressable>
            <Pressable onPress={() => handleAction(onDelete)} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: '#ff4d4f' }]}>Delete</Text>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    borderRadius: 10,
    paddingVertical: 8,
    width: 180,
    elevation: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
  },
});

export default OverflowMenuButton;