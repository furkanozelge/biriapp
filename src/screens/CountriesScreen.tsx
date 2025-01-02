import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Android için layout animasyonlarını etkinleştir
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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

type CountryData = {
  id: string;
  name: string;
  flag: string;
  eventCount: number;
  cityCount: number;
  isFavorite?: boolean;
};

const mockCountries: CountryData[] = [
  {
    id: '1',
    name: 'Almanya',
    flag: '🇩🇪',
    eventCount: 24,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Fransa',
    flag: '🇫🇷',
    eventCount: 18,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Hollanda',
    flag: '🇳🇱',
    eventCount: 20,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '9',
    name: 'Avusturya',
    flag: '🇦🇹',
    eventCount: 5,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Belçika',
    flag: '🇧🇪',
    eventCount: 8,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'İtalya',
    flag: '🇮🇹',
    eventCount: 15,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '4',
    name: 'İspanya',
    flag: '🇪🇸',
    eventCount: 12,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '14',
    name: 'Çekya',
    flag: '🇨🇿',
    eventCount: 3,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '28',
    name: 'Amerika',
    flag: '🇺🇸',
    eventCount: 30,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '30',
    name: 'Türkiye',
    flag: '🇹🇷',
    eventCount: 25,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '29',
    name: 'Kanada',
    flag: '🇨🇦',
    eventCount: 15,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '7',
    name: 'İsveç',
    flag: '🇸🇪',
    eventCount: 6,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '8',
    name: 'Danimarka',
    flag: '🇩🇰',
    eventCount: 4,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '10',
    name: 'Polonya',
    flag: '🇵🇱',
    eventCount: 7,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '11',
    name: 'Portekiz',
    flag: '🇵🇹',
    eventCount: 4,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '12',
    name: 'Yunanistan',
    flag: '🇬🇷',
    eventCount: 3,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '13',
    name: 'Macaristan',
    flag: '🇭🇺',
    eventCount: 2,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '15',
    name: 'Romanya',
    flag: '🇷🇴',
    eventCount: 2,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '16',
    name: 'Bulgaristan',
    flag: '🇧🇬',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '17',
    name: 'Slovakya',
    flag: '🇸🇰',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '18',
    name: 'Hırvatistan',
    flag: '🇭🇷',
    eventCount: 2,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '19',
    name: 'Slovenya',
    flag: '🇸🇮',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '20',
    name: 'Estonya',
    flag: '🇪🇪',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '21',
    name: 'Letonya',
    flag: '🇱🇻',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '22',
    name: 'Litvanya',
    flag: '🇱🇹',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '23',
    name: 'İrlanda',
    flag: '🇮🇪',
    eventCount: 3,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '24',
    name: 'Finlandiya',
    flag: '🇫🇮',
    eventCount: 2,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '25',
    name: 'Malta',
    flag: '🇲🇹',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: '26',
    name: 'Kıbrıs',
    flag: '🇨🇾',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: 'lux',
    name: 'Lüksemburg',
    flag: '🇱🇺',
    eventCount: 1,
    cityCount: 10,
    isFavorite: false,
  },
  {
    id: 'che',
    name: 'İsviçre',
    flag: '🇨🇭',
    eventCount: 0,
    cityCount: 15,
    isFavorite: false,
  },
  {
    id: 'nor',
    name: 'Norveç',
    flag: '🇳🇴',
    eventCount: 0,
    cityCount: 12,
    isFavorite: false,
  },
  {
    id: 'isl',
    name: 'İzlanda',
    flag: '🇮🇸',
    eventCount: 0,
    cityCount: 5,
    isFavorite: false,
  },
  {
    id: 'srb',
    name: 'Sırbistan',
    flag: '🇷🇸',
    eventCount: 0,
    cityCount: 8,
    isFavorite: false,
  },
  {
    id: 'bih',
    name: 'Bosna Hersek',
    flag: '🇧🇦',
    eventCount: 0,
    cityCount: 6,
    isFavorite: false,
  },
  {
    id: 'alb',
    name: 'Arnavutluk',
    flag: '🇦🇱',
    eventCount: 0,
    cityCount: 5,
    isFavorite: false,
  },
  {
    id: 'mkd',
    name: 'Makedonya',
    flag: '🇲🇰',
    eventCount: 0,
    cityCount: 4,
    isFavorite: false,
  },
  {
    id: 'mne',
    name: 'Karadağ',
    flag: '🇲🇪',
    eventCount: 0,
    cityCount: 3,
    isFavorite: false,
  },
  {
    id: 'mda',
    name: 'Moldova',
    flag: '🇲🇩',
    eventCount: 0,
    cityCount: 4,
    isFavorite: false,
  },
  {
    id: 'jpn',
    name: 'Japonya',
    flag: '🇯🇵',
    eventCount: 0,
    cityCount: 20,
    isFavorite: false,
  },
  {
    id: 'kor',
    name: 'Güney Kore',
    flag: '🇰🇷',
    eventCount: 0,
    cityCount: 15,
    isFavorite: false,
  },
  {
    id: 'aus',
    name: 'Avustralya',
    flag: '🇦🇺',
    eventCount: 0,
    cityCount: 12,
    isFavorite: false,
  },
  {
    id: 'gbr',
    name: 'İngiltere',
    flag: '🇬🇧',
    eventCount: 0,
    cityCount: 25,
    isFavorite: false,
  },
  {
    id: 'chn',
    name: 'Çin',
    flag: '🇨🇳',
    eventCount: 0,
    cityCount: 50,
    isFavorite: false,
  },
  {
    id: 'ind',
    name: 'Hindistan',
    flag: '🇮🇳',
    eventCount: 0,
    cityCount: 45,
    isFavorite: false,
  },
  {
    id: 'rus',
    name: 'Rusya',
    flag: '🇷🇺',
    eventCount: 0,
    cityCount: 40,
    isFavorite: false,
  },
  {
    id: 'bra',
    name: 'Brezilya',
    flag: '🇧🇷',
    eventCount: 0,
    cityCount: 35,
    isFavorite: false,
  }
];

