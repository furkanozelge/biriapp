export type CountryData = {
  name: string;
  cities: string[];
  flag: string;
  eventCount: number;
};

export const countries: CountryData[] = [
  {
    name: 'Almanya',
    cities: ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'],
    flag: '🇩🇪',
    eventCount: 24,
  },
  {
    name: 'Amerika',
    cities: ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'Michigan', 'North Carolina', 'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Maryland', 'Missouri', 'Wisconsin'],
    flag: '🇺🇸',
    eventCount: 30,
  },
  {
    name: 'Kanada',
    cities: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island'],
    flag: '🇨🇦',
    eventCount: 15,
  },
  {
    name: 'Türkiye',
    cities: ['Marmara', 'İç Anadolu', 'Ege', 'Akdeniz', 'Karadeniz', 'Doğu Anadolu', 'Güneydoğu Anadolu'],
    flag: '🇹🇷',
    eventCount: 45,
  },
  {
    name: 'Fransa',
    cities: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Hauts-de-France', 'Nouvelle-Aquitaine', 'Occitanie', 'Grand Est', 'Provence-Alpes-Côte d\'Azur', 'Pays de la Loire', 'Normandie', 'Bretagne', 'Bourgogne-Franche-Comté', 'Centre-Val de Loire', 'Corse'],
    flag: '🇫🇷',
    eventCount: 18,
  },
  {
    name: 'İtalya',
    cities: ['Lombardia', 'Lazio', 'Campania', 'Sicilia', 'Veneto', 'Emilia-Romagna', 'Piemonte', 'Puglia', 'Toscana', 'Calabria', 'Sardegna', 'Liguria', 'Marche', 'Abruzzo', 'Friuli-Venezia Giulia', 'Trentino-Alto Adige', 'Umbria', 'Basilicata', 'Molise', 'Valle d\'Aosta'],
    flag: '🇮🇹',
    eventCount: 15,
  },
  {
    name: 'İspanya',
    cities: ['Andalucía', 'Cataluña', 'Comunidad de Madrid', 'Comunidad Valenciana', 'Galicia', 'Castilla y León', 'País Vasco', 'Castilla-La Mancha', 'Canarias', 'Región de Murcia', 'Aragón', 'Islas Baleares', 'Extremadura', 'Principado de Asturias', 'Comunidad Foral de Navarra', 'Cantabria', 'La Rioja'],
    flag: '🇪🇸',
    eventCount: 12,
  },
  {
    name: 'Hollanda',
    cities: ['Noord-Holland', 'Zuid-Holland', 'Noord-Brabant', 'Gelderland', 'Utrecht', 'Overijssel', 'Limburg', 'Friesland', 'Groningen', 'Drenthe', 'Zeeland', 'Flevoland'],
    flag: '🇳🇱',
    eventCount: 20,
  },
  {
    name: 'Belçika',
    cities: ['Flanders', 'Wallonia', 'Brussels-Capital'],
    flag: '🇧🇪',
    eventCount: 8,
  },
  {
    name: 'İsveç',
    cities: ['Stockholm', 'Västra Götaland', 'Skåne', 'Uppsala', 'Östergötland', 'Jönköping', 'Halland', 'Örebro', 'Gävleborg', 'Dalarna', 'Västerbotten', 'Norrbotten', 'Västmanland', 'Södermanland', 'Västernorrland', 'Kronoberg', 'Kalmar', 'Värmland', 'Blekinge', 'Jämtland', 'Gotland'],
    flag: '🇸🇪',
    eventCount: 6,
  }
]; 