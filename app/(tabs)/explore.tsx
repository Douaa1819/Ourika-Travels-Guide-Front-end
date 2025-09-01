import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const places = [
  {
    id: 1,
    name: 'Cascades de Setti Fatma',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Sept cascades magnifiques',
  },
  {
    id: 2,
    name: 'Coopérative Féminine',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Artisanat traditionnel berbère',
  },
  {
    id: 3,
    name: 'Marché de Tnine Ourika',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Marché traditionnel du lundi',
  },
  {
    id: 4,
    name: 'Village de Setti Fatma',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Village berbère authentique',
  },
  {
    id: 5,
    name: 'Jardins Bio-Aromatiques',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Plantes médicinales et aromatiques',
  },
  {
    id: 6,
    name: 'Pont de l\'Ourika',
    image: '/placeholder.svg?height=200&width=300',
    description: 'Point de vue panoramique',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un lieu..."
            placeholderTextColor="#999999"
          />
        </View>

        {/* Places List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.placesGrid}>
            {places.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.placeCard}
                onPress={() => router.push({
                  pathname: '/place-details',
                  params: { 
                    id: place.id,
                    name: place.name,
                    description: place.description,
                    image: place.image
                  }
                })}
              >
                <Image
                  source={{ uri: place.image }}
                  style={styles.placeImage}
                  resizeMode="cover"
                />
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeDescription}>{place.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchContainer: {
    marginVertical: 20,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  placesGrid: {
    gap: 16,
    paddingBottom: 20,
  },
  placeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    // Remplacer les propriétés shadow* par boxShadow pour le web
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }),
  },
  placeImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  placeInfo: {
    padding: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
