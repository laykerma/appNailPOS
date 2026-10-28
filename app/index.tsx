import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePOS } from '../src/context/POSContext';
import { COLORS, FONTS } from '../src/theme';

export default function ClientListScreen() {
  const { clients, dispatch } = usePOS();

  const handleSelectClient = (client: any) => {
    dispatch({ type: 'SET_CURRENT_CLIENT', payload: client });
    router.push('/service-selection');
  };

  const handleNewClient = () => {
    dispatch({ type: 'SET_CURRENT_CLIENT', payload: null });
    dispatch({ type: 'CLEAR_TICKET' });
    router.push('/service-selection');
  };

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>L</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.salonName}>ElitePOS · [Salon name]</Text>
              <Text style={styles.screenTitle}>Linh's clients</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.newClientButton}
          activeOpacity={0.8}
          onPress={handleNewClient}
        >
          <Text style={styles.newClientText}>+ New client</Text>
        </TouchableOpacity>

        <View style={styles.sectionLabelContainer}>
          <Text style={styles.sectionLabel}>IN MY CHAIR · {clients.length}</Text>
        </View>

        {clients.map((client) => (
          <TouchableOpacity
            key={client.id}
            style={styles.clientCard}
            activeOpacity={0.7}
            onPress={() => handleSelectClient(client)}
          >
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientService}>{client.service}</Text>
              <Text style={styles.clientTime}>Started {client.startTime}</Text>
            </View>
            <Text style={styles.clientPrice}>${client.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBar: {
    backgroundColor: COLORS.headerDark,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.avatarBg,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  headerInfo: {
    marginLeft: 14,
  },
  salonName: {
    color: '#a8a8b3',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  screenTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  newClientButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  newClientText: {
    color: COLORS.white,
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
  sectionLabelContainer: {
    marginBottom: 12,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontFamily: FONTS.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  clientCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 17,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  clientService: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginTop: 4,
  },
  clientTime: {
    color: COLORS.textLight,
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginTop: 3,
  },
  clientPrice: {
    fontSize: 22,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginLeft: 12,
  },
});
