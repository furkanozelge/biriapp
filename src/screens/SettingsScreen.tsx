import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch} from 'react-native';
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
  red: '#FF4B55',
};

const MenuButton = ({
  icon,
  label,
  onPress,
  showToggle = false,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
  showToggle?: boolean;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity 
      style={styles.menuButton} 
      onPress={onPress}
      disabled={showToggle}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: COLORS.purple }]}>
        <Icon name={icon} size={24} color={COLORS.text} />
      </View>
      <Text style={styles.menuButtonText}>{label}</Text>
      {showToggle ? (
        <Switch
          trackColor={{false: COLORS.card, true: COLORS.purple}}
          thumbColor={COLORS.text}
          ios_backgroundColor={COLORS.card}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
      )}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Ayarlar</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuButton
          icon="bell-ring"
          label="Bildirimler"
          showToggle={true}
        />
        <MenuButton
          icon="help-circle"
          label="Yardım"
          onPress={() => console.log('Yardım')}
        />
        <MenuButton
          icon="information"
          label="Hakkında"
          onPress={() => console.log('Hakkında')}
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => console.log('Çıkış')}>
        <Icon name="logout-variant" size={24} color={COLORS.red} style={styles.logoutIcon} />
        <Text style={[styles.logoutButtonText, { color: COLORS.red }]}>Çıkış Yap</Text>
      </TouchableOpacity>
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
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SF Pro Display-Bold',
    color: COLORS.text,
  },
  menuContainer: {
    padding: 16,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuButtonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SF Pro Display-Medium',
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: COLORS.red,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'SF Pro Display-Medium',
  },
}); 