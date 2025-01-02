/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CountriesScreen from './screens/CountriesScreen';
import CityEventsScreen from './screens/CityEventsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import ChatScreen from './screens/ChatScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import MyEventsScreen from './screens/MyEventsScreen';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  purple: '#8B7BF7',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
};

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Login: undefined;
  Register: undefined;
  CityEvents: {countryName: string};
  EventDetail: {eventId: string};
  ChatDetail: {chatId: string};
  UserProfile: {userId: string};
  Settings: undefined;
};

export type TabStackParamList = {
  Countries: undefined;
  MyEvents: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Countries"
        component={CountriesScreen}
        options={{
          tabBarLabel: 'Ülkeler',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker-radius" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyEvents"
        component={MyEventsScreen}
        options={{
          tabBarLabel: 'Etkinliklerim',
          tabBarIcon: ({color, size}) => (
            <Icon name="star" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Sohbet',
          tabBarIcon: ({color, size}) => (
            <Icon name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: COLORS.background},
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="CityEvents" component={CityEventsScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
