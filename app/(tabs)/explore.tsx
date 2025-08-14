"use client"

import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const categories = ["All", "Mountains", "Waterfalls", "Forests", "Villages", "Markets"]

const places = [
  {
    id: 1,
    name: "Atlas Mountains Day Trek",
    location: "High Atlas, Morocco",
    duration: "8 hours",
    rating: 4.9,
    reviews: 87,
    price: "$65",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "Mountains",
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
    category: "Waterfalls",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Berber Village Tour",
    location: "Setti Fatma, Morocco",
    duration: "6 hours",
    rating: 4.8,
    reviews: 56,
    price: "$55",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    category: "Villages",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Ourika Market Experience",
    location: "Tnine Ourika, Morocco",
    duration: "3 hours",
    rating: 4.6,
    reviews: 89,
    price: "$35",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Markets",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Cedar Forest Hike",
    location: "Middle Atlas, Morocco",
    duration: "5 hours",
    rating: 4.5,
    reviews: 43,
    price: "$50",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    category: "Forests",
    isFavorite: true,
  },
]

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
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

  const filteredPlaces = places.filter((place) => {
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.subtitle}>Discover amazing places</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === category && styles.categoryChipTextActive]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Places List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.placesContainer}
      >
        {filteredPlaces.map((place) => (
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
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryChipActive: {
    backgroundColor: "#14b8a6",
    borderColor: "#14b8a6",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  placesContainer: {
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
