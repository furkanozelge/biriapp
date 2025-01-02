import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  Animated,
  TouchableWithoutFeedback,
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
};

const CATEGORIES = [
  {name: 'Kültür & Sanat', icon: 'palette'},
  {name: 'Müzik', icon: 'music'},
  {name: 'Spor', icon: 'basketball'},
  {name: 'Yemek', icon: 'food'},
  {name: 'Workshop', icon: 'hammer'},
  {name: 'Networking', icon: 'account-group'},
  {name: 'Eğitim', icon: 'school'},
  {name: 'Teknoloji', icon: 'laptop'},
  {name: 'Sağlık', icon: 'heart'},
  {name: 'Dans', icon: 'dance-ballroom'},
  {name: 'Film & Tiyatro', icon: 'movie-open'},
  {name: 'Gezi', icon: 'hiking'},
  {name: 'Oyun', icon: 'gamepad-variant'},
  {name: 'Kitap', icon: 'book-open-variant'},
  {name: 'Fotoğrafçılık', icon: 'camera'},
];

type Category = {
  name: string;
  icon: string;
};

export default function CreateEventScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CreateEvent'>>();
  const {countryName} = route.params;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Şehir önerilerini filtrele
  const filteredCities = CITIES[countryName]?.filter(city =>
    city.toLowerCase().includes(location.toLowerCase())
  ) || [];

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setShowCitySuggestions(false);
  };

  const getCategoryIcon = (category: Category | null): string => {
    if (!category) return 'calendar';
    return category.icon;
  };

  const handleCreateEvent = () => {
    if (!selectedCategory) return;

    // Yeni etkinlik oluştur
    const newEvent = {
      id: Date.now().toString(),
      title: title,
      date: `${date} ${time}`,
      location: location,
      category: selectedCategory.name,
      categoryIcon: selectedCategory.icon,
      country: countryName,
      attendees: {
        count: 0,
        avatars: [],
      },
    };

    // CityEvents sayfasına geri dön ve yeni etkinliği parametre olarak gönder
    navigation.navigate('CityEvents', {
      countryName: countryName,
      newEvent: newEvent,
    });
  };

  const showModal = () => {
    setShowCategories(true);
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
    }).start(() => setShowCategories(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinlik Oluştur</Text>
        <TouchableOpacity onPress={handleCreateEvent}>
          <Icon name="check" size={24} color={COLORS.purple} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Icon name="format-title" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Etkinlik başlığı"
            placeholderTextColor={COLORS.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Icon name="calendar" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="12.12.2024"
              placeholderTextColor={COLORS.textSecondary}
              value={date}
              onChangeText={setDate}
              maxLength={10}
            />
          </View>

          <View style={[styles.inputContainer, {flex: 1}]}>
            <Icon name="clock-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="20:00"
              placeholderTextColor={COLORS.textSecondary}
              value={time}
              onChangeText={setTime}
              maxLength={5}
            />
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Şehir ara"
              placeholderTextColor={COLORS.textSecondary}
              value={location}
              onChangeText={(text) => {
                setLocation(text);
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

        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={showModal}
        >
          <Icon name="shape" size={20} color={COLORS.textSecondary} />
          <Text style={[
            styles.input, 
            { color: selectedCategory ? COLORS.text : COLORS.textSecondary }
          ]}>
            {selectedCategory ? selectedCategory.name : 'Kategori seç'}
          </Text>
        </TouchableOpacity>

        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Etkinlik açıklaması"
            placeholderTextColor={COLORS.textSecondary}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

      <Modal
        visible={showCategories}
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
              <Text style={styles.modalTitle}>Kategori Seç</Text>
              <TouchableOpacity onPress={hideModal}>
                <Icon name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.categoriesList}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={styles.categoryItem}
                  onPress={() => {
                    setSelectedCategory(category);
                    hideModal();
                  }}>
                  <Icon name={category.icon} size={24} color={COLORS.text} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  content: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  descriptionContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    minHeight: 120,
  },
  descriptionInput: {
    fontSize: 16,
    color: COLORS.text,
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
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'MonaSans-Bold',
    color: COLORS.text,
  },
  categoriesList: {
    padding: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: COLORS.card,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'MonaSans-SemiBold',
    color: COLORS.text,
    marginLeft: 12,
  },
  locationContainer: {
    marginBottom: 16,
    zIndex: 1,
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