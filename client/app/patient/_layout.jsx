// app/patient/_layout.jsx
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PatientLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#3b82f6' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        animation: 'slide_from_right',
      }}
    >
      {/* Home */}
      <Stack.Screen
        name="acceuil-patient"
        options={{
          title: 'Accueil Patient',
          headerShown: true,
          headerLeft: () => (
            <MaterialIcons name="menu" size={28} color="white" style={{ marginLeft: 16 }} />
          ),
          headerRight: () => (
            <MaterialIcons name="notifications" size={28} color="white" style={{ marginRight: 16 }} />
          ),
        }}
      />

      {/* Appointments */}
      <Stack.Screen
        name="appointments"
        options={{
          title: 'Mes Rendez-vous',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="ml-4">
              <MaterialIcons name="arrow-back" size={28} color="white" />
            </Pressable>
          ),
        }}
      />

      {/* Profile */}
      <Stack.Screen
        name="patient-profile"
        options={{
          title: 'Mon Profil',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="ml-4">
              <MaterialIcons name="arrow-back" size={28} color="white" />
            </Pressable>
          ),
        }}
      />

      
    </Stack>
  );
}