"use client"

import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image } from "expo-image"
import * as Location from "expo-location"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function PlaceDetailsScreen() {
  const params = useLocalSearchParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null)

  const { id, name, location, duration, rating, reviews, price, image } = params

  useEffect(() => {
    checkFavoriteStatus()
    getCurrentLocation()
  }, [])

  const checkFavoriteStatus = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites")
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites)
        setIsFavorite(favorites.includes(Number.parseInt(id as string)))
      }
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission denied", "Permission to access location was denied")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setUserLocation(location)
    } catch (error) {
      console.error("Error getting location:", error)
    }
  }

  const toggleFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites")
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      const placeId = Number.parseInt(id as string)

      const newFavorites = favorites.includes(placeId)
        ? favorites.filter((favId: number) => favId !== placeId)
        : [...favorites, placeId]

      setIsFavorite(!isFavorite)
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  const openMaps = () => {
    // Coordonnées approximatives de la vallée de l'Ourika
    const latitude = 31.326
    const longitude = -7.7956

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    Linking.openURL(url)
  }

  const sharePlace = async () => {
    try {
      // Simulation du partage
      Alert.alert("Share", `Check out ${name} in ${location}!`)
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={sharePlace}>
              <Ionicons name="share-outline" size={24} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#ef4444" : "#111827"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Image */}
        <Image source={{ uri: image as string }} style={styles.heroImage} contentFit="cover" />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.title}>{name}</Text>

            <View style={styles.detailsRow}>
              <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <Text style={styles.duration}>{duration}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text style={styles.rating}>{rating}</Text>
                <Text style={styles.reviewsText}>({reviews} reviews)</Text>
              </View>
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this experience</Text>
            <Text style={styles.description}>
              Discover the breathtaking beauty of the Atlas Mountains with this unforgettable day trek. Experience
              traditional Berber culture, stunning mountain vistas, and pristine natural landscapes.
              {"\n\n"}
              This guided tour includes transportation, traditional lunch, and expert local guidance. Perfect for
              adventure seekers and nature lovers looking to explore Morocco's most spectacular mountain region.
              {"\n\n"}
              What's included: • Professional mountain guide • Traditional Berber lunch • Transportation from meeting
              point • All safety equipment • Small group experience (max 8 people)
            </Text>
          </View>

          {/* What to expect */}
          <View style={styles.expectSection}>
            <Text style={styles.sectionTitle}>What to expect</Text>
            <View style={styles.expectItem}>
              <Ionicons name="walk-outline" size={20} color="#14b8a6" />
              <Text style={styles.expectText}>Moderate hiking difficulty</Text>
            </View>
            <View style={styles.expectItem}>
              <Ionicons name="camera-outline" size={20} color="#14b8a6" />
              <Text style={styles.expectText}>Spectacular mountain views</Text>
            </View>
            <View style={styles.expectItem}>
              <Ionicons name="restaurant-outline" size={20} color="#14b8a6" />
              <Text style={styles.expectText}>Traditional Berber cuisine</Text>
            </View>
            <View style={styles.expectItem}>
              <Ionicons name="images-outline" size={20} color="#14b8a6" />
              <Text style={styles.expectText}>Perfect photo opportunities</Text>
            </View>
          </View>

          {/* Reviews Preview */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                  }}
                  style={styles.reviewAvatar}
                  contentFit="cover"
                />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>Sarah M.</Text>
                  <Text style={styles.reviewDate}>2 days ago</Text>
                </View>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Ionicons name="star" size={16} color="#fbbf24" />
                </View>
              </View>
              <Text style={styles.reviewText}>
                Amazing experience! The guide was knowledgeable and the views were absolutely stunning. Highly recommend
                for anyone visiting the area.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>From</Text>
          <Text style={styles.bottomPrice}>{price}</Text>
          <Text style={styles.priceSubtext}>per person</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.routeButton} onPress={openMaps}>
            <Ionicons name="navigate-outline" size={16} color="#6b7280" />
            <Text style={styles.routeButtonText}>Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  heroImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  location: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  detailsRow: {
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
  reviewsText: {
    fontSize: 14,
    color: "#6b7280",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14b8a6",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  expectSection: {
    marginBottom: 24,
  },
  expectItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  expectText: {
    fontSize: 16,
    color: "#6b7280",
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewItem: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  reviewDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceContainer: {
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#14b8a6",
  },
  priceSubtext: {
    fontSize: 12,
    color: "#9ca3af",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  routeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 6,
  },
  routeButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#14b8a6",
  },
  bookButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
})
