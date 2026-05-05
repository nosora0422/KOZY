import { Image, StyleSheet } from "react-native";

const sizeMap = {
  sm: { width: 120, height: 60 },
  md: { width: 200, height: 100 },
  lg: { width: 280, height: 140 },
};

export default function AppLogo(props) {
  const {
    size = "md",
    width,
    height,
    style,
  } = props;

  const dimensions = sizeMap[size] || sizeMap.md;

  return (
    <Image
      source={require("@/assets/images/Horizontal-logo.png")}
      resizeMode="contain"
      style={[
        styles.logo,
        dimensions,
        width && { width },
        height && { height },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
  },
});