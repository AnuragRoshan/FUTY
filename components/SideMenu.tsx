import React, { useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";

const { width, height } = Dimensions.get("window");

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define props for the MenuItem component
interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="white" style={styles.menuIcon} />
    <ThemedText style={styles.menuLabel}>{label}</ThemedText>
  </TouchableOpacity>
);

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : width, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.sideMenu, animatedStyle]}>
      <LinearGradient
        colors={["#000000", "#2c3e50"]} // Adjusted gradient colors
        style={styles.gradient}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://example.com/profile-pic.jpg" }}
            style={styles.profilePic}
          />
          <ThemedText style={styles.profileName}>Anurag Roshan</ThemedText>
          <ThemedText style={styles.profileEmail}>
            anuragraushan373@gmail.com
          </ThemedText>
        </View>

        <View style={styles.menuItems}>
          <MenuItem icon="home-outline" label="Home" onPress={() => {}} />
          <MenuItem icon="person-outline" label="Profile" onPress={() => {}} />
          <MenuItem
            icon="settings-outline"
            label="Settings"
            onPress={() => {}}
          />
          <MenuItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => {}}
          />
          <MenuItem
            icon="information-circle-outline"
            label="About"
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="white"
            style={styles.logoutIcon}
          />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sideMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "black", // Ensure the background remains black
  },
  gradient: {
    flex: 1,
    padding: width * 0.05,
  },
  closeButton: {
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
    zIndex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  menuItems: {
    marginTop: height * 0.05,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    color: "white",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.05,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default SideMenu;
