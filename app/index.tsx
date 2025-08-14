"use client"

import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const { width } = Dimensions.get("window")

const categories = [
  { id: 1, name: "Mountains", icon: "mountain-outline" },
  { id: 2, name: "Waterfalls", icon: "water-outline" },
  { id: 3, name: "Forests", icon: "leaf-outline" },
  { id: 4, name: "Photography", icon: "camera-outline" },
]

const featuredPlaces = [
  {
    id: 1,
    name: "Atlas Mountains Day Trek",
    location: "High Atlas, Morocco",
    duration: "8 hours",
    rating: 4.9,
    reviews: 87,
    price: "$65",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    badge: "Popular",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Setti Fatma Waterfalls",
    location: "Ourika Valley, Morocco",
    duration: "4 hours",
    rating: 4.7,
    reviews: 124,
    price: "$45",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    badge: "Featured",
    isFavorite: true,
  },
]

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
    }
  }

  const toggleFavorite = async (placeId: number) => {
    try {
      const newFavorites = favorites.includes(placeId)
        ? favorites.filter((id) => id !== placeId)
        : [...favorites, placeId]

      setFavorites(newFavorites)
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error saving favorites:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Home</Text>
            <Text style={styles.discoverText}>Discover</Text>
            <Text style={styles.brandText}>Ourika Travels</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
              }}
              style={styles.avatar}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search treks, guides, locations..."
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#14b8a6" />
          <Text style={styles.locationText}>Ourika Valley, Morocco</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={24} color="#6b7280" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#14b8a6" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Featured Places */}
        <View style={styles.featuredContainer}>
          {featuredPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.placeCard}
              onPress={() =>
                router.push({
                  pathname: "/place-details",
                  params: {
                    id: place.id,
                    name: place.name,
                    location: place.location,
                    duration: place.duration,
                    rating: place.rating,
                    reviews: place.reviews,
                    price: place.price,
                    image: place.image,
                  },
                })
              }
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: place.image }} style={styles.placeImage} contentFit="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.3)"]} style={styles.imageGradient} />
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{place.badge}</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(place.id)}>
                  <Ionicons
                    name={favorites.includes(place.id) ? "heart" : "heart-outline"}
                    size={20}
                    color={favorites.includes(place.id) ? "#ef4444" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.placeInfo}>
                <Text style={styles.placeLocation}>{place.location}</Text>
                <Text style={styles.placeName}>{place.name}</Text>

                <View style={styles.placeDetails}>
                  <View style={styles.durationContainer}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.duration}>{place.duration}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.rating}>{place.rating}</Text>
                    <Text style={styles.reviews}>({place.reviews})</Text>
                  </View>
                  <Text style={styles.price}>{place.price}</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 4,
  },
  discoverText: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 2,
  },
  brandText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    color: "#6b7280",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
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
  featuredContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  placeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
  },
  placeImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  placeInfo: {
    padding: 16,
  },
  placeLocation: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  placeDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    fontSize: 14,
    color: "#6b7280",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14b8a6",
  },
})
