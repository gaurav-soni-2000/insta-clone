import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface ExploreSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export const ExploreSearchBar: React.FC<ExploreSearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search with Meta AI',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity activeOpacity={0.7} onPress={onClear} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: Colors.text,
    fontSize: 14,
  },
  clearBtn: {
    padding: 2,
  },
});

