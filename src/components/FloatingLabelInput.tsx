import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  background: '#1C1C23',
  card: '#252530',
  purple: '#8B7BF7',
  text: '#FFFFFF',
  textSecondary: '#8F8F8F',
};

interface FloatingLabelInputProps {
  label: string;
  iconName: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function FloatingLabelInput({
  label,
  iconName,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value.length > 0) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedIsFocused]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: 'absolute' as const,
    left: 4,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 6],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.textSecondary, COLORS.purple],
    }),
    fontFamily: 'SF-Pro-Display-Regular',
  };

  return (
    <View style={styles.container}>
      <Icon 
        name={iconName} 
        size={20} 
        color={isFocused ? COLORS.purple : COLORS.textSecondary}
        style={styles.icon} 
      />
      <View style={styles.inputWrapper}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          blurOnSubmit
        />
      </View>
      {showPasswordToggle && (
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={onTogglePassword}
        >
          <Icon 
            name={secureTextEntry ? "eye" : "eye-off"} 
            size={20} 
            color={COLORS.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 4,
  },
  inputWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.text,
    paddingTop: 16,
    paddingBottom: 8,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: COLORS.purple,
  },
  eyeIcon: {
    padding: 4,
  },
}); 