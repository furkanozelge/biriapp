import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CITIES} from '../data/cities';

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

type FilterState = {
  location: string;
  eventDate: string;
};

type EventData = {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: {
    count: number;
    avatars: string[];
  };
  category: string;
  categoryIcon: string;
  country: string;
};

// Örnek etkinlik verileri
const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Türk Filmleri Festivali',
    date: '15 Ocak 2024',
    location: 'Kültür Merkezi',
    attendees: {
      count: 45,
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
      ],
    },
    category: 'Kültür & Sanat',
    categoryIcon: 'movie-open',
    country: 'Almanya'
  },
  {
    id: '2',
    title: 'Türk Kahvesi Workshop',
    date: '20 Ocak 2024',
    location: 'Cafe Istanbul',
    attendees: {
      count: 12,
      avatars: [
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
      ],
    },
    category: 'Workshop',
    categoryIcon: 'coffee',
    country: 'Hollanda'
  },
  {
    id: '3',
    title: 'Networking Buluşması',
    date: '25 Ocak 2024',
    location: 'Tech Hub',
    attendees: {
      count: 30,
      avatars: [
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8',
        'https://i.pravatar.cc/150?img=9',
      ],
    },
    category: 'Networking',
    categoryIcon: 'account-group',
    country: 'Almanya'
  },
  {
    id: '4',
    title: 'Türk Mutfağı Atölyesi',
    date: '1 Şubat 2024',
    location: 'Gastronomi Merkezi',
    attendees: {
      count: 20,
      avatars: [
        'https://i.pravatar.cc/150?img=10',
        'https://i.pravatar.cc/150?img=11',
        'https://i.pravatar.cc/150?img=12',
      ],
    },
    category: 'Yemek',
    categoryIcon: 'food-variant',
    country: 'Türkiye'
  },
  {
    id: '5',
    title: 'Türk Müziği Konseri',
    date: '10 Şubat 2024',
    location: 'Konser Salonu',
    attendees: {
      count: 100,
      avatars: [
        'https://i.pravatar.cc/150?img=13',
        'https://i.pravatar.cc/150?img=14',
        'https://i.pravatar.cc/150?img=15',
      ],
    },
    category: 'Müzik',
    categoryIcon: 'music',
    country: 'Türkiye'
  },
];

