// app/patient/appointments.jsx
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const today = new Date();
today.setHours(0, 0, 0, 0);

const mockAppointments = [
  // Upcoming
  { id: 1, doctor: 'Dr. Martin', specialty: 'Cardiologue', date: '2025-11-18', time: '10:30', status: 'upcoming' },
  { id: 2, doctor: 'Dr. Leila', specialty: 'Pédiatre', date: '2025-11-20', time: '14:00', status: 'upcoming' },
  // Past
  { id: 3, doctor: 'Dr. Sophie', specialty: 'Dermatologue', date: '2024-09-15', time: '14:00', status: 'past' },
  { id: 4, doctor: 'Dr. Ahmed', specialty: 'Généraliste', date: '2024-08-03', time: '09:15', status: 'past' },
  { id: 5, doctor: 'Dr. Karim', specialty: 'ORL', date: '2025-10-28', time: '11:00', status: 'past' },
];

const FILTERS = [
  { key: 'upcoming', label: 'À venir', icon: 'event-upcoming' },
  { key: 'all', label: 'Tous', icon: 'event-note' },
  { key: 'past', label: 'Passés', icon: 'event-available' },
];

export default function Appointments() {
  const [filter, setFilter] = useState('all');

  const filteredAppointments = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return mockAppointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      apptDate.setHours(0, 0, 0, 0);

      if (filter === 'upcoming') return apptDate >= now;
      if (filter === 'past') return apptDate < now;
      return true; // 'all'
    });
  }, [filter]);

  const hasAppointments = filteredAppointments.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Filter Tabs */}
      <View className="flex-row justify-around py-3 bg-white border-b border-gray-200">
        {FILTERS.map((f) => (
          <Pressable
            key={f.key}
            onPress={() => setFilter(f.key)}
            className={`flex-row items-center px-4 py-2 rounded-full ${
              filter === f.key ? 'bg-blue-600' : 'bg-gray-100'
            }`}
          >
            <MaterialIcons
              name={f.icon}
              size={20}
              color={filter === f.key ? 'white' : '#6b7280'}
            />
            <Text
              className={`ml-1 text-sm font-medium ${
                filter === f.key ? 'text-white' : 'text-gray-700'
              }`}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-6 text-2xl font-bold text-gray-800">
            Mes Rendez-vous
          </Text>

          {!hasAppointments ? (
            <Text className="mt-10 text-center text-gray-500">
              Aucun rendez-vous {filter === 'upcoming' ? 'à venir' : filter === 'past' ? 'passé' : ''}
            </Text>
          ) : (
            filteredAppointments.map((appt) => (
              <View
                key={appt.id}
                className="p-5 mb-4 bg-white shadow-sm rounded-xl"
              >
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={appt.status === 'upcoming' ? 'event-upcoming' : 'event-available'}
                    size={40}
                    color={appt.status === 'upcoming' ? '#3b82f6' : '#10b981'}
                  />
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-semibold text-gray-800">
                      {appt.doctor}
                    </Text>
                    <Text className="text-sm text-gray-600">{appt.specialty}</Text>
                    <Text className="mt-1 text-sm text-gray-500">
                      {appt.date.replace(/-/g, '/')} à {appt.time}
                    </Text>
                    {appt.status === 'upcoming' && (
                      <Text className="mt-1 text-xs font-medium text-blue-600">
                        À venir
                      </Text>
                    )}
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}