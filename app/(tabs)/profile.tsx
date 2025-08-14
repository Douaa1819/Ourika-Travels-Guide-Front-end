import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const profileStats = [
  { label: "Places Visited", value: "12" },
  { label: "Reviews", value: "8" },
  { label: "Photos", value: "24" },
]

const menuItems = [
  { id: 1, title: "My Bookings", icon: "calendar-outline", screen: null },
  { id: 2, title: "Saved Places", icon: "heart-outline", screen: null },
  { id: 3, title: "My Reviews", icon: "star-outline", screen: null },
  { id: 4, title: "Travel Preferences", icon: "settings-outline", screen: null },
  { id: 5, title: "Offline Maps", icon: "map-outline", screen: null },
  { id: 6, title: "Help & Support", icon: "help-circle-outline", screen: null },
  { id: 7, title: "About", icon: "information-circle-outline", screen: null },
]

export default function ProfileScreen() {
  const handleMenuPress = (item: (typeof menuItems)[0]) => {
    Alert.alert(item.title, "Feature coming soon!")
  }

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Handle sign out logic here
          Alert.alert("Signed Out", "You have been signed out successfully")
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",
            }}
            style={styles.profileImage}
            contentFit="cover"
          />
          <Text style={styles.profileName}>John Traveler</Text>
          <Text style={styles.profileEmail}>john.traveler@email.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#14b8a6" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color="#6b7280" />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Guide Section */}
        <View style={styles.guideSection}>
          <View style={styles.guideSectionHeader}>
            <Ionicons name="star-outline" size={24} color="#14b8a6" />
            <Text style={styles.guideSectionTitle}>Become a Guide</Text>
          </View>
          <Text style={styles.guideSectionText}>
            Share your local knowledge and earn money by guiding travelers through the beautiful Ourika Valley
          </Text>
          <TouchableOpacity style={styles.guideButton} onPress={() => router.push("/guide-login")}>
            <Text style={styles.guideButtonText}>Apply as Guide</Text>
            <Ionicons name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#14b8a6",
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: "#14b8a6",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: "#f9fafb",
    marginHorizontal: 20,
    borderRadius: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  guideSection: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#f0f9ff",
    borderRadius: 16,
    marginBottom: 30,
  },
  guideSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  guideSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  guideSectionText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  guideButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14b8a6",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  guideButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "500",
  },
})
