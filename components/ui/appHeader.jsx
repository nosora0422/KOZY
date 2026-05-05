import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function AppHeader({
  title,
  showBack = false,
  onBack,
  rightActions = [],
}) {
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* LEFT */}
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={onBack || (() => router.back())}
            style={styles.iconBtn}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        )}
      </View>

      {/* CENTER */}
      {title && 
        <View style={styles.center}>
            <AppText variant="body-lg" color="white">{title}</AppText> 
        </View>
      }

      {/* RIGHT */}
      <View style={styles.right}>
        {rightActions.map((action, index) => (
          <Pressable
            key={index}
            onPress={action.onPress}
            style={styles.iconBtn}
          >
            {action.icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      backgroundColor: "transparent", // match your design
    },
    left: {
      width: 60,
      alignItems: "flex-start",
    },
    center: {
      flex: 1,
      alignItems: "center",
    },
    right: {
      width: 120,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    iconBtn: {
      padding: 8,
      marginLeft: 8,
    },
  });