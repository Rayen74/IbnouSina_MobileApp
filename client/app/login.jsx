// app/login.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useRouter, Link } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePassword = (p) => p.length >= 6;

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setModalMessage('Please fill in both fields');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }
    if (!validateEmail(email)) {
      setModalMessage('Please enter a valid email address');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }
    if (!validatePassword(password)) {
      setModalMessage('Password must be at least 6 characters long');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    // Mock login (replace with API call)
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    // Success
    setModalMessage('Login successful!');
    setIsSuccess(true);
    setModalVisible(true);
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="items-center justify-center flex-1 p-4">
        <View className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <MaterialIcons
            name="local-hospital"
            size={48}
            color="#3b82f6"
            style={{ alignSelf: 'center', marginBottom: 10 }}
          />
          <Text className="mb-6 text-2xl font-bold text-center text-gray-800">
            Welcome
          </Text>

          {/* Email */}
          <View className="flex-row items-center w-full mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
            <MaterialIcons name="email" size={24} color="#3b82f6" style={{ marginLeft: 12 }} />
            <TextInput
              className="flex-1 p-3 text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <View className="flex-row items-center w-full mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
            <MaterialIcons name="lock" size={24} color="#3b82f6" style={{ marginLeft: 12 }} />
            <TextInput
              className="flex-1 p-3 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{ marginRight: 12 }}
            >
              <MaterialIcons
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={24}
                color="#3b82f6"
              />
            </Pressable>
          </View>

          {/* Login Button */}
          <View className="flex-row justify-center">
            <Pressable
              className={`w-1/2 p-3 rounded-lg shadow-md ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-semibold text-center text-white">
                  Login
                </Text>
              )}
            </Pressable>
          </View>

          {/* Links */}
          <Pressable onPress={() => router.push('/create-user')}>
            <Text className="mt-2 text-sm text-center text-blue-600">
              Create your account here
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text className="mt-2 text-sm text-center text-blue-600">
              Forgot Password 
            </Text>
          </Pressable>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="items-center justify-center flex-1 bg-black bg-opacity-50">
            <View className="w-4/5 max-w-sm p-6 bg-white rounded-lg shadow-lg">
              <Animatable.View animation="zoomIn" duration={500} className="items-center mb-4">
                <MaterialIcons
                  name={isSuccess ? 'check-circle' : 'cancel'}
                  size={48}
                  color={isSuccess ? '#22c55e' : '#ef4444'}
                />
              </Animatable.View>
              <Text className="mb-4 text-lg font-semibold text-center text-gray-800">
                {modalMessage}
              </Text>
              <Pressable
                className="p-3 bg-blue-600 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="font-semibold text-center text-white">OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}