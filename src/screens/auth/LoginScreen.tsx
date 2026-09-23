import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { InstagramLogo } from '../../components/common/InstagramLogo';

export const LoginScreen: React.FC = () => {
  const { login, loginAsUser, users } = useInstagram();
  const [username, setUsername] = useState('_er_gourav');
  const [password, setPassword] = useState('demo123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = () => {
    setErrorMessage(null);
    if (!username.trim()) {
      setErrorMessage('Please enter a username.');
      return;
    }
    const result = login(username, password);
    if (!result.success) {
      setErrorMessage(result.message || 'Invalid username or password.');
    }
  };

  const handleQuickLogin = (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword('demo123');
    loginAsUser(demoUsername);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Language selector mock */}
        <Text style={styles.languageText}>English (US) ⌄</Text>

        {/* Instagram Brand Title */}
        <View style={styles.brandContainer}>
          <InstagramLogo width={180} height={52} />
        </View>

        {/* Inputs */}
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Username, email or mobile number"
              placeholderTextColor={Colors.textTertiary}
              value={username}
              onChangeText={text => {
                setUsername(text);
                setErrorMessage(null);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.textTertiary}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrorMessage(null);
              }}
              secureTextEntry
              style={styles.textInput}
            />
          </View>

          {/* Error Message */}
          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert('Demo Mode', 'Password recovery is not needed in local demo mode. Default password is demo123.')
            }
            style={styles.forgotBtn}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Log in with Facebook */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleQuickLogin('john')}
            style={styles.facebookBtn}
          >
            <FontAwesome name="facebook-square" size={20} color="#1877F2" style={{ marginRight: 8 }} />
            <Text style={styles.facebookText}>Log in with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Demo Accounts Switcher */}
        <View style={styles.demoSection}>
          <Text style={styles.demoHeader}>Quick Demo Login:</Text>
          <View style={styles.demoChipsRow}>
            {users.map(u => (
              <TouchableOpacity
                key={u.id}
                activeOpacity={0.7}
                onPress={() => handleQuickLogin(u.username)}
                style={styles.demoChip}
              >
                <Text style={styles.demoChipText}>@{u.username}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sign up footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert('Demo Mode', 'Registration is disabled. Choose from any of the configured demo accounts above.')
            }
          >
            <Text style={styles.signUpText}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  languageText: {
    color: Colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -1,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 12,
    justifyContent: 'center',
  },
  textInput: {
    color: Colors.text,
    fontSize: 14,
  },
  errorBox: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  errorText: {
    color: Colors.like,
    fontSize: 12.5,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 16,
    padding: 6,
  },
  forgotText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  facebookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  facebookText: {
    color: '#1877F2',
    fontSize: 14,
    fontWeight: '700',
  },
  demoSection: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#161616',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#262626',
  },
  demoHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  demoChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  demoChip: {
    backgroundColor: '#262626',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  demoChipText: {
    color: '#3797EF',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  signUpText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});

