import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePOS } from '../src/context/POSContext';
import { ServiceItem } from '../src/context/posReducer';
import { COLORS, FONTS } from '../src/theme';

const SERVICES: ServiceItem[] = [
  { id: 1, name: 'Manicure', price: 35 },
  { id: 2, name: 'Gel mani', price: 55 },
  { id: 3, name: 'Pedicure', price: 45 },
  { id: 4, name: 'Spa pedicure', price: 65 },
  { id: 5, name: 'SNS full set', price: 65 },
  { id: 6, name: 'Acrylic set', price: 70 },
  { id: 7, name: 'Refill', price: 50 },
  { id: 8, name: 'Removal', price: 15 },
  { id: 9, name: 'Nail art', price: 10 },
  { id: 10, name: 'French tip', price: 10 },
  { id: 11, name: 'Gel upgrade', price: 15 },
  { id: 12, name: 'Repair', price: 5 },
];

export default function ServiceSelectionScreen() {
  const { ticket, dispatch, currentClient } = usePOS();
  const [clientName, setClientName] = useState(currentClient?.name || '');

  const subtotal = ticket.reduce((sum, item) => sum + item.price, 0);

  const handleAddService = (service: ServiceItem) => {
    dispatch({ type: 'ADD_SERVICE', payload: service });
  };

  const handleRemoveItem = (index: number) => {
    dispatch({ type: 'REMOVE_SERVICE', payload: index });
  };

  const handleCharge = () => {
    if (ticket.length > 0) {
      if (clientName.trim()) {
        dispatch({
          type: 'SET_CURRENT_CLIENT',
          payload: {
            id: currentClient?.id || Date.now(),
            name: clientName.trim(),
            service: ticket.map((i) => i.name).join(' · '),
            price: subtotal,
            startTime: currentClient?.startTime || 'Now',
            status: 'active',
          },
        });
      }
      router.push('/ticket-checkout');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Client name (optional)"
          placeholderTextColor={COLORS.textLight}
          value={clientName}
          onChangeText={setClientName}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* "Tap to add" Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tap to add</Text>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => handleAddService(service)}
              >
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.otherPriceButton} activeOpacity={0.7}>
            <Text style={styles.otherPriceText}>+ Other price</Text>
          </TouchableOpacity>
        </View>

        {/* "On this ticket" Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>On this ticket</Text>

          {ticket.length === 0 ? (
            <Text style={styles.emptyTicketText}>Nothing added yet.</Text>
          ) : (
            ticket.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.ticketItem}>
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketName}>{item.name}</Text>
                  <Text style={styles.ticketPrice}>${item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(index)}
                >
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chargeButton,
            ticket.length === 0 ? styles.chargeButtonDisabled : styles.chargeButtonActive,
          ]}
          activeOpacity={ticket.length === 0 ? 1 : 0.8}
          onPress={handleCharge}
        >
          <Text
            style={[
              styles.chargeText,
              ticket.length === 0 ? styles.chargeTextDisabled : styles.chargeTextActive,
            ]}
          >
            Charge ${subtotal}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backChevron: {
    fontSize: 26,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginTop: -2,
    marginLeft: -1,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '48.5%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  serviceName: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: 'left',
  },
  servicePrice: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginTop: 4,
    textAlign: 'left',
  },
  otherPriceButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.borderDashed,
    borderStyle: 'dashed',
    marginTop: 10,
    width: '100%',
  },
  otherPriceText: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  emptyTicketText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    marginTop: 2,
  },
  ticketItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketName: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.semiBold,
  },
  ticketPrice: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 20,
    color: COLORS.textLight,
    fontFamily: FONTS.regular,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    width: 96,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  chargeButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chargeButtonDisabled: {
    backgroundColor: COLORS.disabledBg,
  },
  chargeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  chargeText: {
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
  chargeTextDisabled: {
    color: COLORS.disabledText,
  },
  chargeTextActive: {
    color: COLORS.white,
  },
});
