import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import BoutonEmargement from "../BoutonEmargement/BoutonEmargement";
import ListeSessionsIntervenant from "../ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "../ListeEleves/ListeEleves";


/*
 * Emargement de l'intervenant
 * 
 * props:
 * - sessionId: id de la session en cours
 * - session: session en cours
 */
export default function EmargementIntervenant(props) {
    const [demarrerEmargement, setDemarrerEmargement] = useState(false);
    const [listeEleves, setListeEleves] = useState([]);

    // Gérer tout l'émargement ici
    function emargement() {
        setDemarrerEmargement(!demarrerEmargement);
    }

    useEffect(() => {
        fetchEtudiants(props.sessionId);
    }, []);

    async function fetchEtudiants(idSession) {
        let url = process.env.REACT_APP_API_URL+ "/v1.0/session/" + idSession + "/etudiants";
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setListeEleves(json);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return props.session ? (
        <View style={styles.emargementProf} >
            <View>
                <ListeSessionsIntervenant sessions={props.session}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} setDemarrerEmargement={setDemarrerEmargement} />
            </View>
            <ScrollView>
                <ListeEleves listeEleves={listeEleves}/>
            </ScrollView>
        </View>)
        :(
        <View>
            <Text style={styles.text}>Chargement...</Text>
            <ActivityIndicator size="large" color="#E20612" style={styles.spinner} />
        </View>
    );
}

const styles = StyleSheet.create({
    emargementProf: {
        flex: 1,
        flexDirection: "column",
        marginTop: '35%',
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontFamily:'Cabin-Bold'
    },
});