import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
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
};

type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  isMine: boolean;
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Herkese merhaba! Yarınki etkinlik için heyecanlı mısınız?',
    timestamp: '14:30',
    sender: {
      id: '1',
      name: '@ahmetyilmaz',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isMine: false,
  },
  {
    id: '2',
    text: 'Evet, çok heyecanlıyım!',
    timestamp: '14:31',
    sender: {
      id: '2',
      name: '@aysedemir',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    isMine: true,
  },
  {
    id: '3',
    text: 'Saat kaçta buluşuyoruz?',
    timestamp: '14:32',
    sender: {
      id: '3',
      name: '@mehmetkaya',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    isMine: false,
  },
];

// Mock katılımcı verileri
const mockParticipants = [
  {
    id: '1',
    name: '@ahmetyilmaz',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: '@aysedemir',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: '@mehmetkaya',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: '@zeynepcelik',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: '@canyildiz',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const TAB_BAR_HEIGHT = 80; // Tab bar yüksekliği

export default function ChatDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [message, setMessage] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const showModal = () => {
    setShowParticipants(true);
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
    }).start(() => setShowParticipants(false));
  };

  const ParticipantsModal = () => (
    <Modal
      visible={showParticipants}
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
            <Text style={styles.modalTitle}>Katılımcılar</Text>
            <TouchableOpacity onPress={hideModal}>
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.participantsList}>
            {mockParticipants.map((participant) => (
              <TouchableOpacity
                key={participant.id}
                style={styles.participantItem}
                onPress={() => {
                  hideModal();
                  navigation.navigate('UserProfile', { userId: participant.id });
                }}
              >
                <Image
                  source={{uri: participant.avatar}}
                  style={styles.participantAvatar}
                />
                <Text style={styles.participantName}>{participant.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );

  const MessageBubble = ({item}: {item: Message}) => {
    return (
      <View
        style={[
          styles.messageBubbleContainer,
          item.isMine ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}>
        {!item.isMine && (
          <Image source={{uri: item.sender.avatar}} style={styles.avatar} />
        )}
        <View
          style={[
            styles.messageBubble,
            item.isMine ? styles.myMessage : styles.otherMessage,
          ]}>
          {!item.isMine && (
            <Text style={styles.senderName}>{item.sender.name}</Text>
          )}
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={showModal}>
          <Text style={styles.title}>Türk Filmleri Festivali</Text>
          <Icon name="chevron-down" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.navigate('EventDetail', {eventId: '1'})}>
          <Icon name="information" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockMessages}
        renderItem={({item}) => <MessageBubble item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.messageList, {paddingBottom: TAB_BAR_HEIGHT}]}
        inverted
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mesaj yazın..."
            placeholderTextColor={COLORS.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              if (message.trim()) {
                setMessage('');
              }
            }}>
            <Icon name="send" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <ParticipantsModal />
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  infoButton: {
    marginLeft: 16,
  },
  messageList: {
    padding: 16,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  myMessage: {
    backgroundColor: COLORS.purple,
    borderBottomRightRadius: 4,
    marginLeft: 40,
  },
  otherMessage: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 4,
    marginRight: 40,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    opacity: 0.8,
  },
  messageText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.textSecondary,
    alignSelf: 'flex-end',
    marginTop: 4,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 12,
    color: COLORS.text,
    fontSize: 15,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    color: COLORS.text,
  },
  participantsList: {
    padding: 12,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  participantName: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
}); 