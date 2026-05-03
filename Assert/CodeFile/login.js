import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';

// ✅ IMPORT API
import { loginTeacher, loginParent, loginStudent } from '../services/api';

const ROLES = [
  {
    id: 'teacher',
    label: 'Teacher',
    description: 'Manage classes\nand students',
    icon: '📘',
  },
  {
    id: 'parent',
    label: 'Parent',
    description: "Track child's\nperformance",
    icon: '👨‍👧',
  },
  {
    id: 'principal',
    label: 'Principal',
    description: 'School-wide\nadministration',
    icon: '🎓',
  },
];

export default function LoginScreen({ navigation }) {
  console.log("hello")
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // ✅ UPDATED LOGIN FUNCTION
  const handleLogin = async () => {
    if (!username.trim()) {
      alert('Please enter your username.');
      return;
    }

    if (!password.trim()) {
      alert('Please enter your password.');
      return;
    }

    try {
      const data = {
        emailOrName: username,
        password: password,
      };

      let response;

      if (selectedRole === 'teacher') {
        try {
          response = await loginTeacher(data);

          console.log("FULL RESPONSE:", JSON.stringify(response, null, 2));

          const teacherData = response?.data?.data || response?.data;

          console.log("TEACHER EXTRACTED:", teacherData);

          if (teacherData) {
            navigation.replace('teacherdashboard', {
              teacher: teacherData
            });
          } else {
            alert("Teacher data not found in response");
          }

        } catch (err) {
          console.log("Teacher login error:", err.response?.data || err.message);
        }
      }
      else if (selectedRole === 'parent') {
        try {
          const response = await loginParent(data);

          // ✅ handle both API formats
          const parentData = response?.data?.data || response?.data;

          if (response.status === 200 && parentData) {
            navigation.replace('parentdashboard', { parent: parentData });
          } else {
            alert('Invalid login');
          }

        } catch (error) {
          console.log(error?.response?.data || error.message);
          alert('Login failed');
        }
      }

      else if (selectedRole === 'principal') {
        alert('Principal login not implemented yet');
      }

    } catch (error) {
      console.log('Login Error:', error.response?.data || error.message);
      alert('Invalid username or password');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password flow coming soon!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F4FD" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoWrapper}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🏫</Text>
          </View>
        </View>

        <Text style={styles.title}>Welcome to Online School{'\n'}Diary</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <View style={styles.rolesContainer}>
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <TouchableOpacity
                key={role.id}
                style={[styles.roleCard, isSelected && styles.roleCardActive]}
                onPress={() => setSelectedRole(role.id)}
              >
                <View style={styles.roleIconBox}>
                  <Text style={styles.roleEmoji}>{role.icon}</Text>
                </View>

                <View style={styles.roleTextBox}>
                  <Text style={[styles.roleLabel, isSelected && styles.roleLabelActive]}>
                    {role.label}
                  </Text>
                  <Text style={styles.roleDesc}>{role.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Username */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Username</Text>
          <View style={[styles.inputRow, usernameFocused && styles.inputRowFocused]}>
            <TextInput
              style={styles.textInput}
              placeholder="Your username"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={[styles.inputRow, passwordFocused && styles.inputRowFocused]}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn} onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Theme ───────────────────────────────────
const BLUE = '#3B82C4';
const LIGHT_BG = '#E8F4FD';
const WHITE = '#FFFFFF';
const DARK_TEXT = '#1C2D3E';
const GREY_TEXT = '#7E9BB5';
const BORDER = '#D5E6F3';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 40,
  },

  // Logo
  logoWrapper: { marginBottom: 18 },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#2E6FAD',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#2E6FAD',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  logoEmoji: { fontSize: 30 },

  // Heading
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: DARK_TEXT,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: GREY_TEXT,
    textAlign: 'center',
    marginBottom: 22,
  },

  // Role Cards
  rolesContainer: {
    width: '100%',
    marginBottom: 22,
    gap: 10,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  roleCardActive: {
    borderColor: BLUE,
    backgroundColor: '#F0F8FF',
  },
  activeDot: {
    position: 'absolute',
    top: 14,
    left: 58,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53E3E',
  },
  roleIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EAF4FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleEmoji: { fontSize: 18 },
  roleTextBox: { flex: 1 },
  roleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK_TEXT,
    marginBottom: 2,
  },
  roleLabelActive: { color: BLUE },
  roleDesc: {
    fontSize: 11,
    color: GREY_TEXT,
    lineHeight: 15,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C0D6E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioOuterActive: { borderColor: BLUE },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BLUE,
  },

  // Inputs
  fieldGroup: {
    width: '100%',
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_TEXT,
    marginBottom: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BORDER,
    paddingHorizontal: 14,
    height: 50,
  },
  inputRowFocused: { borderColor: BLUE },
  fieldIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: DARK_TEXT,
    paddingVertical: 0,
  },
  eyeBtn: { padding: 2, marginLeft: 6 },
  eyeIcon: { fontSize: 16 },

  // Login Button
  loginBtn: {
    width: '100%',
    height: 52,
    backgroundColor: BLUE,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: BLUE,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: { elevation: 7 },
    }),
  },
  loginBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },

  // Forgot
  forgotBtn: { marginTop: 14 },
  forgotText: {
    fontSize: 13,
    color: BLUE,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});