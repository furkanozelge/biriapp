import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
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

type CityScreenRouteProp = RouteProp<RootStackParamList, 'City'>;

type StateData = {
  name: string;
  eventCount: number;
};

// Örnek eyalet verileri
const mockStates: Record<string, StateData[]> = {
  'Almanya': [
    { name: 'Baden-Württemberg', eventCount: 5 },
    { name: 'Bayern', eventCount: 8 },
    { name: 'Berlin', eventCount: 12 },
    { name: 'Brandenburg', eventCount: 3 },
    { name: 'Bremen', eventCount: 2 },
    { name: 'Hamburg', eventCount: 7 },
    { name: 'Hessen', eventCount: 6 },
    { name: 'Mecklenburg-Vorpommern', eventCount: 2 },
    { name: 'Niedersachsen', eventCount: 4 },
    { name: 'Nordrhein-Westfalen', eventCount: 15 },
    { name: 'Rheinland-Pfalz', eventCount: 3 },
    { name: 'Saarland', eventCount: 2 },
    { name: 'Sachsen', eventCount: 4 },
    { name: 'Sachsen-Anhalt', eventCount: 2 },
    { name: 'Schleswig-Holstein', eventCount: 3 },
    { name: 'Thüringen', eventCount: 2 },
  ],
  'Amerika': [
    { name: 'California', eventCount: 25 },
    { name: 'Texas', eventCount: 18 },
    { name: 'Florida', eventCount: 15 },
    { name: 'New York', eventCount: 30 },
    { name: 'Illinois', eventCount: 12 },
    { name: 'Pennsylvania', eventCount: 10 },
    { name: 'Ohio', eventCount: 8 },
    { name: 'Georgia', eventCount: 14 },
    { name: 'Michigan', eventCount: 9 },
    { name: 'North Carolina', eventCount: 11 },
    { name: 'New Jersey', eventCount: 16 },
    { name: 'Virginia', eventCount: 7 },
    { name: 'Washington', eventCount: 13 },
    { name: 'Arizona', eventCount: 8 },
    { name: 'Massachusetts', eventCount: 17 },
  ],
  'Kanada': [
    { name: 'Ontario', eventCount: 20 },
    { name: 'Quebec', eventCount: 15 },
    { name: 'British Columbia', eventCount: 12 },
    { name: 'Alberta', eventCount: 8 },
    { name: 'Manitoba', eventCount: 5 },
    { name: 'Saskatchewan', eventCount: 4 },
    { name: 'Nova Scotia', eventCount: 6 },
    { name: 'New Brunswick', eventCount: 3 },
    { name: 'Newfoundland and Labrador', eventCount: 2 },
    { name: 'Prince Edward Island', eventCount: 1 },
    { name: 'Northwest Territories', eventCount: 1 },
    { name: 'Yukon', eventCount: 1 },
    { name: 'Nunavut', eventCount: 1 },
  ],
  'İngiltere': [
    { name: 'Greater London', eventCount: 35 },
    { name: 'South East England', eventCount: 18 },
    { name: 'North West England', eventCount: 15 },
    { name: 'West Midlands', eventCount: 12 },
    { name: 'Yorkshire and the Humber', eventCount: 10 },
    { name: 'East of England', eventCount: 8 },
    { name: 'South West England', eventCount: 7 },
    { name: 'East Midlands', eventCount: 6 },
    { name: 'North East England', eventCount: 5 },
    { name: 'Wales', eventCount: 8 },
    { name: 'Scotland', eventCount: 12 },
    { name: 'Northern Ireland', eventCount: 6 },
  ],
  'Fransa': [
    { name: 'Île-de-France', eventCount: 30 },
    { name: 'Auvergne-Rhône-Alpes', eventCount: 15 },
    { name: 'Nouvelle-Aquitaine', eventCount: 12 },
    { name: 'Occitanie', eventCount: 10 },
    { name: 'Hauts-de-France', eventCount: 8 },
    { name: 'Provence-Alpes-Côte d\'Azur', eventCount: 14 },
    { name: 'Grand Est', eventCount: 9 },
    { name: 'Pays de la Loire', eventCount: 7 },
    { name: 'Bretagne', eventCount: 6 },
    { name: 'Normandie', eventCount: 5 },
    { name: 'Bourgogne-Franche-Comté', eventCount: 4 },
    { name: 'Centre-Val de Loire', eventCount: 3 },
    { name: 'Corse', eventCount: 2 },
  ],
  'İtalya': [
    { name: 'Lombardia', eventCount: 25 },
    { name: 'Lazio', eventCount: 20 },
    { name: 'Campania', eventCount: 15 },
    { name: 'Veneto', eventCount: 12 },
    { name: 'Emilia-Romagna', eventCount: 10 },
    { name: 'Piemonte', eventCount: 8 },
    { name: 'Toscana', eventCount: 11 },
    { name: 'Puglia', eventCount: 7 },
    { name: 'Sicilia', eventCount: 9 },
    { name: 'Liguria', eventCount: 5 },
    { name: 'Marche', eventCount: 4 },
    { name: 'Abruzzo', eventCount: 3 },
    { name: 'Calabria', eventCount: 4 },
    { name: 'Sardegna', eventCount: 5 },
  ],
  'İspanya': [
    { name: 'Madrid', eventCount: 28 },
    { name: 'Cataluña', eventCount: 22 },
    { name: 'Andalucía', eventCount: 18 },
    { name: 'Comunidad Valenciana', eventCount: 15 },
    { name: 'País Vasco', eventCount: 12 },
    { name: 'Galicia', eventCount: 8 },
    { name: 'Castilla y León', eventCount: 7 },
    { name: 'Canarias', eventCount: 10 },
    { name: 'Castilla-La Mancha', eventCount: 5 },
    { name: 'Aragón', eventCount: 4 },
    { name: 'Islas Baleares', eventCount: 6 },
    { name: 'Extremadura', eventCount: 3 },
  ],
  'Hollanda': [
    { name: 'Noord-Holland', eventCount: 25 },
    { name: 'Zuid-Holland', eventCount: 20 },
    { name: 'Noord-Brabant', eventCount: 15 },
    { name: 'Utrecht', eventCount: 12 },
    { name: 'Gelderland', eventCount: 10 },
    { name: 'Overijssel', eventCount: 8 },
    { name: 'Limburg', eventCount: 7 },
    { name: 'Groningen', eventCount: 6 },
    { name: 'Friesland', eventCount: 5 },
    { name: 'Drenthe', eventCount: 4 },
    { name: 'Flevoland', eventCount: 3 },
    { name: 'Zeeland', eventCount: 3 },
  ],
  'Belçika': [
    { name: 'Brussels-Capital Region', eventCount: 20 },
    { name: 'Flanders', eventCount: 25 },
    { name: 'Wallonia', eventCount: 15 },
    { name: 'Antwerp', eventCount: 12 },
    { name: 'East Flanders', eventCount: 10 },
    { name: 'West Flanders', eventCount: 8 },
    { name: 'Limburg', eventCount: 7 },
    { name: 'Flemish Brabant', eventCount: 9 },
    { name: 'Walloon Brabant', eventCount: 6 },
    { name: 'Hainaut', eventCount: 8 },
    { name: 'Liège', eventCount: 7 },
  ],
  'İsveç': [
    { name: 'Stockholm', eventCount: 30 },
    { name: 'Västra Götaland', eventCount: 20 },
    { name: 'Skåne', eventCount: 15 },
    { name: 'Uppsala', eventCount: 8 },
    { name: 'Östergötland', eventCount: 7 },
    { name: 'Jönköping', eventCount: 5 },
    { name: 'Halland', eventCount: 4 },
    { name: 'Örebro', eventCount: 6 },
    { name: 'Gävleborg', eventCount: 3 },
    { name: 'Dalarna', eventCount: 4 },
    { name: 'Västerbotten', eventCount: 5 },
  ],
  'Norveç': [
    { name: 'Oslo', eventCount: 25 },
    { name: 'Viken', eventCount: 18 },
    { name: 'Vestland', eventCount: 12 },
    { name: 'Trøndelag', eventCount: 10 },
    { name: 'Rogaland', eventCount: 8 },
    { name: 'Møre og Romsdal', eventCount: 6 },
    { name: 'Nordland', eventCount: 5 },
    { name: 'Vestfold og Telemark', eventCount: 7 },
    { name: 'Agder', eventCount: 4 },
    { name: 'Innlandet', eventCount: 5 },
    { name: 'Troms og Finnmark', eventCount: 3 },
  ],
  'Danimarka': [
    { name: 'Capital Region', eventCount: 28 },
    { name: 'Central Denmark', eventCount: 15 },
    { name: 'Southern Denmark', eventCount: 12 },
    { name: 'Zealand', eventCount: 10 },
    { name: 'North Denmark', eventCount: 8 },
  ],
  'Finlandiya': [
    { name: 'Uusimaa', eventCount: 25 },
    { name: 'Pirkanmaa', eventCount: 12 },
    { name: 'Southwest Finland', eventCount: 10 },
    { name: 'North Ostrobothnia', eventCount: 8 },
    { name: 'Central Finland', eventCount: 6 },
    { name: 'Northern Savonia', eventCount: 5 },
    { name: 'Päijät-Häme', eventCount: 4 },
    { name: 'South Karelia', eventCount: 3 },
    { name: 'Lapland', eventCount: 5 },
  ],
  'İrlanda': [
    { name: 'Dublin', eventCount: 30 },
    { name: 'Cork', eventCount: 15 },
    { name: 'Galway', eventCount: 12 },
    { name: 'Limerick', eventCount: 8 },
    { name: 'Waterford', eventCount: 6 },
    { name: 'Kerry', eventCount: 5 },
    { name: 'Wicklow', eventCount: 4 },
    { name: 'Kildare', eventCount: 7 },
    { name: 'Meath', eventCount: 5 },
  ],
  'Avusturya': [
    { name: 'Vienna', eventCount: 25 },
    { name: 'Lower Austria', eventCount: 15 },
    { name: 'Upper Austria', eventCount: 12 },
    { name: 'Styria', eventCount: 10 },
    { name: 'Tyrol', eventCount: 8 },
    { name: 'Carinthia', eventCount: 6 },
    { name: 'Salzburg', eventCount: 7 },
    { name: 'Vorarlberg', eventCount: 4 },
    { name: 'Burgenland', eventCount: 3 },
  ],
  'İsviçre': [
    { name: 'Zürich', eventCount: 25 },
    { name: 'Geneva', eventCount: 20 },
    { name: 'Bern', eventCount: 15 },
    { name: 'Vaud', eventCount: 12 },
    { name: 'Basel-Stadt', eventCount: 10 },
    { name: 'St. Gallen', eventCount: 8 },
    { name: 'Lucerne', eventCount: 7 },
    { name: 'Ticino', eventCount: 6 },
    { name: 'Valais', eventCount: 5 },
  ],
  'Polonya': [
    { name: 'Masovian', eventCount: 25 },
    { name: 'Lesser Poland', eventCount: 18 },
    { name: 'Greater Poland', eventCount: 15 },
    { name: 'Lower Silesian', eventCount: 12 },
    { name: 'Łódź', eventCount: 10 },
    { name: 'Pomeranian', eventCount: 8 },
    { name: 'Silesian', eventCount: 14 },
    { name: 'West Pomeranian', eventCount: 7 },
    { name: 'Lublin', eventCount: 6 },
  ],
  'Çekya': [
    { name: 'Prague', eventCount: 30 },
    { name: 'South Moravian', eventCount: 15 },
    { name: 'Central Bohemian', eventCount: 12 },
    { name: 'Moravian-Silesian', eventCount: 10 },
    { name: 'Plzeň', eventCount: 8 },
    { name: 'Ústí nad Labem', eventCount: 6 },
    { name: 'Hradec Králové', eventCount: 5 },
    { name: 'Olomouc', eventCount: 4 },
  ],
  'Türkiye': [
    { name: 'Marmara', eventCount: 35 },
    { name: 'Ege', eventCount: 25 },
    { name: 'İç Anadolu', eventCount: 20 },
    { name: 'Akdeniz', eventCount: 18 },
    { name: 'Karadeniz', eventCount: 12 },
    { name: 'Doğu Anadolu', eventCount: 8 },
    { name: 'Güneydoğu Anadolu', eventCount: 10 },
  ],
};

const StateCard = ({state, index, onPress}: {
  state: StateData;
  index: number;
  onPress: () => void;
}) => {
  const backgroundColor = CARD_COLORS[index % CARD_COLORS.length];
  
  return (
    <TouchableOpacity 
      style={[styles.stateCard, {backgroundColor}]}
      onPress={onPress}
    >
      <View style={styles.stateInfo}>
        <Text style={styles.stateName}>{state.name}</Text>
        <Text style={styles.eventCount}>{state.eventCount} Etkinlik</Text>
      </View>
      <Icon name="chevron-right" size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
};

export default function CityScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CityScreenRouteProp>();
  const {countryName} = route.params;

  const states = mockStates[countryName] || [];

  const renderState = ({item, index}: {item: StateData; index: number}) => (
    <StateCard
      state={item}
      index={index}
      onPress={() => {
        navigation.navigate('CityEvents', {
          countryName,
          cityName: item.name,
        });
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{countryName}</Text>
        <View style={styles.rightPlaceholder} />
      </View>
      <FlatList
        data={states}
        renderItem={renderState}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.listContainer}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
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
  stateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  stateInfo: {
    flex: 1,
  },
  stateName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  eventCount: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.8,
  },
});