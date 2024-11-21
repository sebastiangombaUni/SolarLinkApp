import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Linking from 'expo-linking';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface ModalCameraProps {
  isVisible: boolean;
  onClose: () => void;
  onQRScanned: (data: string) => void;
}

export default function ModalCamera({ isVisible, onClose, onQRScanned }: ModalCameraProps) {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    if (!hasPermission?.granted) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);

    // Validar si el contenido es un enlace
    if (data.startsWith('http://') || data.startsWith('https://')) {
      Linking.openURL(data).catch(() =>
        Alert.alert('Error', 'No se pudo abrir el enlace.')
      );
    } else {
      Alert.alert('Código QR Escaneado', data);
    }

    onQRScanned(data);
    onClose(); // Cierra el modal después de escanear
  };

  if (!hasPermission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Necesitas activar los permisos de cámara</Text>
        <Button title="Activar Permisos" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          facing={cameraType}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} // Escaneo
        />
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Ionicons name="refresh-circle" size={50} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
          >
            <Ionicons name="camera-reverse" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Ionicons name="close-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro translúcido
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f1',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
});
