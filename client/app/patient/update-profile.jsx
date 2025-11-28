import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const defaultProfile = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
};

export default function UpdateProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialData = React.useMemo(() => {
    try {
      return params.initialData
        ? JSON.parse(params.initialData)
        : defaultProfile;
    } catch {
      return defaultProfile;
    }
  }, [params.initialData]);

  const [isSaving, setIsSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [successAnimation, setSuccessAnimation] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: initialData });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleSave = async (data) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessAnimation(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sauvegarder le profil.', [{ text: 'OK' }]);
    } finally {
      setIsSaving(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    
    if (currentDate) {
      const formatted = currentDate.toLocaleDateString('fr-TN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setValue('dateOfBirth', formatted);
    }
  };

  // Success Screen
  if (successAnimation) {
    return (
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={['#10b981', '#059669', '#047857']}
          className="flex-1"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1"
          >
            <View className="items-center justify-center flex-1 px-6">
              <Animatable.View animation="bounceIn" duration={1000} className="items-center mb-8">
                <View className="items-center justify-center w-24 h-24 border-2 rounded-full bg-white/20 border-white/30">
                  <MaterialIcons name="check" size={56} color="white" />
                </View>
              </Animatable.View>

              <Animatable.Text
                animation="fadeInUp"
                delay={300}
                className="mb-4 text-4xl font-bold text-center text-white"
              >
                Succès !
              </Animatable.Text>

              <Animatable.Text
                animation="fadeInUp"
                delay={500}
                className="px-8 text-lg text-center text-white/90"
              >
                Votre profil a été mis à jour avec succès
              </Animatable.Text>

              <Animatable.View
                animation="fadeInUp"
                delay={700}
                className="w-48 h-2 mt-8 overflow-hidden rounded-full bg-white/30"
              >
                <View className="w-full h-full bg-white rounded-full" />
              </Animatable.View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#f8fafc', '#f1f5f9', '#e2e8f0']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Clean Header */}
          <View className="px-6 py-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => router.back()}
                className="p-3 border bg-blue-500/10 rounded-xl border-blue-200/50"
              >
                <MaterialIcons name="arrow-back" size={24} color="#2563eb" />
              </Pressable>
              
              <View className="items-center flex-1 px-4">
                <Text className="text-xl font-bold text-gray-800">
                  Modifier le profil
                </Text>
                <Text className="mt-1 text-sm text-gray-500">
                  Mettez à jour vos informations
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
          >
            {/* Form Fields */}
            <Animatable.View animation="fadeInUp" duration={600}>
              
              {/* Full Name */}
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 bg-blue-500 rounded-full" />
                  <Text className="text-sm font-semibold text-gray-700">Nom complet</Text>
                </View>
                <Controller
                  control={control}
                  name="fullName"
                  rules={{ required: 'Le nom complet est requis' }}
                  render={({ field }) => (
                    <View className="relative">
                      <View className={`
                        p-4 rounded-2xl border-2 bg-white shadow-sm
                        ${errors.fullName 
                          ? 'border-red-200 bg-red-50/50' 
                          : 'border-gray-200'
                        }
                      `}>
                        <MaterialIcons
                          name="person-outline"
                          size={20}
                          color={errors.fullName ? '#ef4444' : '#3b82f6'}
                          style={{ position: 'absolute', left: 16, top: 16, zIndex: 1 }}
                        />
                        <TextInput
                          className="py-3 pl-12 pr-4 text-base text-gray-800"
                          placeholder="Entrez votre nom complet"
                          placeholderTextColor="#9ca3af"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          editable={!isSaving}
                        />
                      </View>
                    </View>
                  )}
                />
                {errors.fullName && (
                  <View className="p-3 mt-3 border border-red-200 bg-red-50 rounded-xl">
                    <Text className="text-sm font-medium text-red-600">
                      {errors.fullName.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Email */}
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 bg-green-500 rounded-full" />
                  <Text className="text-sm font-semibold text-gray-700">Email</Text>
                </View>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Format d\'email invalide'
                    },
                  }}
                  render={({ field }) => (
                    <View className="relative">
                      <View className={`
                        p-4 rounded-2xl border-2 bg-white shadow-sm
                        ${errors.email 
                          ? 'border-red-200 bg-red-50/50' 
                          : 'border-gray-200'
                        }
                      `}>
                        <MaterialIcons
                          name="email-outline"
                          size={20}
                          color={errors.email ? '#ef4444' : '#16a34a'}
                          style={{ position: 'absolute', left: 16, top: 16, zIndex: 1 }}
                        />
                        <TextInput
                          className="py-3 pl-12 pr-4 text-base text-gray-800"
                          placeholder="votre@email.com"
                          placeholderTextColor="#9ca3af"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          editable={!isSaving}
                        />
                      </View>
                    </View>
                  )}
                />
                {errors.email && (
                  <View className="p-3 mt-3 border border-red-200 bg-red-50 rounded-xl">
                    <Text className="text-sm font-medium text-red-600">
                      {errors.email.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Phone */}
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 rounded-full bg-amber-500" />
                  <Text className="text-sm font-semibold text-gray-700">Téléphone</Text>
                </View>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: 'Le numéro de téléphone est requis',
                    pattern: {
                      value: /^\+?[0-9\s\-\(\)]{8,15}$/,
                      message: 'Numéro de téléphone invalide'
                    },
                  }}
                  render={({ field }) => (
                    <View className="relative">
                      <View className={`
                        p-4 rounded-2xl border-2 bg-white shadow-sm
                        ${errors.phone 
                          ? 'border-red-200 bg-red-50/50' 
                          : 'border-gray-200'
                        }
                      `}>
                        <MaterialIcons
                          name="phone"
                          size={20}
                          color={errors.phone ? '#ef4444' : '#d97706'}
                          style={{ position: 'absolute', left: 16, top: 16, zIndex: 1 }}
                        />
                        <TextInput
                          className="py-3 pl-12 pr-4 text-base text-gray-800"
                          placeholder="+216 00 000 000"
                          placeholderTextColor="#9ca3af"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          keyboardType="phone-pad"
                          editable={!isSaving}
                        />
                      </View>
                    </View>
                  )}
                />
                {errors.phone && (
                  <View className="p-3 mt-3 border border-red-200 bg-red-50 rounded-xl">
                    <Text className="text-sm font-medium text-red-600">
                      {errors.phone.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Date of Birth - MINIMAL SELECTOR ONLY */}
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 bg-indigo-500 rounded-full" />
                  <Text className="text-sm font-semibold text-gray-700">Date de naissance</Text>
                </View>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{ required: 'La date de naissance est requise' }}
                  render={({ field }) => (
                    <Pressable
                      onPress={() => setShowDatePicker(true)}
                      disabled={isSaving}
                      className={`
                        p-4 rounded-2xl border-2 bg-white shadow-sm flex-row items-center justify-between
                        ${errors.dateOfBirth 
                          ? 'border-red-200 bg-red-50/50' 
                          : 'border-gray-200'
                        }
                      `}
                    >
                      <View className="flex-row items-center">
                        <MaterialIcons name="event" size={20} color="#6b7280" className="mr-3" />
                        <Text className={`${field.value ? 'text-gray-800 font-medium' : 'text-gray-500'} text-base`}>
                          {field.value || 'Sélectionnez votre date de naissance'}
                        </Text>
                      </View>
                      <MaterialIcons name="arrow-drop-down" size={24} color="#d1d5db" />
                    </Pressable>
                  )}
                />
                {errors.dateOfBirth && (
                  <View className="p-3 mt-3 border border-red-200 bg-red-50 rounded-xl">
                    <Text className="text-sm font-medium text-red-600">
                      {errors.dateOfBirth.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Gender - CLEAN SIMPLE DESIGN */}
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 bg-pink-500 rounded-full" />
                  <Text className="text-sm font-semibold text-gray-700">Genre</Text>
                </View>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <View className="flex-row space-x-4">
                      {['Homme', 'Femme'].map((option) => (
                        <Pressable
                          key={option}
                          onPress={() => field.onChange(option)}
                          disabled={isSaving}
                          className={`
                            flex-1 p-4 rounded-xl border-2 items-center justify-center shadow-sm
                            ${field.value === option
                              ? 'bg-blue-500 border-blue-500 shadow-lg'
                              : 'bg-white border-gray-200'
                            }
                          `}
                        >
                          <Text
                            className={`
                              font-semibold text-base
                              ${field.value === option ? 'text-white' : 'text-gray-700'}
                            `}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                />
              </View>

              {/* Address */}
              <View className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-2 h-2 mr-3 rounded-full bg-cyan-500" />
                  <Text className="text-sm font-semibold text-gray-700">Adresse</Text>
                </View>
                <Controller
                  control={control}
                  name="address"
                  rules={{ required: 'L\'adresse est requise' }}
                  render={({ field }) => (
                    <View className="relative">
                      <View className={`
                        p-4 rounded-2xl border-2 bg-white shadow-sm
                        ${errors.address 
                          ? 'border-red-200 bg-red-50/50' 
                          : 'border-gray-200'
                        }
                      `}>
                        <MaterialIcons
                          name="location-on"
                          size={20}
                          color={errors.address ? '#ef4444' : '#0891b2'}
                          style={{ position: 'absolute', right: 16, top: 16, zIndex: 1 }}
                        />
                        <TextInput
                          className="py-3 pr-12 text-base text-gray-800"
                          placeholder="Rue, Ville, Code postal"
                          placeholderTextColor="#9ca3af"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          multiline
                          numberOfLines={3}
                          textAlignVertical="top"
                          editable={!isSaving}
                        />
                      </View>
                    </View>
                  )}
                />
                {errors.address && (
                  <View className="p-3 mt-3 border border-red-200 bg-red-50 rounded-xl">
                    <Text className="text-sm font-medium text-red-600">
                      {errors.address.message}
                    </Text>
                  </View>
                )}
              </View>
            </Animatable.View>
          </ScrollView>

          {/* Clean Save Button */}
          <Animatable.View animation="fadeInUp" delay={200} className="px-6 pb-8">
            <Pressable
              onPress={handleSubmit(handleSave)}
              disabled={isSaving}
              className="flex-row items-center justify-center px-6 py-4 bg-blue-600 shadow-lg rounded-2xl active:scale-95 active:opacity-90"
            >
              {isSaving ? (
                <ActivityIndicator color="white" size="small" className="mr-3" />
              ) : (
                <MaterialIcons name="save" size={20} color="white" />
              )}
              <Text className="ml-3 text-base font-bold text-white">
                {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </Text>
            </Pressable>
          </Animatable.View>
        </KeyboardAvoidingView>
      </LinearGradient>

      {/* ✅ MINIMAL DATE PICKER - ONLY SELECTOR */}
      {showDatePicker && (
        <View className="absolute bottom-0 left-0 right-0 z-50">
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
            locale="fr"
          />
        </View>
      )}
    </SafeAreaView>
  );
}