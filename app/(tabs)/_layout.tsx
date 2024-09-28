// TabLayout.tsx
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Tabs } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TopBar from "@/components/TopBar";
import SideMenu from "@/components/SideMenu";
import TabBarIcon from "@/components/TabBarIcon";
import IconContainer from "@/components/IconContainer";

const { width, height } = Dimensions.get("window");

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateX = useSharedValue(0);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newIsOpen = !prev;
      translateX.value = withTiming(newIsOpen ? -width * 0.7 : 0, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      return newIsOpen;
    });
  };

  const animatedMainStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={toggleMenu} />
      <Animated.View style={[styles.mainContent, animatedMainStyle]}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarInactiveTintColor: "gray",
            tabBarStyle: styles.tabBar,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Matches",
              tabBarLabel: "Matches",
              tabBarIcon: ({ color, focused }) => (
                <IconContainer focused={focused}>
                  <TabBarIcon
                    name={focused ? "football" : "football-outline"}
                    color={focused ? "black" : "white"}
                    size={focused ? width * 0.08 : width * 0.07}
                    focused={focused}
                  />
                </IconContainer>
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <IconContainer focused={focused}>
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={focused ? "black" : "white"}
                    size={focused ? width * 0.08 : width * 0.07}
                    focused={focused}
                  />
                </IconContainer>
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <IconContainer focused={focused}>
                  <TabBarIcon
                    name={focused ? "heart" : "heart-outline"}
                    color={focused ? "black" : "white"}
                    size={focused ? width * 0.08 : width * 0.07}
                    focused={focused}
                  />
                </IconContainer>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <IconContainer focused={focused}>
                  <TabBarIcon
                    name={focused ? "person" : "person-outline"}
                    color={focused ? "black" : "white"}
                    size={focused ? width * 0.08 : width * 0.07}
                    focused={focused}
                  />
                </IconContainer>
              ),
            }}
          />
        </Tabs>
      </Animated.View>
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  tabBar: {
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "black",
    height: height * 0.1,
  },
});

export default TabLayout;
