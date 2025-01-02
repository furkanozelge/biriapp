import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  purple: '#8B7BF7',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
};

type EventData = {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: {
    count: number;
    avatars: string[];
  };
};

const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Berlin Film Festivali Buluşması',
    date: '15 Şubat 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/400/200',
    attendees: {
      count: 12,
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
      ],
    },
  },
  {
    id: '2',
    title: 'Türk Mutfağı Workshop',
    date: '1 Şubat 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/400/200',
    attendees: {
      count: 8,
      avatars: [
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
      ],
    },
  },
  {
    id: '3',
    title: 'Müze Gezisi',
    date: '20 Ocak 2024',
    location: 'Berlin',
    image: 'https://picsum.photos/400/200',
    attendees: {
      count: 15,
      avatars: [
        'https://i.pravatar.cc/150?img=6',
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8',
      ],
    },
  },
];

export default function MyEventsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderEvent = ({item}: {item: EventData}) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', {eventId: item.id})}
      activeOpacity={0.7}>
      <Image source={{uri: item.image}} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailItem}>
              <Icon name="calendar" size={14} color={COLORS.textSecondary} />
              <Text style={styles.eventDetailText}>{item.date}</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <Icon name="map-marker" size={14} color={COLORS.textSecondary} />
              <Text style={styles.eventDetailText}>{item.location}</Text>
            </View>
          </View>
        </View>
        <View style={styles.attendees}>
          <View style={styles.avatarStack}>
            {item.attendees.avatars.slice(0, 3).map((avatar, index) => (
              <Image
                key={index}
                source={{uri: avatar}}
                style={[
                  styles.attendeeAvatar,
                  {right: index * 12},
                ]}
              />
            ))}
          </View>
          <Text style={styles.attendeeCount}>+{item.attendees.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Etkinliklerim</Text>
      </View>
      <FlatList
        data={mockEvents}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
  },
  eventsList: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-Regular',
    color: COLORS.textSecondary,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: 24,
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.card,
    position: 'absolute',
  },
  attendeeCount: {
    fontSize: 14,
    fontFamily: 'SF Pro Display-Medium',
    color: COLORS.textSecondary,
  },
}); 