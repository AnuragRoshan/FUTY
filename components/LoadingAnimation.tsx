import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const FOOTBALL_SIZE = width * 0.2;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LoadingAnimation: React.FC = () => {
  const ballRotation = useSharedValue(0);
  const ballScale = useSharedValue(1);
  const circleScale = useSharedValue(1);

  useEffect(() => {
    ballRotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );

    ballScale.value = withRepeat(
      withSequence(
        withTiming(1.2, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(1, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      ),
      -1,
      true
    );

    circleScale.value = withRepeat(
      withSequence(
        withTiming(1.2, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      ),
      -1,
      true
    );
  }, []);

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${ballRotation.value}deg` },
        { scale: ballScale.value },
      ],
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedSvg width={width} height={height} style={circleStyle}>
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={FOOTBALL_SIZE * 1.5}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="4"
        />
      </AnimatedSvg>
      <Animated.View style={[styles.football, ballStyle]}>
        <Svg width={FOOTBALL_SIZE} height={FOOTBALL_SIZE} viewBox="0 0 64 64">
          <Path
            d="M62.9 32c0 17.1-13.9 31-31 31S.9 49.1.9 32 14.8 1 31.9 1s31 13.9 31 31z"
            fill="#8B4513"
          />
          <Path
            d="M31.9 1C14.8 1 .9 14.9.9 32s13.9 31 31 31 31-13.9 31-31S49 1 31.9 1zm0 59.5C16.1 60.5 3.4 47.8 3.4 32S16.1 3.5 31.9 3.5 60.4 16.2 60.4 32 47.7 60.5 31.9 60.5z"
            fill="#5D4037"
          />
          <Path
            d="M31.9 3.5C16.1 3.5 3.4 16.2 3.4 32s12.7 28.5 28.5 28.5S60.4 47.8 60.4 32 47.7 3.5 31.9 3.5zm0 54.6C17.5 58.1 5.8 46.4 5.8 32S17.5 5.9 31.9 5.9 58 17.6 58 32 46.3 58.1 31.9 58.1z"
            fill="#4E342E"
          />
          <Path
            d="M31.9 5.9C17.5 5.9 5.8 17.6 5.8 32s11.7 26.1 26.1 26.1S58 46.4 58 32 46.3 5.9 31.9 5.9zm0 49.9C18.8 55.8 8.1 45.1 8.1 32S18.8 8.2 31.9 8.2 55.7 18.9 55.7 32 45 55.8 31.9 55.8z"
            fill="#3E2723"
          />
          <Path
            d="M10.4 32h43c0-11.9-9.6-21.5-21.5-21.5S10.4 20.1 10.4 32z"
            fill="#FFFFFF"
          />
          <Path
            d="M53.4 32h-43c0 11.9 9.6 21.5 21.5 21.5S53.4 43.9 53.4 32z"
            fill="#FFFFFF"
          />
          <Path
            d="M31.9 10.5v43"
            stroke="#5D4037"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <Path
            d="M10.4 32h43"
            fill="none"
            stroke="#5D4037"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  football: {
    position: "absolute",
  },
});

export default LoadingAnimation;
