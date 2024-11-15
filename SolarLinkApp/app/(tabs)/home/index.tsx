import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/homeimage.png')}
        style={styles.fullScreenImage}
      />
      <View style={styles.overlayContainer}>
        <ThemedText style={[styles.text, { top: '10%', left: '15%' }]}>0.7kW HOME</ThemedText>
        <ThemedText style={[styles.text, { top: '10%', right: '15%' }]}>5.4kW SOLAR</ThemedText>
        <ThemedText style={[styles.text, { bottom: '10%', left: '15%' }]}>0kW GRID</ThemedText>
        <ThemedText style={[styles.text, { bottom: '10%', right: '15%' }]}>4.7kW 98% BATTERY LEVEL</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    flex: 1,
    width: '85%',
    height: '75%',
    position: 'absolute',
    resizeMode: 'cover',
    marginHorizontal: '-7.5%', 
    marginVertical: '15%',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    position: 'absolute',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
