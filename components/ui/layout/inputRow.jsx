// components/layout/InputRow.jsx

import { View, StyleSheet,Text } from "react-native";
import React from "react";
import { colors } from '@/constants/colors';

export default function InputRow({ children, columns = 3, title }) {
  return (

      <View style={styles.row}>
        {React.Children.map(children, (child) => (
          <View style={{ flex: 1 }}>{child}</View>
        ))}
      </View>

    
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
  
});
