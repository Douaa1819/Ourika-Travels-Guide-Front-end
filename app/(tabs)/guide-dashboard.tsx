import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const dashboardItems = [
  {
    id: 1,
    title: 'Mes réservations',
    description: 'Gérer vos réservations clients',
    icon: '📅',
  },
  {
    id: 2,
    title: 'Mon solde',
    description: 'Consulter vos gains',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Mon profil',
    description: 'Modifier vos informations',
    icon: '👤',
  },
  {
    id: 4,
    title: 'Communauté',
    description: 'Échanger avec les autres guides',
    icon: '👥',
  },
];

export default function GuideDashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Welcome Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Bienvenue, Guide !</Text>
            <Text style={styles.subtitle}>Gérez votre activité depuis votre dashboard</Text>
          </View>

          {/* Dashboard Grid */}
          <View style={styles.grid}>
            {dashboardItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.dashboardCard}>
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Statistiques rapides</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Réservations ce mois</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Note moyenne</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  dashboardCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  cardIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
});