const EventCard = ({event, index}: {event: EventData; index: number}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const backgroundColor = CARD_COLORS[index % CARD_COLORS.length];
  
  return (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
    >
      <View style={styles.eventHeader}>
        <View style={[styles.categoryBadge, { backgroundColor }]}>
          <Icon name={event.categoryIcon} size={16} color={COLORS.text} />
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
      </View>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventDetails}>
        <View style={styles.detailRow}>
          <Icon name="calendar-clock" size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="map-marker-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
      </View>
      <View style={styles.attendeesRow}>
        <View style={styles.avatarStack}>
          {event.attendees.avatars.slice(0, 3).map((avatar, idx) => (
            <View 
              key={idx} 
              style={[
                styles.avatarContainer,
                { marginLeft: idx > 0 ? -12 : 0 }
              ]}
            >
              <View style={styles.avatarBorder}>
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                />
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.attendeeCount}>+{event.attendees.count} katılımcı</Text>
      </View>
    </TouchableOpacity>
  );
};

const COUNTRY_FLAGS: { [key: string]: string } = {
  'Almanya': '🇩🇪',
  'Fransa': '🇫🇷',
  'Hollanda': '🇳🇱',
  'Avusturya': '🇦🇹',
  'Belçika': '🇧🇪',
  'İtalya': '🇮🇹',
  'İspanya': '🇪🇸',
  'Çekya': '🇨🇿',
  'Amerika': '🇺🇸',
  'Türkiye': '🇹🇷',
  'Kanada': '🇨🇦',
  'İsviçre': '🇨🇭',
  'İngiltere': '🇬🇧',
  'İrlanda': '🇮🇪',
  'Danimarka': '🇩🇰',
  'Norveç': '🇳🇴',
  'İsveç': '🇸🇪',
  'Finlandiya': '🇫🇮',
  'Polonya': '🇵🇱',
  'Portekiz': '🇵🇹',
};

export default function CityEventsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CityEvents'>>();
  const {countryName} = route.params;

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    eventDate: '',
  });

  // Etkinlikleri ülkeye göre filtrele
  const [events, setEvents] = useState<EventData[]>(
    mockEvents.filter(event => event.country === countryName)
  );

  // Yeni etkinlik eklemek için fonksiyon
  const addNewEvent = useCallback((newEvent: EventData) => {
    setEvents(prevEvents => {
      // Eğer etkinlik zaten eklenmişse, tekrar ekleme
      if (prevEvents.some(event => event.id === newEvent.id)) {
        return prevEvents;
      }
      return [...prevEvents, newEvent];
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.newEvent) {
        addNewEvent(route.params.newEvent);
        // Etkinliği ekledikten sonra params'tan temizle
        navigation.setParams({ newEvent: undefined });
      }
    });

    return unsubscribe;
  }, [navigation, addNewEvent]);

  const showModal = () => {
    setIsFilterVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 65,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsFilterVisible(false));
  };

  const renderEvent = ({item, index}: {item: EventData; index: number}) => (
    <EventCard event={item} index={index} />
  );

  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Şehir önerilerini filtrele
  const filteredCities = CITIES[countryName]?.filter(city =>
    city.toLowerCase().includes(filters.location.toLowerCase())
  ) || [];

  const handleCitySelect = (city: string) => {
    setFilters(prev => ({...prev, location: city}));
    setShowCitySuggestions(false);
  };

  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

  useEffect(() => {
    // Filtreleri uygula
    let result = [...events];

    if (filters.location) {
      result = result.filter(event => 
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.eventDate) {
      result = result.filter(event => 
        event.date.includes(filters.eventDate)
      );
    }

    setFilteredEvents(result);
  }, [filters, events]);

  const handleFilterApply = () => {
    hideModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {COUNTRY_FLAGS[countryName] || ''} {countryName}
        </Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <FlatList
        data={filteredEvents.length > 0 ? filteredEvents : events}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Filter Button */}
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={showModal}
      >
        <Icon name="filter-variant" size={24} color={COLORS.text} />
      </TouchableOpacity>

      {/* Create Event Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent', {countryName})}
      >
        <Icon name="plus" size={24} color={COLORS.text} />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        animationType="none"
        transparent={true}
        onRequestClose={hideModal}
        statusBarTranslucent={true}
      >
        <View style={[styles.modalOverlay, { opacity: 0.5 }]}>
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </View>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{
                translateY: slideAnim
              }]
            }
          ]}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrele</Text>
              <TouchableOpacity onPress={hideModal}>
                <Icon name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Konum</Text>
                <View style={styles.locationContainer}>
                  <View style={styles.locationInputContainer}>
                    <Icon name="map-marker" size={20} color={COLORS.textSecondary} style={styles.locationInputIcon} />
                    <TextInput
                      style={styles.locationTextInput}
                      placeholder="Şehir ara"
                      placeholderTextColor={COLORS.textSecondary}
                      value={filters.location}
                      onChangeText={(text) => {
                        setFilters(prev => ({...prev, location: text}));
                        setShowCitySuggestions(true);
                      }}
                      onFocus={() => setShowCitySuggestions(true)}
                    />
                  </View>
                  {showCitySuggestions && filteredCities.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      <ScrollView 
                        style={styles.suggestionsList} 
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                      >
                        {filteredCities.map((city, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.suggestionItem,
                              index === filteredCities.length - 1 && styles.lastSuggestionItem
                            ]}
                            onPress={() => handleCitySelect(city)}
                          >
                            <Icon name="city" size={20} color={COLORS.textSecondary} />
                            <Text style={styles.suggestionText}>{city}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Etkinlik Tarihi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="GG.AA.YYYY"
                  placeholderTextColor={COLORS.textSecondary}
                  value={filters.eventDate}
                  onChangeText={(text) => setFilters({...filters, eventDate: text})}
                  maxLength={10}
                />
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleFilterApply}
            >
              <Text style={styles.applyButtonText}>Uygula</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  rightPlaceholder: {
    width: 40,
  },
  listContainer: {
    padding: 16,
  },
  filterButton: {
    position: 'absolute',
    left: 16,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButton: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalScroll: {
    marginBottom: 8,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    color: COLORS.text,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  applyButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
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
  locationContainer: {
    position: 'relative',
    zIndex: 1,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
  },
  locationInputIcon: {
    marginRight: 8,
  },
  locationTextInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    maxHeight: 200,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionsList: {
    padding: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  lastSuggestionItem: {
    borderBottomWidth: 0,
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
}); 