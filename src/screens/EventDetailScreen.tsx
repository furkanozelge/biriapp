import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

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

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

// Örnek etkinlik verisi
const mockEvent = {
  id: '1',
  title: 'Türk Filmleri Festivali',
  date: '15 Ocak 2024',
  time: '19:00',
  location: 'Kültür Merkezi',
  description: 'Türk sinemasının en seçkin örneklerinin gösterileceği festival, sinema severlerle buluşuyor. Gösterimler sonrası yönetmenlerle söyleşiler yapılacak.',
  category: 'Kültür & Sanat',
  categoryIcon: 'movie-open',
  image: 'https://picsum.photos/800/400',
  whatsappLink: 'https://chat.whatsapp.com/abc123',
  attendees: {
    count: 45,
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
  },
  isJoined: false,
  comments: [
    {id: '1', user: 'Ahmet Yılmaz', text: 'Harika bir etkinlik olacak!', time: '2 saat önce'},
    {id: '2', user: 'Ayşe Demir', text: 'Ben de katılmayı düşünüyorum.', time: '1 saat önce'},
  ],
};

export default function EventDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<EventDetailRouteProp>();
  const [comment, setComment] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {mockEvent.image && (
            <Image
              source={{uri: mockEvent.image}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{mockEvent.title}</Text>
            <View style={styles.categoryBadge}>
              <Icon name={mockEvent.categoryIcon} size={16} color={COLORS.text} />
              <Text style={styles.categoryText}>{mockEvent.category}</Text>
            </View>
            <View style={styles.attendeesRow}>
              <View style={styles.avatarGroup}>
                {mockEvent.attendees.avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    source={{ uri: avatar }}
                    style={[
                      styles.avatar,
                      { marginLeft: index > 0 ? -12 : 0 },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.attendeesCount}>+{mockEvent.attendees.count} katılımcı</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Icon name="calendar" size={20} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{mockEvent.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="clock-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{mockEvent.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="map-marker" size={20} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{mockEvent.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Açıklama</Text>
            <Text style={styles.description}>{mockEvent.description}</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.joinButton, 
              mockEvent.isJoined && styles.joinedButton
            ]}
          >
            <Icon 
              name={mockEvent.isJoined ? "check" : "account-plus"} 
              size={24} 
              color={COLORS.text} 
            />
            <Text style={styles.joinButtonText}>
              {mockEvent.isJoined ? 'Katılım İsteği Gönderildi' : 'Etkinliğe Katıl'}
            </Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yorumlar</Text>
            <View style={styles.commentsList}>
              {mockEvent.comments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{comment.user}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.commentInput}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Yorum yaz..."
            placeholderTextColor={COLORS.textSecondary}
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={24} color={COLORS.purple} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.purple,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 12,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  attendeesCount: {
    marginLeft: 8,
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: COLORS.text,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  description: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 24,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purple,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  joinedButton: {
    backgroundColor: COLORS.green,
  },
  joinButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  commentsList: {
    gap: 16,
  },
  commentItem: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentUser: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  commentText: {
    color: COLORS.text,
    fontSize: 14,
  },
  commentInput: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
}); 