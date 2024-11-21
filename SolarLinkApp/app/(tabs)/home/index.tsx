import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Contenedor principal de la imagen */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/homeimage.png')}
          style={styles.fullScreenImage}
        />
        {/* Superposiciones sobre la imagen */}
        <View style={styles.overlayContainer}>
          <View style={[styles.line, styles.lineWindow]} />
          <ThemedText style={[styles.text, { top: '13%', left: '12%' }]}>0.7kW HOME</ThemedText>

          <View style={[styles.line, styles.lineSolar]} />
          <ThemedText style={[styles.text, { top: '13%', right: '12%' }]}>5.4kW SOLAR</ThemedText>

          <View style={[styles.line, styles.lineBattery]} />
          <ThemedText style={[styles.text, { bottom: '10%', left: '38%' }]}>0kW GRID</ThemedText>

          <View style={[styles.line, styles.lineGrid]} />
          <ThemedText style={[styles.text, { bottom: '10%', right: '15%' }]}>4.7kW</ThemedText>
          <ThemedText style={[styles.text, { bottom: '8%', right: '15%' }]}>98% BL</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1, // Permite que la imagen ocupe todo el espacio disponible
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Garantiza que la imagen no se recorte
  },
  overlayContainer: {
    position: 'absolute', // Superpone los elementos sobre la imagen
    width: '100%', // Coincide con el tamaño del contenedor
    height: '100%',
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
    height: '30%',
    top: '15%',
    left: '10%',
  },
  lineSolar: {
    height: '15%',
    top: '15%',
    right: '40%',
  },
  lineBattery: {
    height: '15%',
    bottom: '15%',
    left: '50%',
  },
  lineGrid: {
    height: '15%',
    bottom: '15%',
    right: '25%',
  },
});
