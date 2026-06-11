// components/layout/InputRow.jsx

import { View, StyleSheet } from "react-native";
import React from "react";

export default function InputRow({ children, isLast = false, style }) {
  return (

      <View style={[styles.row, isLast && styles.lastRow, style]}>
        {React.Children.map(children, (child) => (
          <View style={{ flex: 1 }}>{child}</View>
        ))}
      </View>

    
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 12,
  },
  lastRow: {
    marginBottom: 0,
  },
  
});
