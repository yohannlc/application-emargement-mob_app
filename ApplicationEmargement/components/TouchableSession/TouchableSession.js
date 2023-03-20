import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function TouchableSession(props) {

    const session = props.session;
    
    return (
        <TouchableOpacity
            key={session.id}
            style={styles.session}
            onPress={() =>{ // si l'émargement est en cours, on ne peut pas changer de session
                !session.emargementEnCours && session.setsessionId(session.id);
                !session.emargementEnCours && session.setsession([session]);
                !session.emargementEnCours && session.setEmargementEnCours(true);
            }}
        >
            <View style={styles.top}>
                <Text style={styles.matiere}>{session.matiere}</Text>
                <Text style={styles.type}>{session.type}</Text>
                <Text style={styles.groupes}>
                    {session.groupes.slice(0, -1).join(",  ")}  
                    {session.groupes.length > 1 ? ",  " : ""}
                    {session.groupes.slice(-1)}
                </Text>
                {/* Ce code utilise slice() pour récupérer tous les éléments de session.salles, sauf le dernier (on l'ajoute plus tard), et les concatène avec ",  " en utilisant join().
                Ensuite, il vérifie si session.salles a plus d'un élément, et s'il en a, il ajoute ",  " pour séparer le dernier élément du reste.
                Enfin, il ajoute le dernier élément de session.salles à la fin de la chaîne de caractères.*/}
                
            </View>
            <View style={styles.bottom}>
                <View style={styles.gauche}>
                    <Text style={styles.heure}>{session.heureDebut} - {session.heureFin}</Text>
                </View>
                <View style={styles.droite}>
                    <Text style={styles.salles}>
                        {session.salles.slice(0, -1).join(", ")}
                        {session.salles.length > 1 ? ", " : ""}
                        {session.salles.slice(-1)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
   );
}

const fontSizeRef = 15;

const styles = StyleSheet.create({
    session: {
        width: "85%",
        backgroundColor: "rgba(29, 31, 49, 1)",
        borderRadius: 15,
        margin: 10,
        padding: 10,
        overflow: "hidden",
        flexDirection: "column",
        borderColor: "rgba(68, 68, 68, 0.72)",
        borderWidth: 1,
    },
    matiere: {
        fontSize: fontSizeRef + 5,
        color: "white",
        fontFamily: "Cabin-Bold",
        marginLeft: 4,
        marginTop: 0,
        marginBottom: 0,
    },
    type: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        fontFamily: "Cabin-Regular",
        marginLeft: 4,
        marginTop: 0,
        marginBottom: 5,
    },
    groupes: {
        fontSize: fontSizeRef + 0,
        color: "white",
        fontFamily: "Cabin-Bold",
        marginLeft: 4,
        marginTop: 5,
        marginBottom: 4,
    },
    heure: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        fontFamily: "Comfortaa-Regular",
        marginLeft: 4,
    },
    salles: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        textAlign: "right",
        width: "100%",
        fontFamily: "Cabin-Regular",
        marginLeft: 4,
    },
    top: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 5,
        
    },
    bottom: {
        flex: 1,
        flexDirection: "row",
    },
    droite: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    gauche: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
});