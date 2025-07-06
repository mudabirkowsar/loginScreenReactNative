import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next, { languageResources } from "../services/i18next"
import languagesList from "../services/languagesList.json"
import { Ionicons } from '@expo/vector-icons' 

export default function ChangeLanguage() {
  const [visible, setVisible] = useState(false)
  const { t, i18n } = useTranslation()

  const changeLng = (lng) => {
    i18next.changeLanguage(lng)
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageListContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{t("change-language")}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={28} color="#555" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={Object.keys(languageResources)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const selected = i18n.language === item
                return (
                  <TouchableOpacity
                    style={[styles.languageButton, selected && styles.selectedLanguageButton]}
                    onPress={() => changeLng(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.languageName, selected && styles.selectedLanguageName]}>
                      {languagesList[item].nativeName}
                    </Text>
                    {selected && <Ionicons name="checkmark" size={24} color="#ff6347" />}
                  </TouchableOpacity>
                )
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>

      <Text style={styles.welcomeText}>{t("welcome")}</Text>
      <Text style={styles.welcomeText}>{t("name-text")}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t("change-language")}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "#ff6347",
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
    textAlign:"center"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  languageListContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: '70%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },

  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 15,
  },

  selectedLanguageButton: {
    backgroundColor: '#ffe6e1',
  },

  languageName: {
    fontSize: 20,
    color: '#444',
  },

  selectedLanguageName: {
    color: '#ff6347',
    fontWeight: '700',
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
})
