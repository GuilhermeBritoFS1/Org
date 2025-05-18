import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";

const apps = [
  { name: "CRIAR TAREFA", icon: "📝", link: "homeOn/task_create" },
  { name: "TAREFAS EM ANDAMENTO", icon: "⏳", link: "homeOn/task_progress" },
  { name: "TAREFAS CONCLUÍDAS", icon: "✅", link: "homeOn/task_completed" },
  { name: "CADASTRO DE EQUIPES", icon: "👥", link: "homeOn/team_registration" },
  { name: "ATRIBUIÇÃO DE TAREFAS", icon: "📋", link: "homeOn/task_assignment" },
  { name: "RELATÓRIOS", icon: "📊", link: "homeOn/reports" },
  { name: "EQUIPES", icon: "🫂", link: "homeOn/teams" },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth < 400 ? 1 : 2;
  const horizontalPadding = 32;
  const spacing = 16;
  const itemSize =
    (screenWidth - horizontalPadding - spacing * (numColumns - 1)) / numColumns;

  const Header = () => (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>OrgaNize</Text>
      <Text style={styles.subtitle}>Organize seu dia do jeito mais nice!</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <FlatList
        data={apps}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        ListHeaderComponent={Header}
        contentContainerStyle={[styles.grid, { paddingBottom: 64 }]} // Garantir rolagem completa
        columnWrapperStyle={numColumns > 1 ? styles.row : null}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("Navegar para:", item.link)}
            style={[styles.item, { width: itemSize, height: itemSize }]}
          >
            <View style={styles.postitContainer}>
              <Image
                source={require("../../assets/images/postit2.png")}
                style={styles.postitImage}
                resizeMode="cover"
              />
              <View style={styles.postitContent}>
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.postitText}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBg: {
    backgroundColor: "#111827",
  },
  lightBg: {
    backgroundColor: "#fef3c7",
  },
  header: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#64748b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: {
    marginHorizontal: 4,
  },
  postitContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  postitImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    opacity: 0.9,
  },
  postitContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    fontSize: 36,
    marginBottom: 8,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  postitText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});
