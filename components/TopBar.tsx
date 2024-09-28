import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchComponent from "@/components/Search";

const { width, height } = Dimensions.get("window");

interface TopBarProps {
  onMenuPress: () => void;
}

export default function TopBar({ onMenuPress }: TopBarProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // New state to control the search component visibility
  const [searchWidth] = useState(new Animated.Value(0));

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    Animated.timing(searchWidth, {
      toValue: isSearchExpanded ? 0 : width * 0.35,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const openSearchComponent = () => {
    setIsSearchOpen(true); // Show the search component
  };

  const closeSearchComponent = () => {
    setIsSearchOpen(false); // Hide the search component
  };

  return (
    <View>
      <View style={styles.topBar}>
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle" size={width * 0.12} color="white" />
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsTextLeft}>F</Text>
            <Text style={styles.pointsText}>500</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={openSearchComponent}
            style={styles.searchButton}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <Animated.View
            style={[styles.searchInputContainer, { width: searchWidth }]}
          >
            {isSearchExpanded && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            )}
          </Animated.View>
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditionally render the SearchComponent */}
      {isSearchOpen && (
        <SearchComponent
          isExpanded={isSearchOpen}
          onClose={closeSearchComponent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: height * 0.14,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.05,
    borderBottomWidth: 4,
    borderBottomColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsContainer: {
    borderRadius: 50,
    borderColor: "orange",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pointsText: {
    color: "orange",
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  pointsTextLeft: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    padding: width * 0.02,
    marginRight: width * 0.02,
  },
  menuButton: {
    padding: width * 0.02,
  },
  searchInputContainer: {
    overflow: "hidden",
  },
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
    fontSize: 16,
  },
});
