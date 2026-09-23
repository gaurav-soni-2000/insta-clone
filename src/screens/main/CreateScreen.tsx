import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

export const CreateScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New post</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Feather name="camera-off" size={48} color={Colors.textSecondary} />
        </View>

        <Text style={styles.title}>Demo Mode</Text>
        <Text style={styles.subtitle}>
          Content creation & camera upload are disabled in this local offline prototype.
        </Text>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} style={{ marginRight: 10 }} />
          <Text style={styles.infoText}>
            You can add new posts or demo users anytime by adding entries to <Text style={styles.codeText}>posts.json</Text> and <Text style={styles.codeText}>users.json</Text>.
          </Text>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#D4D4D4',
    lineHeight: 18,
  },
  codeText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

