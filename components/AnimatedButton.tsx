import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
}

export default function AnimatedButton({ label, onPress, color }: Props) {
  const scale = useSharedValue(1);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withTiming(0.96, { duration: 80 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.btn, anim, { backgroundColor: color || "#4A90E2" }]}
      >
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginVertical: 8,
    alignItems: "center",
    elevation: 3,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});