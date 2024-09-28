import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { dummyMatches } from "@/assets/const/dummyMatch";
import moment from "moment"; // For easier date manipulation

const { width, height } = Dimensions.get("window");

interface SearchComponentProps {
  isExpanded: boolean;
  onClose: () => void;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  points: number;
  status: "upcoming" | "live" | "completed";
  league: string;
  homeTeamName: string;
  awayTeamName: string;
}

export default function SearchComponent({
  isExpanded,
  onClose,
}: SearchComponentProps) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Match[]>([]);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  // Function to get top 3 upcoming matches
  const getUpcomingMatches = () => {
    return dummyMatches
      .filter((match) => match.status === "upcoming") // Filter only upcoming matches
      .sort((a, b) => {
        // Sort by date and time
        const dateA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm");
        const dateB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm");
        return dateA.diff(dateB);
      })
      .slice(0, 3); // Take the top 3 upcoming matches
  };

  const upcomingMatches = getUpcomingMatches();

  useEffect(() => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        inputRef.current?.focus();
      });
    } else {
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
      setSearchText("");
      setSearchResults([]);
    }
  }, [isExpanded]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredMatches = dummyMatches.filter(
        (match) =>
          match.homeTeam.toLowerCase().includes(text.toLowerCase()) ||
          match.awayTeam.toLowerCase().includes(text.toLowerCase()) ||
          match.awayTeamName.toLowerCase().includes(text.toLowerCase()) ||
          match.homeTeamName.toLowerCase().includes(text.toLowerCase()) ||
          match.date.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredMatches);
    } else {
      setSearchResults([]);
    }
  };

  const renderMatchCard = ({ item }: { item: Match }) => (
    <View style={styles.matchCard}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: item.homeTeamLogo }} style={styles.teamLogo} />
        <Text style={styles.teamName}>{item.homeTeam}</Text>
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.dateTime}>{item.date}</Text>
        <Text style={styles.dateTime}>{item.time}</Text>
      </View>
      <View style={styles.teamContainer}>
        <Image source={{ uri: item.awayTeamLogo }} style={styles.teamLogo} />
        <Text style={styles.teamName}>{item.awayTeam}</Text>
      </View>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { width: animatedWidth, opacity: animatedOpacity },
      ]}
    >
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchArea}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={24}
              color="rgba(255,255,255,0.7)"
              style={styles.searchIcon}
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Search teams or dates..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchText}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {isExpanded && (
            <View style={styles.resultsContainer}>
              {searchText.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  renderItem={renderMatchCard}
                  ListEmptyComponent={
                    <Text style={styles.noResultsText}>No results found</Text>
                  }
                />
              ) : (
                <>
                  <Text style={styles.instructionText}>
                    Upcoming matches this week
                  </Text>
                  <FlatList
                    data={upcomingMatches}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMatchCard}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: height,
    backgroundColor: "rgba(0,0,0,2.8)",
    zIndex: 1000,
    borderBottomEndRadius: 20,
    paddingBottom: 20,
  },
  safeArea: {
    flex: 1,
  },
  searchArea: {
    flex: 1,
    backgroundColor: "#2C2C2E",
    margin: 16,
    marginTop: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "white",
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  matchCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
  },
  teamContainer: {
    alignItems: "center",
    width: "30%",
  },
  teamLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  teamName: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  matchInfo: {
    alignItems: "center",
  },
  dateTime: {
    color: "white",
    fontSize: 12,
  },
  noResultsText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  instructionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
