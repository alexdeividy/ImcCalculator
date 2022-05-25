import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props){

    const onShare = async () => {
        const result = await Share.share({
            message:"Meu IMC hoje e: " + props.ResultImc,
        })
    }

    return(
        <View style={styles.resultImc}>
            <Text style={styles.titleResultImc}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.ResultImc}</Text>
            <View style={styles.boxShareButton}>
                <TouchableOpacity 
                  onPress={onShare}
                  style={styles.shared}
                  >
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}