import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  points: number;
  league: string;
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  date,
  time,
  points,
  league,
}: MatchCardProps) {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["#3a3a3a", "#1f1f1f"]}
        // Changed to black and gray gradient
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.leagueContainer}>
          <Text style={styles.leagueText}>{league}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>F</Text>
          <Text style={styles.pointsValue}>{points}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <View style={styles.teamInfo}>
            <Image source={{ uri: homeTeamLogo }} style={styles.teamLogo} />
            <Text style={styles.teamName}>{homeTeam}</Text>
          </View>
          <View style={styles.matchInfo}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>
          <View style={styles.teamInfo}>
            <Image source={{ uri: awayTeamLogo }} style={styles.teamLogo} />
            <Text style={styles.teamName}>{awayTeam}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.bottomContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={18} color="#FFF" />
              <Text style={styles.statText}>1.2K</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trophy-outline" size={18} color="#FFF" />
              <Text style={styles.statText}>$5K</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>JOIN GAME</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 32,
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    padding: 16,
    borderRadius: 15,
  },
  leagueContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  leagueText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: "#FFF",
    fontSize: 14,
    marginRight: 4,
    fontWeight: "bold",
  },
  pointsValue: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  teamInfo: {
    alignItems: "center",
    width: "35%",
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  teamName: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  matchInfo: {
    alignItems: "center",
  },
  dateText: {
    color: "#FFF",
    fontSize: 14,
    opacity: 0.8,
  },
  timeText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  vsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 5,
  },
  vsText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  statText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 5,
  },
  joinButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  joinButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
