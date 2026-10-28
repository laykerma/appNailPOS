import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePOS } from '../src/context/POSContext';
import { COLORS, FONTS } from '../src/theme';

export default function PaymentSuccessScreen() {
  const { ticket, tip, dispatch } = usePOS();

  const subtotal = ticket.reduce((sum, item) => sum + item.price, 0);
  const basePrice = subtotal > 0 ? subtotal : 45;
  const tipAmount = Math.round(basePrice * (tip / 100));
  const total = basePrice + tipAmount;

  const handleDone = () => {
    dispatch({ type: 'CLEAR_TICKET' });
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.paidTitle}>Paid ${total}</Text>
        <Text style={styles.paidSubtitle}>Card · Client</Text>

        <View style={styles.receiptSection}>
          <Text style={styles.receiptLabel}>Text a receipt (optional)</Text>
          <TextInput
            style={styles.receiptInput}
            placeholder="04xx xxx xxx"
            placeholderTextColor={COLORS.textLight}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.sendButton} activeOpacity={0.7}>
            <Text style={styles.sendText}>Send receipt</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.doneButton} activeOpacity={0.8} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
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
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 40,
    flex: 1,
  },
  checkCircle: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.checkCircleBg,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkMark: {
    fontSize: 42,
    color: COLORS.checkMarkGreen,
    fontFamily: FONTS.bold,
  },
  paidTitle: {
    fontSize: 38,
    color: COLORS.text,
    fontFamily: FONTS.extraBold,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  paidSubtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    marginBottom: 36,
  },
  receiptSection: {
    width: '100%',
  },
  receiptLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  receiptInput: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: 12,
  },
  sendButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  spacer: {
    flex: 1,
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: COLORS.white,
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
});