const TAB_BAR_HEIGHT = 80; // Tab bar yüksekliği

const COUNTRY_FLAGS: { [key: string]: string } = {
  'Almanya': 'https://flagcdn.com/w160/de.png',
  'Fransa': 'https://flagcdn.com/w160/fr.png',
  'Hollanda': 'https://flagcdn.com/w160/nl.png',
  'Avusturya': 'https://flagcdn.com/w160/at.png',
  'Belçika': 'https://flagcdn.com/w160/be.png',
  'İtalya': 'https://flagcdn.com/w160/it.png',
  'İspanya': 'https://flagcdn.com/w160/es.png',
  'Çekya': 'https://flagcdn.com/w160/cz.png',
  'Amerika': 'https://flagcdn.com/w160/us.png',
  'Türkiye': 'https://flagcdn.com/w160/tr.png',
  'Kanada': 'https://flagcdn.com/w160/ca.png',
  'İsveç': 'https://flagcdn.com/w160/se.png',
  'Danimarka': 'https://flagcdn.com/w160/dk.png',
  'Polonya': 'https://flagcdn.com/w160/pl.png',
  'Portekiz': 'https://flagcdn.com/w160/pt.png',
  'Yunanistan': 'https://flagcdn.com/w160/gr.png',
  'Macaristan': 'https://flagcdn.com/w160/hu.png',
  'Romanya': 'https://flagcdn.com/w160/ro.png',
  'Bulgaristan': 'https://flagcdn.com/w160/bg.png',
  'Slovakya': 'https://flagcdn.com/w160/sk.png',
  'Hırvatistan': 'https://flagcdn.com/w160/hr.png',
  'Slovenya': 'https://flagcdn.com/w160/si.png',
  'Estonya': 'https://flagcdn.com/w160/ee.png',
  'Letonya': 'https://flagcdn.com/w160/lv.png',
  'Litvanya': 'https://flagcdn.com/w160/lt.png',
  'İrlanda': 'https://flagcdn.com/w160/ie.png',
  'Finlandiya': 'https://flagcdn.com/w160/fi.png',
  'Malta': 'https://flagcdn.com/w160/mt.png',
  'Kıbrıs': 'https://flagcdn.com/w160/cy.png',
  'Lüksemburg': 'https://flagcdn.com/w160/lu.png',
  'İsviçre': 'https://flagcdn.com/w160/ch.png',
  'Norveç': 'https://flagcdn.com/w160/no.png',
  'İzlanda': 'https://flagcdn.com/w160/is.png',
  'Sırbistan': 'https://flagcdn.com/w160/rs.png',
  'Bosna Hersek': 'https://flagcdn.com/w160/ba.png',
  'Arnavutluk': 'https://flagcdn.com/w160/al.png',
  'Makedonya': 'https://flagcdn.com/w160/mk.png',
  'Karadağ': 'https://flagcdn.com/w160/me.png',
  'Moldova': 'https://flagcdn.com/w160/md.png',
  'Japonya': 'https://flagcdn.com/w160/jp.png',
  'Güney Kore': 'https://flagcdn.com/w160/kr.png',
  'Avustralya': 'https://flagcdn.com/w160/au.png',
  'İngiltere': 'https://flagcdn.com/w160/gb.png',
  'Çin': 'https://flagcdn.com/w160/cn.png',
  'Hindistan': 'https://flagcdn.com/w160/in.png',
  'Rusya': 'https://flagcdn.com/w160/ru.png',
  'Brezilya': 'https://flagcdn.com/w160/br.png'
};

