// app/create-user.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useRouter, Link } from 'expo-router';

export default function CreateUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address';
    if (form.password.length < 6) return 'Password must be at least 6 characters long';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) {
      setModalMessage(err);
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    // Mock registration (replace with API call)
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);

    // Success
    setModalMessage('Account created successfully! You can now log in.');
    setIsSuccess(true);
    setModalVisible(true);
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="items-center justify-center flex-1 p-4">
          <View className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <MaterialIcons
              name="person-add"
              size={48}
              color="#3b82f6"
              style={{ alignSelf: 'center', marginBottom: 10 }}
            />
            <Text className="mb-6 text-2xl font-bold text-center text-gray-800">
              Create Account
            </Text>

            {/* Name */}
            <View className="flex-row items-center w-full mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              <MaterialIcons name="person" size={24} color="#3b82f6" style={{ marginLeft: 12 }} />
              <TextInput
                className="flex-1 p-3 text-base"
                placeholder="Full Name"
                value={form.name}
                onChangeText={(v) => setForm({ ...form, name: v })}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Email */}
            <View className="flex-row items-center w-full mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              <MaterialIcons name="email" size={24} color="#3b82f6" style={{ marginLeft: 12 }} />
              <TextInput
                className="flex-1 p-3 text-base"
                placeholder="Email"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
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
                value={form.password}
                onChangeText={(v) => setForm({ ...form, password: v })}
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

            {/* Confirm Password */}
            <View className="flex-row items-center w-full mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <MaterialIcons name="lock" size={24} color="#3b82f6" style={{ marginLeft: 12 }} />
              <TextInput
                className="flex-1 p-3 text-base"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChangeText={(v) => setForm({ ...form, confirmPassword: v })}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable
                onPress={() => setShowConfirm(!showConfirm)}
                style={{ marginRight: 12 }}
              >
                <MaterialIcons
                  name={showConfirm ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="#3b82f6"
                />
              </Pressable>
            </View>

            {/* Create Account Button */}
            <View className="flex-row justify-center">
              <Pressable
                className={`w-1/2 p-3 rounded-lg shadow-md ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-base font-semibold text-center text-white">
                    Create Account
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Back to Login */}
            <Pressable onPress={() => router.push('/login')}>
              <Text className="mt-2 text-sm text-center text-blue-600">
                Already have an account? Log in
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
      </ScrollView>
    </SafeAreaView>
  );
}