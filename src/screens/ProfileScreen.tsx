import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

// Renk paleti
const COLORS = {
  background: '#1C1C23',  // Koyu arka plan
  card: '#252530',       // Kart arka planı
  green: '#7BC67E',      // Yeşil
  pink: '#F5A3B5',       // Pembe
  purple: '#8B7BF7',     // Mor
  yellow: '#F5C26B',     // Sarı/turuncu
  text: '#FFFFFF',       // Beyaz metin
  textSecondary: '#8F8F8F', // İkincil metin
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

type UserProfile = {
  username: string;
  name: string;
  location: string;
  joinDate: string;
  eventsCreated: number;
  eventsAttended: number;
  bio: string;
  avatar: string;
};

const getUserTitle = (created: number, attended: number) => {
  const total = created + attended;
  if (total === 0) return {text: '⭐ Yeni Üye', color: COLORS.green};
  if (total === 1) return {text: '🎯 Etkinlik Meraklısı', color: COLORS.pink};
  if (total <= 5) return {text: '🦋 Sosyal Kelebek', color: COLORS.yellow};
  if (total <= 10) return {text: '🎭 Etkinlik Gurusu', color: COLORS.purple};
  return {text: '👑 Etkinlik Ustası', color: COLORS.purple};
};

const StatBox = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TAB_BAR_HEIGHT = 80;

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

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockUser);
  const userTitle = getUserTitle(mockUser.eventsCreated, mockUser.eventsAttended);

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedProfile({...mockUser});
  };

  const handleSave = () => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({...mockUser});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: TAB_BAR_HEIGHT}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={isEditing ? handleSave : handleEditPress}>
            <Icon name={isEditing ? "check" : "pencil"} size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          {isEditing ? (
            <TextInput
              style={[styles.headerUsername, styles.editInput]}
              value={editedProfile.username}
              onChangeText={(text) => setEditedProfile({...editedProfile, username: text})}
            />
          ) : (
            <Text style={styles.headerUsername}>{mockUser.username}</Text>
          )}
          
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name="cog" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={() => {
              if (isEditing) {
                console.log('Fotoğraf seç');
              }
            }}>
            {editedProfile.avatar ? (
              <Image 
                source={{uri: editedProfile.avatar}} 
                style={styles.profileImage}
              />
            ) : (
              <Icon name="account-circle" size={96} color={COLORS.text} />
            )}
            {isEditing && (
              <View style={styles.editAvatarOverlay}>
                <Icon name="camera" size={24} color={COLORS.text} />
              </View>
            )}
          </TouchableOpacity>

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
            {isEditing ? (
              <TextInput
                style={[styles.name, styles.editInput]}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
              />
            ) : (
              <View style={styles.nameWithTitle}>
                <Text style={styles.name}>{mockUser.name}</Text>
                <Text style={styles.titleBadge}>{userTitle.text}</Text>
              </View>
            )}
          </View>

          {isEditing ? (
            <TextInput
              style={[styles.bioText, styles.editInput, styles.bioInput]}
              value={editedProfile.bio || ''}
              onChangeText={(text) => setEditedProfile({...editedProfile, bio: text})}
              multiline
              placeholder="Kendinizden bahsedin..."
              placeholderTextColor={`${COLORS.text}80`}
            />
          ) : editedProfile.bio ? (
            <Text style={styles.bioText}>{editedProfile.bio}</Text>
          ) : null}

          <View style={styles.locationContainer}>
            <Icon name="map-marker-radius" size={16} color={COLORS.text} />
            {isEditing ? (
              <TextInput
                style={[styles.location, styles.editInput]}
                value={editedProfile.location}
                onChangeText={(text) => setEditedProfile({...editedProfile, location: text})}
              />
            ) : (
              <Text style={styles.location}>{mockUser.location}</Text>
            )}
          </View>

          <View style={styles.joinDateContainer}>
            <Icon name="calendar-check" size={16} color={COLORS.text} />
            <Text style={styles.joinDate}>Katılım: {mockUser.joinDate}</Text>
          </View>

          <View style={styles.eventsSection}>
            <Text style={styles.eventsSectionTitle}>Katıldığım Etkinlikler</Text>
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>İptal</Text>
          </TouchableOpacity>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerUsername: {
    fontSize: 18,
    fontFamily: 'MonaSans-Bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
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
    fontFamily: 'MonaSans-Bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'MonaSans-Regular',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  titleText: {
    color: COLORS.purple,
    fontSize: 13,
    fontFamily: 'MonaSans-SemiBold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'MonaSans-Regular',
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
    fontFamily: 'MonaSans-Regular',
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
    fontFamily: 'MonaSans-Regular',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editInput: {
    fontFamily: 'MonaSans-Bold',
    color: COLORS.text,
    padding: 0,
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'transparent',
  },
  bioInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    marginTop: 4,
    marginBottom: 12,
    backgroundColor: 'transparent',
    padding: 0,
  },
  editAvatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.text,
    fontFamily: 'MonaSans-Bold',
    fontSize: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'MonaSans-Bold',
    color: COLORS.text,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  titleBadge: {
    fontSize: 11,
    color: COLORS.purple,
    fontFamily: 'MonaSans-Medium',
  },
  nameWithTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  eventsSectionTitle: {
    fontSize: 16,
    fontFamily: 'MonaSans-Bold',
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
    fontFamily: 'MonaSans-SemiBold',
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
    fontFamily: 'MonaSans-Regular',
    color: COLORS.textSecondary,
  },
}); 