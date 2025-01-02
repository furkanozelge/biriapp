import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import FloatingLabelInput from '../components/FloatingLabelInput';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  purple: '#8B7BF7',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
};

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Burada kayıt işlemleri yapılacak
    // Başarılı kayıt sonrası giriş sayfasına yönlendirilecek
    navigation.navigate('Login');
  };

  const updateFormData = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Kayıt Ol</Text>
            <Text style={styles.subtitle}>Yeni bir maceraya başla</Text>
          </View>

          <View style={styles.form}>
            <FloatingLabelInput
              label="Kullanıcı Adı"
              iconName="account"
              value={formData.username}
              onChangeText={(text) => updateFormData('username', text)}
              autoCapitalize="none"
            />

            <FloatingLabelInput
              label="E-posta"
              iconName="email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <FloatingLabelInput
              label="Ad Soyad"
              iconName="account"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              autoCapitalize="words"
            />

            <FloatingLabelInput
              label="Konum"
              iconName="map-marker"
              value={formData.location}
              onChangeText={(text) => updateFormData('location', text)}
            />

            <FloatingLabelInput
              label="Şifre"
              iconName="lock"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              secureTextEntry={!showPassword}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <FloatingLabelInput
              label="Şifre Tekrar"
              iconName="lock-check"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              showPasswordToggle
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <TouchableOpacity 
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Zaten hesabın var mı? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SF-Pro-Display-Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    color: COLORS.textSecondary,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  registerButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  registerButtonText: {
    color: COLORS.text,
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.purple,
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 14,
  },
}); 