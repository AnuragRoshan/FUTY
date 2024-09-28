import React from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
import teams from "@/assets/const/teams";

const TeamCard = ({ team }) => {
  return (
    <LinearGradient
      colors={["#2c3e50", "#34495e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Image source={{ uri: team.strTeamBadge }} style={styles.badge} />
        <View style={styles.titleContainer}>
          <ThemedText style={styles.teamName}>{team.strTeam}</ThemedText>
          <ThemedText style={styles.founded}>
            Est. {team.intFormedYear}
          </ThemedText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="football-outline" size={20} color="#bdc3c7" />
          <ThemedText style={styles.infoText}>{team.strLeague}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color="#bdc3c7" />
          <ThemedText style={styles.infoText}>{team.strStadium}</ThemedText>
        </View>
      </View>

      <View style={styles.socialContainer}>
        <Ionicons name="globe-outline" size={24} color="#bdc3c7" />
        <Ionicons name="logo-facebook" size={24} color="#bdc3c7" />
        <Ionicons name="logo-twitter" size={24} color="#bdc3c7" />
        <Ionicons name="logo-instagram" size={24} color="#bdc3c7" />
      </View>
    </LinearGradient>
  );
};

const TeamList = () => {
  return (
    <ScrollView style={styles.scroll}>
      <ThemedText style={styles.heading}>Team List</ThemedText>
      <View>
        {teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "black",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ecf0f1",
    textAlign: "center",
    marginVertical: 16,
    marginTop: 16,
    paddingTop: 16,
  },
  card: {
    width: width - 32,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 4,
  },
  founded: {
    fontSize: 14,
    color: "#bdc3c7",
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ecf0f1",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(189, 195, 199, 0.3)",
    paddingTop: 16,
  },
});

export default TeamList;
