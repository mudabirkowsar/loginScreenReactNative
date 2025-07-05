import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next'; // ✅ Import hook

const { height } = Dimensions.get('window');

export default function FrontPage() {
  const { t } = useTranslation(); // ✅ Use hook

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.glassCard}>
        {/* ✅ Translate using t("key") */}
        <Text style={styles.title}>{t("frontpage.title")}</Text>
        <Text style={styles.subtitle}>{t("frontpage.subtitle")}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  glassCard: {
    width: '85%',
    padding: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    ...(Platform.OS === 'ios' && {
      backdropFilter: 'blur(10px)',
    }),
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
});
