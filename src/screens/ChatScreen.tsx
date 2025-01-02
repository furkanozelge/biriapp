import React from 'react';
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
};

type ChatData = {
  id: string;
  eventTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  participants: {
    count: number;
    avatars: string[];
  };
};

const mockChats: ChatData[] = [
  {
    id: '1',
    eventTitle: 'Türk Filmleri Festivali',
    lastMessage: 'Herkese merhaba, yarın görüşmek üzere!',
    timestamp: '14:30',
    unreadCount: 3,
    participants: {
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
    eventTitle: 'Türk Kahvesi Workshop',
    lastMessage: 'Kahve malzemelerini getirmeyi unutmayın',
    timestamp: 'Dün',
    unreadCount: 0,
    participants: {
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
    eventTitle: 'Networking Buluşması',
    lastMessage: 'Mekanı değiştirebilir miyiz?',
    timestamp: 'Paz',
    unreadCount: 1,
    participants: {
      count: 30,
      avatars: [
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8',
        'https://i.pravatar.cc/150?img=9',
      ],
    },
  },
];

export default function ChatScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const ChatCard = ({item}: {item: ChatData}) => {
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => navigation.navigate('ChatDetail', {chatId: item.id})}
      >
        <View style={styles.chatContent}>
          <View style={styles.avatarStack}>
            {item.participants.avatars.slice(0, 3).map((avatar, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.avatarContainer,
                  {marginLeft: idx > 0 ? -12 : 0}
                ]}
              >
                <Image
                  source={{uri: avatar}}
                  style={styles.avatar}
                />
              </View>
            ))}
          </View>
          
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.eventTitle}>{item.eventTitle}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            
            <View style={styles.messageRow}>
              <Text 
                style={styles.lastMessage}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockChats}
        renderItem={({item}) => <ChatCard item={item} />}
        keyExtractor={item => item.id}
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
  listContainer: {
    padding: 16,
  },
  chatCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.card,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
}); 