import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
export function LoginBackground({
}) {
  return (
    <>
    <View style={styles.topShape} />
    <View style={styles.bottomShape} />
    </>
  );
}

const styles = StyleSheet.create({
  topShape: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: colors.base.accent,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    
    bottomShape: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: colors.base.accent,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  })