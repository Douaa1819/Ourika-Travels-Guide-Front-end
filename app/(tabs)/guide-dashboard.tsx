import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const dashboardStats = [
  { label: "This Month", value: "12", subtitle: "Bookings", icon: "calendar-outline", color: "#14b8a6" },
  { label: "Total Earned", value: "$1,240", subtitle: "Revenue", icon: "wallet-outline", color: "#22c55e" },
  { label: "Rating", value: "4.9", subtitle: "127 reviews", icon: "star-outline", color: "#f59e0b" },
]

const dashboardItems = [
  {
    id: 1,
    title: "My Bookings",
    description: "Manage your upcoming tours",
    icon: "calendar-outline",
    color: "#f0f9ff",
    borderColor: "#0ea5e9",
    iconColor: "#0ea5e9",
  },
  {
    id: 2,
    title: "My Earnings",
    description: "View payments and balance",
    icon: "wallet-outline",
    color: "#f0fdf4",
    borderColor: "#22c55e",
    iconColor: "#22c55e",
  },
  {
    id: 3,
    title: "My Profile",
    description: "Update your information",
    icon: "person-outline",
    color: "#fef3c7",
    borderColor: "#f59e0b",
    iconColor: "#f59e0b",
  },
  {
    id: 4,
    title: "Community",
    description: "Connect with other guides",
    icon: "people-outline",
    color: "#fce7f3",
    borderColor: "#ec4899",
    iconColor: "#ec4899",
  },
]

const recentBookings = [
  {
    id: 1,
    client: "Sarah Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    tour: "Atlas Mountains Trek",
    date: "Tomorrow, 8:00 AM",
    status: "confirmed",
    price: "$65",
  },
  {
    id: 2,
    client: "Mike Chen",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    tour: "Berber Village Tour",
    date: "Dec 15, 10:00 AM",
    status: "pending",
    price: "$55",
  },
]

export default function GuideDashboardScreen() {
  const handleCardPress = (item: (typeof dashboardItems)[0]) => {
    Alert.alert(item.title, "Feature coming soon!")
  }

  const handleBookingPress = (booking: (typeof recentBookings)[0]) => {
    Alert.alert("Booking Details", `${booking.tour} with ${booking.client}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guide Dashboard</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome back, Ahmed!</Text>
            <Text style={styles.welcomeSubtext}>Here's your activity overview</Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
            }}
            style={styles.guideAvatar}
            contentFit="cover"
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {dashboardStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
            </View>
          ))}
        </View>

        {/* Dashboard Grid */}
        <View style={styles.gridContainer}>
          {dashboardItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.dashboardCard, { backgroundColor: item.color, borderColor: item.borderColor }]}
              onPress={() => handleCardPress(item)}
            >
              <Ionicons name={item.icon as any} size={32} color={item.iconColor} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Bookings */}
        <View style={styles.bookingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity>
              <View style={styles.seeAllContainer}>
                <Text style={styles.seeAllText}>See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#14b8a6" />
              </View>
            </TouchableOpacity>
          </View>

          {recentBookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard} onPress={() => handleBookingPress(booking)}>
              <Image source={{ uri: booking.clientAvatar }} style={styles.clientAvatar} contentFit="cover" />
              <View style={styles.bookingInfo}>
                <Text style={styles.clientName}>{booking.client}</Text>
                <Text style={styles.tourName}>{booking.tour}</Text>
                <View style={styles.bookingMeta}>
                  <Ionicons name="time-outline" size={14} color="#9ca3af" />
                  <Text style={styles.bookingDate}>{booking.date}</Text>
                </View>
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingPrice}>{booking.price}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    booking.status === "confirmed" ? styles.confirmedBadge : styles.pendingBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      booking.status === "confirmed" ? styles.confirmedText : styles.pendingText,
                    ]}
                  >
                    {booking.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: "#6b7280",
  },
  guideAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: "#9ca3af",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  dashboardCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },
  bookingsSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: "#14b8a6",
    fontWeight: "500",
  },
  bookingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  tourName: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  bookingMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bookingDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  bookingRight: {
    alignItems: "flex-end",
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14b8a6",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedBadge: {
    backgroundColor: "#dcfce7",
  },
  pendingBadge: {
    backgroundColor: "#fef3c7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  confirmedText: {
    color: "#16a34a",
  },
  pendingText: {
    color: "#d97706",
  },
})
