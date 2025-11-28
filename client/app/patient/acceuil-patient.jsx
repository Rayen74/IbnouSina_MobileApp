// app/patient/acceuil-patient.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AcceuilPatient() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Mes Rendez-vous',
      icon: 'calendar-today',
      color: '#3b82f6',
      onPress: () => router.push('/patient/appointments'), // ← REAL NAVIGATION
    },
    {
      title: 'Consulter un Médecin',
      icon: 'video-call',
      color: '#10b981',
      onPress: () => console.log('Consulter'),
    },
    {
      title: 'Mes Ordonnances',
      icon: 'description',
      color: '#f59e0b',
      onPress: () => console.log('Ordonnances'),
    },
    {
      title: 'Mon Profil',
      icon: 'person',
      color: '#8b5cf6',
      onPress: () => router.push('/patient/patient-profile'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-8 bg-blue-600 rounded-b-3xl">
          <Text className="text-2xl font-bold text-white">Bonjour, Patient</Text>
          <Text className="mt-1 text-blue-100">Prenez soin de votre santé</Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-around px-4 mt-6">
          <View className="items-center">
            <Text className="text-3xl font-bold text-blue-600">3</Text>
            <Text className="text-sm text-gray-600">Rendez-vous</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-green-600">12</Text>
            <Text className="text-sm text-gray-600">Ordonnances</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-purple-600">98%</Text>
            <Text className="text-sm text-gray-600">Satisfaction</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View className="px-4 mt-8">
          <Text className="mb-4 text-lg font-semibold text-gray-800">
            Que souhaitez-vous faire ?
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                className="w-[48%] mb-4 bg-white rounded-xl p-5 shadow-sm active:opacity-80"
                onPress={item.onPress}
              >
                <View className="items-center">
                  <View
                    className="items-center justify-center mb-3 rounded-full w-14 h-14"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <MaterialIcons name={item.icon} size={28} color={item.color} />
                  </View>
                  <Text className="text-sm font-medium text-center text-gray-800">
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}