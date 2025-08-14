"use client"

import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const initialNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your Atlas Mountains trek with Ahmed is confirmed for tomorrow at 8:00 AM",
    time: "2 hours ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    type: "like",
    title: "New Like",
    message: "Sarah liked your photo from Setti Fatma waterfalls",
    time: "4 hours ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 3,
    type: "comment",
    title: "New Comment",
    message: 'Mike commented on your Atlas Mountains post: "Amazing photos!"',
    time: "6 hours ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 4,
    type: "weather",
    title: "Weather Update",
    message: "Perfect weather conditions for your upcoming trek tomorrow",
    time: "8 hours ago",
    read: true,
    avatar: null,
  },
  {
    id: 5,
    type: "guide",
    title: "Guide Message",
    message: "Fatima sent you a message about the cooking class schedule",
    time: "1 day ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "booking":
      return "calendar-outline"
    case "like":
      return "heart-outline"
    case "comment":
      return "chatbubble-outline"
    case "weather":
      return "partly-sunny-outline"
    case "guide":
      return "people-outline"
    default:
      return "notifications-outline"
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "booking":
      return "#14b8a6"
    case "like":
      return "#ef4444"
    case "comment":
      return "#3b82f6"
    case "weather":
      return "#f59e0b"
    case "guide":
      return "#8b5cf6"
    default:
      return "#6b7280"
  }
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && <Text style={styles.unreadCount}>{unreadCount} unread</Text>}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsContainer}
      >
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[styles.notificationCard, !notification.read && styles.unreadCard]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.notificationContent}>
              <View style={styles.iconContainer}>
                {notification.avatar ? (
                  <Image source={{ uri: notification.avatar }} style={styles.avatar} contentFit="cover" />
                ) : (
                  <View
                    style={[
                      styles.typeIconContainer,
                      { backgroundColor: `${getNotificationColor(notification.type)}20` },
                    ]}
                  >
                    <Ionicons
                      name={getNotificationIcon(notification.type) as any}
                      size={20}
                      color={getNotificationColor(notification.type)}
                    />
                  </View>
                )}
              </View>

              <View style={styles.textContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>

              {!notification.read && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty state if no notifications */}
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyMessage}>You'll see updates about your bookings and activities here</Text>
          </View>
        )}
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  unreadCount: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  markAllText: {
    fontSize: 14,
    color: "#14b8a6",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  notificationsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  notificationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  unreadCard: {
    backgroundColor: "#f0f9ff",
    borderColor: "#bae6fd",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  typeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#14b8a6",
    marginLeft: 8,
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
})
