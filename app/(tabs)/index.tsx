import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import MatchCard from "@/components/MatchCard";
import { dummyMatches } from "@/assets/const/dummyMatch";

const { width } = Dimensions.get("window");

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
}

const groupMatchesByDate = (matches: Match[]) => {
  return matches.reduce((acc: Record<string, Match[]>, match) => {
    if (!acc[match.date]) {
      acc[match.date] = [];
    }
    acc[match.date].push(match);
    return acc;
  }, {});
};

const formatDate = (dateString: string) => {
  const [month, day] = dateString.split(" ");
  const year = new Date().getFullYear();
  return `${day} ${month} ${year}`;
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Live" | "Completed">(
    "Upcoming"
  );

  const filteredMatches = dummyMatches.filter((match) => {
    if (activeTab === "Upcoming") return match.status === "upcoming";
    if (activeTab === "Live") return match.status === "live";
    if (activeTab === "Completed") return match.status === "completed";
    return true;
  });

  const groupedMatches = groupMatchesByDate(filteredMatches);

  const renderItem = ({ item }: { item: Match }) => (
    <MatchCard
      homeTeam={item.homeTeam}
      awayTeam={item.awayTeam}
      homeTeamLogo={item.homeTeamLogo}
      awayTeamLogo={item.awayTeamLogo}
      date={item.date}
      time={item.time}
      points={item.points}
      league={item.league}
    />
  );

  const renderSection = (date: string, matches: Match[]) => (
    <View key={date} style={styles.sectionContainer}>
      <View style={styles.dateContainer}>
        <View style={styles.dateBorder}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.buttonContainer}>
          {["Upcoming", "Live", "Completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.button, activeTab === tab && styles.activeButton]}
              onPress={() =>
                setActiveTab(tab as "Upcoming" | "Live" | "Completed")
              }
            >
              <View style={styles.buttonContent}>
                {tab === "Live" && <View style={styles.greenDot} />}
                <Text
                  style={[
                    styles.buttonText,
                    activeTab === tab && styles.activeButtonText,
                  ]}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {Object.keys(groupedMatches).map((date) =>
          renderSection(date, groupedMatches[date])
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 30,
    paddingHorizontal: 15,
    gap: 15,
    paddingBottom: 15,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "gray",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#363636",
    borderColor: "transparent",
  },
  buttonText: {
    color: "gray",
    fontSize: 16,
    paddingRight: 15,
    paddingLeft: 10,
  },
  activeButtonText: {
    color: "white",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#90EE90",
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  sectionContainer: {
    marginTop: 20,
  },
  dateContainer: {
    alignItems: "center",
    position: "relative",
    marginHorizontal: 15,
  },
  dateBorder: {
    borderWidth: 2,
    borderColor: "#363636",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
    backgroundColor: "black",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  horizontalLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#363636",
    zIndex: 0,
  },
});
