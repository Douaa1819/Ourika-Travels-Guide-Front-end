import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useFavorites } from '@/hooks/useFavorites';
import type { Place } from '@/types/Place';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

export function PlaceCard({ place, onPress }: PlaceCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(place.id);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {place.name}
          </Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(place.id)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? Colors.error : Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{place.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color={Colors.warning} />
            <Text style={styles.rating}>{place.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h4,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  favoriteButton: {
    padding: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  category: {
    ...Typography.caption,
    color: Colors.primary,
    fontSize: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
