"use client"

import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const posts = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    time: "2 hours ago",
    content:
      "Just completed the Atlas Mountains trek! The views were absolutely breathtaking. Highly recommend Ahmed as a guide - he was fantastic! 🏔️",
    likes: 24,
    comments: 8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    liked: false,
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    time: "5 hours ago",
    content:
      "The Setti Fatma waterfalls were incredible today! Perfect weather for hiking. Met some amazing fellow travelers too. 💧",
    likes: 18,
    comments: 5,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    liked: true,
  },
  {
    id: 3,
    author: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    time: "1 day ago",
    content:
      "Cooking class with Fatima was amazing! Learned to make authentic tagine and mint tea. The aromas, the flavors... unforgettable experience! 🍲",
    likes: 31,
    comments: 12,
    liked: false,
  },
]

const trendingTopics = [
  { id: 1, name: "#AtlasMountains", posts: 156 },
  { id: 2, name: "#BerberCulture", posts: 89 },
  { id: 3, name: "#OurikaValley", posts: 234 },
  { id: 4, name: "#MoroccanFood", posts: 67 },
]

export default function CommunityScreen() {
  const [postsData, setPostsData] = useState(posts)

  const toggleLike = (postId: number) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId: number) => {
    Alert.alert("Comments", "Comment feature coming soon!")
  }

  const handleShare = (postId: number) => {
    Alert.alert("Share", "Share feature coming soon!")
  }

  const createPost = () => {
    Alert.alert("Create Post", "Create post feature coming soon!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.subtitle}>Share your adventures</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Trending Topics */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContainer}
          >
            {trendingTopics.map((topic) => (
              <TouchableOpacity key={topic.id} style={styles.trendingChip}>
                <Text style={styles.trendingText}>{topic.name}</Text>
                <Text style={styles.trendingCount}>{topic.posts} posts</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Posts */}
        <View style={styles.postsSection}>
          {postsData.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.authorAvatar} contentFit="cover" />
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <Text style={styles.postContent}>{post.content}</Text>

              {post.image && <Image source={{ uri: post.image }} style={styles.postImage} contentFit="cover" />}

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(post.id)}>
                  <Ionicons
                    name={post.liked ? "heart" : "heart-outline"}
                    size={20}
                    color={post.liked ? "#ef4444" : "#6b7280"}
                  />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
                  <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(post.id)}>
                  <Ionicons name="share-outline" size={20} color="#6b7280" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={createPost}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  trendingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  trendingContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  trendingChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0ea5e9",
    alignItems: "center",
  },
  trendingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0ea5e9",
    marginBottom: 2,
  },
  trendingCount: {
    fontSize: 12,
    color: "#6b7280",
  },
  postsSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
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
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  postTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#14b8a6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})
