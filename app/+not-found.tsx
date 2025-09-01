import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

<<<<<<< HEAD
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
=======
import { Text, View } from '@/components/Themed';
>>>>>>> 4d22477 (Initial commit)

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
<<<<<<< HEAD
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
=======
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
>>>>>>> 4d22477 (Initial commit)
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
<<<<<<< HEAD
=======
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
>>>>>>> 4d22477 (Initial commit)
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
<<<<<<< HEAD
=======
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
>>>>>>> 4d22477 (Initial commit)
});
