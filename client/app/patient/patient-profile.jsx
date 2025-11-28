import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const defaultProfile = {
  fullName: 'Ahmed Ben Salah',
  email: 'ahmed@example.com',
  phone: '+216 22 345 678',
  dateOfBirth: '15 Mai 1990',
  gender: 'Homme',
  address: 'Rue de la Liberté, Tunis',
  profileImage: null,
};

const profileFields = [
  { key: 'fullName', label: 'Nom complet', icon: 'account' },
  { key: 'email', label: 'Email', icon: 'email' },
  { key: 'phone', label: 'Téléphone', icon: 'phone' },
  { key: 'dateOfBirth', label: 'Date de naissance', icon: 'cake' },
  { key: 'gender', label: 'Genre', icon: 'gender-male-female' },
  { key: 'address', label: 'Adresse', icon: 'map-marker' },
];

export default function PatientProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState(defaultProfile);

  const handleEditProfile = () => {
    router.push({
      pathname: '/patient/update-profile',
      params: { initialData: JSON.stringify(profile) }
    });
  };

  const handleEditField = (fieldKey) => {
    console.log('Editing field:', fieldKey);
  };

  const handleEditProfileImage = () => {
    console.log('Edit profile image');
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }} // Added paddingTop
      >
        {/* Enhanced Profile Section - FIXED TOP POSITIONING */}
        <Animatable.View 
          animation="zoomIn" 
          duration={600}
          delay={200}
          className="items-center px-6 pt-4" // Changed from -mt-16 to pt-4
        >
          <View className="relative mb-6">
            {/* Profile Image Container */}
            <Pressable
              onPress={handleEditProfileImage}
              className="relative items-center justify-center w-32 h-32 overflow-hidden border-4 border-white rounded-full shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600"
            >
              {profile.profileImage ? (
                <Image
                  source={{ uri: profile.profileImage }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <MaterialIcons name="account-circle" size={80} color="white" />
              )}
              
              {/* Edit Overlay */}
              <View className="absolute inset-0 items-center justify-center rounded-full opacity-0 bg-black/20 active:opacity-100">
                <MaterialIcons name="edit" size={24} color="white" />
              </View>
            </Pressable>
            
            {/* Verification Badge */}
            <View className="absolute items-center justify-center w-10 h-10 bg-emerald-500 border-[3px] border-white rounded-full shadow-lg -bottom-2 -right-2">
              <MaterialCommunityIcons name="check" size={18} color="white" />
            </View>
          </View>
          
          <Animatable.Text
            animation="fadeInUp"
            duration={500}
            delay={400}
            className="text-2xl font-bold text-center text-gray-900"
          >
            {profile.fullName}
          </Animatable.Text>
          
          <Animatable.View
            animation="fadeInUp"
            duration={500}
            delay={600}
            className="flex-row items-center px-4 py-2 mt-3 border rounded-full bg-emerald-50 border-emerald-200"
          >
            <View className="w-2 h-2 mr-2 rounded-full bg-emerald-500" />
            <Text className="text-sm font-semibold text-emerald-700">
              Patient vérifié
            </Text>
          </Animatable.View>
        </Animatable.View>

        {/* Enhanced Profile Information Cards */}
        <Animatable.View 
          animation="fadeInUp" 
          duration={600}
          delay={800} 
          className="px-6 mt-8"
        >
          <View className="mb-6">
            <Text className="mb-4 text-lg font-semibold text-gray-900">
              Informations personnelles
            </Text>
            
            <View className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
              {profileFields.map((field, index) => (
                <Animatable.View
                  key={field.key}
                  animation="fadeInUp"
                  duration={400}
                  delay={900 + index * 100}
                >
                  <Pressable 
                    onPress={() => handleEditField(field.key)}
                    className="flex-row items-center px-5 py-4 border-b border-gray-50 active:bg-gray-50"
                  >
                    <View className="items-center justify-center w-10 h-10 mr-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                      <MaterialIcons 
                        name={field.icon} 
                        size={20} 
                        color="#4f46e5" 
                      />
                    </View>
                    
                    <View className="flex-1">
                      <Text className="mb-1 text-sm font-medium text-gray-600">
                        {field.label}
                      </Text>
                      <Text className="text-base font-semibold text-gray-900">
                        {profile[field.key]}
                      </Text>
                    </View>
                    
                    <View className="p-2 bg-gray-100 rounded-full">
                      <MaterialIcons 
                        name="chevron-right" 
                        size={20} 
                        color="#6b7280" 
                      />
                    </View>
                  </Pressable>
                </Animatable.View>
              ))}
            </View>
          </View>
        </Animatable.View>

        {/* Enhanced Action Buttons */}
        <Animatable.View 
          animation="fadeInUp" 
          duration={500}
          delay={1600} 
          className="px-6 mt-6"
        >
          <View className="flex-row space-x-4">
            <Pressable
              onPress={handleEditProfile}
              className="flex-row items-center justify-center flex-1 px-6 py-4 bg-white border-2 border-gray-300 shadow-sm rounded-2xl active:scale-95 active:bg-gray-50"
            >
              <MaterialIcons name="edit" size={20} color="#6b7280" />
              <Text className="ml-2 text-base font-semibold text-gray-700">
                modifier le profil
              </Text>
            </Pressable>
          </View>
        </Animatable.View>

      </ScrollView>
    </SafeAreaView>
  );
}