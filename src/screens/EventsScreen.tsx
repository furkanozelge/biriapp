import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  purple: '#8B7BF7',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
  green: '#7BC67E',
  pink: '#F5A3B5',
  yellow: '#F5C26B',
};

const CARD_COLORS = [COLORS.green, COLORS.pink, COLORS.yellow, COLORS.purple];

type EventData = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  categoryIcon: string;
  status: 'pending' | 'approved' | 'attended';
  attendees: {
    count: number;
    avatars: string[];
  };
};

const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Türk Filmleri Festivali',
    date: '15 Ocak 2024',
    location: 'Berlin, Almanya',
    category: 'Kültür & Sanat',
    categoryIcon: 'movie-open',
    status: 'pending',
    attendees: {
      count: 45,
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
      ],
    },
  },
  {
    id: '2',
    title: 'Türk Kahvesi Workshop',
    date: '20 Ocak 2024',
    location: 'Hamburg, Almanya',
    category: 'Workshop',
    categoryIcon: 'coffee',
    status: 'approved',
    attendees: {
      count: 12,
      avatars: [
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
      ],
    },
  },
  {
    id: '3',
    title: 'Networking Buluşması',
    date: '25 Ocak 2024',
    location: 'Münih, Almanya',
    category: 'Networking',
    categoryIcon: 'account-group',
    status: 'attended',
    attendees: {
      count: 30,
      avatars: [
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8',
        'https://i.pravatar.cc/150?img=9',
      ],
    },
  },
];

const TAB_BAR_HEIGHT = 80; // Tab bar yüksekliği

export default function EventsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'attended'>('all');

  const getStatusText = (status: EventData['status']) => {
    switch (status) {
      case 'pending':
        return 'Onay Bekliyor';
      case 'approved':
        return 'Katılım Onaylandı';
      case 'attended':
        return 'Katıldınız';
      default:
        return '';
    }
  };

  const getStatusColor = (status: EventData['status']) => {
    switch (status) {
      case 'pending':
        return COLORS.yellow;
      case 'approved':
        return COLORS.green;
      case 'attended':
        return COLORS.purple;
      default:
        return COLORS.textSecondary;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.status === selectedFilter;
  });

  const EventCard = ({item, index}: {item: EventData; index: number}) => {
    const backgroundColor = CARD_COLORS[index % CARD_COLORS.length];
    
    return (
      <TouchableOpacity
        style={[styles.eventCard]}
        onPress={() => navigation.navigate('EventDetail', {eventId: item.id})}
      >
        <View style={styles.eventHeader}>
          <View style={[styles.categoryBadge, {backgroundColor}]}>
            <Icon name={item.categoryIcon} size={16} color={COLORS.text} />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item.status)}]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar-clock" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="map-marker-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.attendeesRow}>
          <View style={styles.avatarStack}>
            {item.attendees.avatars.slice(0, 3).map((avatar, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.avatarContainer,
                  {marginLeft: idx > 0 ? -12 : 0}
                ]}
              >
                <View style={styles.avatarBorder}>
                  <Image
                    source={{uri: avatar}}
                    style={styles.avatar}
                  />
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.attendeeCount}>+{item.attendees.count} katılımcı</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === 'all' && styles.filterButtonTextActive,
          ]}>Tümü</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'pending' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('pending')}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === 'pending' && styles.filterButtonTextActive,
          ]}>Bekleyen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'approved' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('approved')}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === 'approved' && styles.filterButtonTextActive,
          ]}>Onaylanan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'attended' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('attended')}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === 'attended' && styles.filterButtonTextActive,
          ]}>Katıldığım</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={({item, index}) => <EventCard item={item} index={index} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: TAB_BAR_HEIGHT}}
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
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  filterButtonActive: {
    backgroundColor: COLORS.purple,
  },
  filterButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.text,
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
  },
  avatarBorder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.card,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  attendeeCount: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
}); 