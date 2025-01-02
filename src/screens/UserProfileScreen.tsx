import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  green: '#7BC67E',
  pink: '#F5A3B5',
  purple: '#8B7BF7',
  yellow: '#F5C26B',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
};

const mockUser = {
  username: '@ahmetyilmaz',
  name: 'Ahmet Yılmaz',
  location: 'Berlin, Almanya',
  joinDate: 'Ocak 2024',
  eventsCreated: 5,
  eventsAttended: 12,
  bio: 'Yeni kültürler keşfetmeyi ve insanlarla tanışmayı seven biriyim. Özellikle film festivalleri ve kültürel etkinliklere katılmayı çok seviyorum.',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const mockEvents = [
  {
    id: '1',
    title: 'Berlin Film Festivali Buluşması',
    date: '15 Şubat 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/200/100',
  },
  {
    id: '2',
    title: 'Türk Mutfağı Workshop',
    date: '1 Şubat 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/200/100',
  },
  {
    id: '3',
    title: 'Müze Gezisi',
    date: '20 Ocak 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/200/100',
  },
];

const getUserTitle = (created: number, attended: number) => {
  const total = created + attended;
  if (total === 0) return {text: '⭐ Yeni Üye', color: COLORS.green};
  if (total === 1) return {text: '🎯 Etkinlik Meraklısı', color: COLORS.pink};
  if (total <= 5) return {text: '🦋 Sosyal Kelebek', color: COLORS.yellow};
  if (total <= 10) return {text: '🎭 Etkinlik Gurusu', color: COLORS.purple};
  return {text: '👑 Etkinlik Ustası', color: COLORS.purple};
};

const StatBox = ({value, label}: {value: number; label: string}) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const EventCard = ({event}: {event: typeof mockEvents[0]}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', {eventId: event.id})}
      activeOpacity={0.7}
    >
      <Image source={{uri: event.image}} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <Icon name="calendar" size={14} color={COLORS.textSecondary} />
            <Text style={styles.eventDetailText}>{event.date}</Text>
          </View>
          <View style={styles.eventDetailItem}>
            <Icon name="map-marker" size={14} color={COLORS.textSecondary} />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TAB_BAR_HEIGHT = 80;

export default function UserProfileScreen() {
  const userTitle = getUserTitle(mockUser.eventsCreated, mockUser.eventsAttended);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: TAB_BAR_HEIGHT}}>
        <View style={styles.header}>
          <Text style={styles.headerUsername}>{mockUser.username}</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {mockUser.avatar ? (
              <Image 
                source={{uri: mockUser.avatar}} 
                style={styles.profileImage}
              />
            ) : (
              <Icon name="account-circle" size={96} color={COLORS.text} />
            )}
          </View>

          <View style={styles.statsContainer}>
            <StatBox
              value={mockUser.eventsCreated}
              label="Düzenlenen"
            />
            <StatBox
              value={mockUser.eventsAttended}
              label="Katılım"
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.nameContainer}>
            <View style={styles.nameWithTitle}>
              <Text style={styles.name}>{mockUser.name}</Text>
              <Text style={styles.titleBadge}>{userTitle.text}</Text>
            </View>
          </View>

          <Text style={styles.bioText}>{mockUser.bio}</Text>

          <View style={styles.locationContainer}>
            <Icon name="map-marker-radius" size={16} color={COLORS.text} />
            <Text style={styles.location}>{mockUser.location}</Text>
          </View>

          <View style={styles.joinDateContainer}>
            <Icon name="calendar-check" size={16} color={COLORS.text} />
            <Text style={styles.joinDate}>Katılım: {mockUser.joinDate}</Text>
          </View>

          <View style={styles.eventsSection}>
            <Text style={styles.eventsSectionTitle}>Katıldığı Etkinlikler</Text>
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerUsername: {
    fontSize: 18,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameWithTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
  },
  titleBadge: {
    fontSize: 11,
    color: COLORS.purple,
    fontFamily: 'SF Pro Display-Medium',
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  eventsSection: {
    marginTop: 24,
  },
  eventsSectionTitle: {
    fontSize: 16,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-SemiBold',
    color: COLORS.text,
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventDetailText: {
    fontSize: 12,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.textSecondary,
  },
}); 