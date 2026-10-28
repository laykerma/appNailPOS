import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePOS } from '../src/context/POSContext';
import { COLORS, FONTS } from '../src/theme';

export default function TicketCheckoutScreen() {
  const { ticket, tip, currentClient, dispatch } = usePOS();

  const subtotal = ticket.reduce((sum, item) => sum + item.price, 0);
  const basePrice = subtotal > 0 ? subtotal : 45;
  const servicesList =
    ticket.length > 0
      ? ticket.map((item) => item.name).join(' · ')
      : 'Manicure · Nail art';

  const [selectedTip, setSelectedTip] = useState(tip || 0);

  useEffect(() => {
    setSelectedTip(tip || 0);
  }, [tip]);

  const handleTipSelect = (percent: number) => {
    setSelectedTip(percent);
    dispatch({ type: 'SET_TIP', payload: percent });
  };

  const tipAmount = Math.round(basePrice * (selectedTip / 100));
  const total = basePrice + tipAmount;

  const handlePayment = () => {
    router.push('/payment-success');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.editText}>‹ Edit ticket</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.withClient}>with {currentClient?.name || 'Linh'}</Text>
        <Text style={styles.totalAmount}>${total}</Text>
        <Text style={styles.servicesList}>{servicesList}</Text>

        {/* Tip Section */}
        <View style={styles.tipSection}>
          <Text style={styles.tipLabel}>Add a tip?</Text>
          <View style={styles.tipOptions}>
            {[
              { label: 'No tip', value: 0 },
              { label: '10%', value: 10 },
              { label: '15%', value: 15 },
              { label: '20%', value: 20 },
            ].map((option) => {
              const isActive = selectedTip === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.tipButton, isActive && styles.tipButtonActive]}
                  activeOpacity={0.7}
                  onPress={() => handleTipSelect(option.value)}
                >
                  <Text style={[styles.tipText, isActive && styles.tipTextActive]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Contactless Tap Card Area */}
        <TouchableOpacity
          style={styles.cardArea}
          activeOpacity={0.8}
          onPress={handlePayment}
        >
          {/* Contactless Wave Icon */}
          <View style={styles.contactlessIconContainer}>
            <View style={styles.iconCenter}>
              {/* Center Dot */}
              <View style={styles.waveDot} />
              {/* Arc 1 */}
              <View style={styles.waveArc1} />
              {/* Arc 2 */}
              <View style={styles.waveArc2} />
              {/* Arc 3 */}
              <View style={styles.waveArc3} />
            </View>
          </View>

          <Text style={styles.cardTitle}>Tap card or phone here</Text>
          <Text style={styles.cardSubtitle}>Hold near the top of the phone</Text>
        </TouchableOpacity>

        {/* Bottom Button */}
        <TouchableOpacity
          style={styles.cashButton}
          activeOpacity={0.7}
          onPress={handlePayment}
        >
          <Text style={styles.cashText}>Paid cash instead</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 8,
  },
  withClient: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 54,
    color: COLORS.text,
    fontFamily: FONTS.extraBold,
    letterSpacing: -1,
    marginBottom: 4,
  },
  servicesList: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    marginBottom: 20,
  },
  tipSection: {
    width: '100%',
    marginBottom: 16,
  },
  tipLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginBottom: 10,
    textAlign: 'center',
  },
  tipOptions: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  tipButton: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  tipTextActive: {
    color: COLORS.white,
  },
  cardArea: {
    flex: 1,
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  contactlessIconContainer: {
    width: 64,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCenter: {
    width: 56,
    height: 56,
    position: 'relative',
    transform: [{ rotate: '-10deg' }],
  },
  waveDot: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  waveArc1: {
    position: 'absolute',
    left: 4,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3.2,
    borderColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
  },
  waveArc2: {
    position: 'absolute',
    left: -5,
    bottom: -5,
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3.2,
    borderColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
  },
  waveArc3: {
    position: 'absolute',
    left: -14,
    bottom: -14,
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3.2,
    borderColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
  },
  cardTitle: {
    fontSize: 21,
    color: COLORS.primary,
    fontFamily: FONTS.extraBold,
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.primarySubtitle,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  cashButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cashText: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
});
