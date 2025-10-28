
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useRouter, Link } from 'expo-router';
import { z } from 'zod';

// Zod schema (same as backend)
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      // Validate with Zod
      forgotPasswordSchema.parse({ email });

      setIsLoading(true);

      // Mock API call (replace with real backend)
      await new Promise((r) => setTimeout(r, 1200));

      setIsLoading(false);
      setIsSuccess(true);
      setModalMessage('Password reset link sent! Check your email.');
      setModalVisible(true);
    } catch (error) {
      setIsLoading(false);

      if (error instanceof z.ZodError) {
        const msg = error.errors[0].message;
        setModalMessage(msg);
      } else {
        setModalMessage('Something went wrong. Try again.');
      }
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="justify-center flex-1 p-6">
            <View className="w-full max-w-md p-8 mx-auto bg-white shadow-lg rounded-xl">
              {/* Icon */}
              <Animatable.View animation="fadeInDown" className="items-center mb-6">
                <MaterialIcons name="lock-reset" size={64} color="#3b82f6" />
              </Animatable.View>

              {/* Title */}
              <Text className="mb-2 text-2xl font-bold text-center text-gray-800">
                Forgot Password?
              </Text>
              <Text className="mb-8 text-sm text-center text-gray-600">
                Enter your email and we'll send you a reset link.
              </Text>

              {/* Email Input */}
              <View className="mb-6">
                <View className="flex-row items-center px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <MaterialIcons name="email" size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="you@example.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={email}
                    onChangeText={setEmail}
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                className={`w-full p-4 rounded-lg shadow-md flex-row justify-center items-center ${
                  isLoading ? 'bg-blue-400' : 'bg-blue-600'
                }`}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <MaterialIcons name="send" size={20} color="white" />
                    <Text className="ml-2 text-base font-semibold text-white">
                      Send Reset Link
                    </Text>
                  </>
                )}
              </Pressable>

              {/* Back to Login */}
              <Pressable onPress={() => router.push('/login')} className="mt-6">
                <Text className="text-sm font-medium text-center text-blue-600">
                  Back to Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal */}
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="items-center justify-center flex-1 p-6 bg-black bg-opacity-50">
          <Animatable.View
            animation="zoomIn"
            duration={400}
            className="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl"
          >
            <View className="items-center mb-4">
              <MaterialIcons
                name={isSuccess ? 'check-circle' : 'error'}
                size={56}
                color={isSuccess ? '#22c55e' : '#ef4444'}
              />
            </View>
            <Text className="mb-4 text-lg font-semibold text-center text-gray-800">
              {modalMessage}
            </Text>
            <Pressable
              className="p-3 bg-blue-600 rounded-lg"
              onPress={() => {
                setModalVisible(false);
                if (isSuccess) {
                  router.push('/login');
                }
              }}
            >
              <Text className="font-semibold text-center text-white">OK</Text>
            </Pressable>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}