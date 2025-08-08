import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppTheme } from '@/theme/ThemeProvider';

export type AddLinkData = {
  url: string;
  title?: string;
  tags: string[];
  notes?: string;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: AddLinkData) => void;
}

const AddLinkModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const { theme } = useAppTheme();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const data: AddLinkData = {
      url: trimmed,
      title: title.trim() || undefined,
      tags: tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      notes: notes.trim() || undefined,
    };
    onSave(data);
    setUrl('');
    setTitle('');
    setTags('');
    setNotes('');
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.card }]}>\n          <Text style={[styles.label, { color: theme.text }]}>URL</Text>\n          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />\n          <Text style={[styles.label, { color: theme.text }]}>Title</Text>\n          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Optional title"
            placeholderTextColor="#999"
          />\n          <Text style={[styles.label, { color: theme.text }]}>Tags (comma separated)</Text>\n          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            value={tags}
            onChangeText={setTags}
            placeholder="tags"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />\n          <Text style={[styles.label, { color: theme.text }]}>Notes</Text>\n          <TextInput
            style={[styles.input, styles.notes, { borderColor: theme.border, color: theme.text }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Optional notes"
            placeholderTextColor="#999"
            multiline
          />\n          <View style={styles.buttons}>\n            <TouchableOpacity style={[styles.button, { backgroundColor: theme.border }]} onPress={onClose}>\n              <Text style={{ color: theme.text }}>Cancel</Text>\n            </TouchableOpacity>\n            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>\n              <Text style={{ color: '#fff' }}>Save link</Text>\n            </TouchableOpacity>\n          </View>\n        </View>
      </View>
    </Modal>
  );
};

export default AddLinkModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  notes: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
