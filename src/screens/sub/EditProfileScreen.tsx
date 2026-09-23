import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { Avatar } from '../../components/common/Avatar';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentUser, updateCurrentUser } = useInstagram();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [website, setWebsite] = useState(currentUser?.website || '');

  const handleSave = () => {
    updateCurrentUser({
      displayName,
      username,
      bio,
      website,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Avatar image={currentUser?.profileImage || 'gaurav.jpg'} size={80} />
          <TouchableOpacity activeOpacity={0.7} style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoText}>Edit picture or avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Name"
            placeholderTextColor={Colors.textTertiary}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={Colors.textTertiary}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            placeholderTextColor={Colors.textTertiary}
            style={[styles.textInput, styles.multilineInput]}
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Links</Text>
          <TextInput
            value={website}
            onChangeText={setWebsite}
            placeholder="Website or portfolio"
            placeholderTextColor={Colors.textTertiary}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerBtn: {
    padding: 4,
  },
  cancelText: {
    color: Colors.text,
    fontSize: 15,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  doneText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  changePhotoBtn: {
    marginTop: 10,
  },
  changePhotoText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    paddingVertical: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  textInput: {
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 4,
  },
  multilineInput: {
    minHeight: 50,
  },
});