export default function CountriesScreen() {
  const [countries, setCountries] = useState<CountryData[]>(mockCountries);
  const [lastFavorited, setLastFavorited] = useState<string | null>(null);
  const animatedValues = useRef<{[key: string]: Animated.Value}>({}).current;
  const isAnimating = useRef(false);
  const animationQueue = useRef<string[]>([]);

  // Her ülke için animasyon değeri oluştur
  countries.forEach(country => {
    if (!animatedValues[country.id]) {
      animatedValues[country.id] = new Animated.Value(1);
    }
  });

  const processNextAnimation = () => {
    if (animationQueue.current.length === 0) {
      isAnimating.current = false;
      return;
    }

    const nextId = animationQueue.current[0];
    const country = countries.find(c => c.id === nextId);
    if (!country) {
      animationQueue.current.shift();
      processNextAnimation();
      return;
    }

    // Favoriye ekleniyorsa önce soluklaştır
    Animated.timing(animatedValues[nextId], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Son favorilenen ülkeyi güncelle
      setLastFavorited(nextId);

      // State'i güncelle
      setCountries(prevCountries => {
        const newCountries = prevCountries.map(country => {
          if (country.id === nextId) {
            return {...country, isFavorite: true};
          }
          return country;
        });
        
        return [...newCountries].sort((a, b) => {
          if (a.isFavorite && b.isFavorite) {
            if (a.id === nextId) return -1;
            if (b.id === nextId) return 1;
            return 0;
          }
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return 0;
        });
      });

      // Yeni konumunda belirerek aç
      setTimeout(() => {
        Animated.spring(animatedValues[nextId], {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
        }).start(() => {
          animationQueue.current.shift();
          processNextAnimation();
        });
      }, 100);
    });
  };

  const toggleFavorite = (id: string) => {
    const country = countries.find(c => c.id === id);
    if (!country) return;

    if (!country.isFavorite) {
      // Kuyruğa ekle ve eğer animasyon çalışmıyorsa başlat
      animationQueue.current.push(id);
      if (!isAnimating.current) {
        isAnimating.current = true;
        processNextAnimation();
      }
    } else {
      // Favoriden çıkarılıyorsa direkt güncelle
      setCountries(prevCountries => {
        const newCountries = prevCountries.map(country => {
          if (country.id === id) {
            return {...country, isFavorite: false};
          }
          return country;
        });
        
        return [...newCountries].sort((a, b) => {
          if (a.isFavorite && b.isFavorite) {
            if (a.id === lastFavorited) return -1;
            if (b.id === id) return 1;
            return 0;
          }
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return 0;
        });
      });
    }
  };

  const CountryCard = ({item, index}: {item: CountryData; index: number}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacity = animatedValues[item.id];
    const scale = animatedValues[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    };

    return (
      <Animated.View style={{opacity, transform: [{scale}]}}>
        <TouchableOpacity
          style={[styles.countryCard, {backgroundColor: COLORS.card}]}
          onPress={() => navigation.navigate('CityEvents', {countryName: item.name})}>
          <View style={styles.cardContent}>
            <View style={styles.leftContent}>
              <Image 
                source={{uri: COUNTRY_FLAGS[item.name]}}
                style={styles.flag}
                resizeMode="contain"
              />
              <Text style={styles.countryName}>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}>
              <Icon
                name={item.isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={item.isFavorite ? '#8B7BF7' : COLORS.text}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCountry = ({item, index}: {item: CountryData; index: number}) => (
    <CountryCard item={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderCountry}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT,
          paddingHorizontal: 16,
          paddingTop: 16
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  countryCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    width: 32,
    height: 24,
    marginRight: 16,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 20,
    fontFamily: 'MonaSans-ExtraBold',
    color: COLORS.text,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
  },
}); 