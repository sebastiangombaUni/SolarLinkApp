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
        <View style={[styles.line, styles.lineWindow]} />
        <ThemedText style={[styles.text, { top: '10%', left: '10%' }]}>0.7kW HOME</ThemedText>
        
        <View style={[styles.line, styles.lineSolar]} />
        <ThemedText style={[styles.text, { top: '10%', right: '25%' }]}>5.4kW SOLAR</ThemedText>
        
        <View style={[styles.line, styles.lineBattery]} />
        <ThemedText style={[styles.text, { bottom: '6%', left: '40%' }]}>0kW GRID</ThemedText>
        
        <View style={[styles.line, styles.lineGrid]} />
        <ThemedText style={[styles.text, { bottom: '6%', right: '20%' }]}>4.7kW</ThemedText>
        <ThemedText style={[styles.text, { bottom: '4%', right: '20%' }]}>98% BL</ThemedText>
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
  line: {
    position: 'absolute',
    width: 2,
    backgroundColor: 'gray',
  },
  lineWindow: {
    height: 190,
    top: '3%',
    left: '9%',
    transform: [{ translateY: 50 }],
 
    
  },
  lineSolar: {
    height: 120,
    top: '3%',
    right: '46%',
    transform: [{ translateY: 50 }],
  },
  lineBattery: {

    height: 180,
    bottom: '-2%',
    right: '32%',
    transform: [{ translateY: -50 }],
  },
  lineGrid: {
    height: 130,
    bottom: '-1%',
    left: '39%',
    transform: [{ translateY: -50 }],
  },
});
