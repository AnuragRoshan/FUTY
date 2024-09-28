import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface IconContainerProps {
  children: React.ReactNode;
  focused: boolean;
}

const IconContainer: React.FC<IconContainerProps> = ({ children, focused }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.1);
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(1);
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: "white", // Light chalk-like color with transparency
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <Animated.View style={backgroundStyle} />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.09,
    overflow: "hidden",
  },
});

export default IconContainer;
