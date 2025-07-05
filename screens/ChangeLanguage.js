import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next, { languageResources } from "../services/i18next"
import languagesList from "../services/languagesList.json"

export default function ChangeLanguage() {
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation()

    const changeLng = (lng)=> {
        i18next.changeLanguage(lng)
        setVisible(false)
    }


    return (
        <View style={styles.container}>
            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.languageList}>
                    <FlatList
                        data={Object.keys(languageResources)}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.languageButton} 
                            onPress={()=> changeLng(item)}
                            >
                                <Text style={styles.languageName}>{languagesList[item].nativeName}</Text>
                            </TouchableOpacity>
                        )}
                    />
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
        justifyContent: "center",
        alignItems: 'center',
    },
    button: {
        padding: 20,
        backgroundColor: "tomato",
        borderRadius:12,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    languageList: {
        padding:20,
    },
    languageButton:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderBottomWidth:2,
        borderColor:"#575353",
    },
    languageName:{
        fontSize:23,
        padding:20,
    },
    welcomeText:{
        fontSize:23,
        marginBottom:20,
    }
})