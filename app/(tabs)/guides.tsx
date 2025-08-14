import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const guides = [
  {
    id: 1,
    name: "Ahmed Benali",
    rating: 4.9,
    reviews: 127,
    languages: ["Arabic", "French", "English"],
    specialties: ["Mountain Trekking", "Cultural Tours"],
    price: "$45/day",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
    verified: true,
    responseTime: "~1 hour",
  },
  {
    id: 2,
    name: "Fatima Ouali",
    rating: 4.8,
    reviews: 89,
    languages: ["Arabic", "French"],
    specialties: ["Cooking Classes", "Village Tours"],
    price: "$40/day",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=face",
    verified: true,
    responseTime: "~30 min",
  },
  {
    id: 3,
    name: "Youssef Amrani",
    rating: 4.7,
    reviews: 156,
    languages: ["Arabic", "English", "Spanish"],
    specialties: ["Photography Tours", "Adventure Sports"],
    price: "$50/day",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",
    verified: false,
    responseTime: "~2 hours",
  },
]

export default function GuidesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Guides</Text>
        <Text style={styles.subtitle}>Connect with expert local guides</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/guide-login")}>
          <Ionicons name="person-outline" size={16} color="#ffffff" />
          <Text style={styles.loginButtonText}>Guide Login</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.guidesContainer}
      >
        {guides.map((guide) => (
          <TouchableOpacity key={guide.id} style={styles.guideCard}>
            <View style={styles.guideHeader}>
              <Image source={{ uri: guide.image }} style={styles.guideAvatar} contentFit="cover" />
              <View style={styles.guideInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.guideName}>{guide.name}</Text>
                  {guide.verified && <Ionicons name="checkmark-circle" size={20} color="#14b8a6" />}
                </View>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text style={styles.rating}>{guide.rating}</Text>
                  <Text style={styles.reviews}>({guide.reviews} reviews)</Text>
                </View>
                <View style={styles.responseRow}>
                  <Ionicons name="time-outline" size={14} color="#6b7280" />
                  <Text style={styles.responseTime}>Responds {guide.responseTime}</Text>
                </View>
                <Text style={styles.price}>{guide.price}</Text>
              </View>
            </View>

            <View style={styles.languagesSection}>
              <Text style={styles.sectionLabel}>Languages:</Text>
              <View style={styles.languagesList}>
                {guide.languages.map((language, index) => (
                  <View key={index} style={styles.languageChip}>
                    <Text style={styles.languageText}>{language}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.specialtiesSection}>
              <Text style={styles.sectionLabel}>Specialties:</Text>
              <View style={styles.specialtiesList}>
                {guide.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyChip}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookGuideButton}>
                <Text style={styles.bookGuideButtonText}>Book Guide</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#14b8a6",
    borderRadius: 8,
    gap: 6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  guidesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  guideCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guideHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  guideAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  guideInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  guideName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  reviews: {
    fontSize: 14,
    color: "#6b7280",
  },
  responseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  responseTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14b8a6",
  },
  languagesSection: {
    marginBottom: 12,
  },
  specialtiesSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  languagesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  languageText: {
    fontSize: 12,
    color: "#0ea5e9",
    fontWeight: "500",
  },
  specialtiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  specialtyText: {
    fontSize: 12,
    color: "#22c55e",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 6,
  },
  messageButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  bookGuideButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#14b8a6",
    alignItems: "center",
  },
  bookGuideButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
})
