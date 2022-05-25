import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard,
    FlatList
    } from "react-native";
import styles from "./style";
import ResultImc from "./ResultImc";

export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [TextButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator(){
        let heightFormat = height.replace(",",".")
        let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2)
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc() {
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("campo obrigatorio*")
        }
    }

    function dismissKeyboard() {
        if(imc == null || imc != null){
            Keyboard.dismiss();
        }
    }

    function validationImc (){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC e: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        }
        else{
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }
    }

    return(
            <View style={styles.formContext}>

                {imc == null ?

        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.365"
                keyboardType="numeric"
                />

                <TouchableOpacity
                style={styles.buttonCalculator}
    
                onPress={ () =>{
                    dismissKeyboard()
                    validationImc()
                }}
                >
                    <Text style={styles.textButtonCalculator}>{TextButton}</Text>
                </TouchableOpacity>
        </Pressable>

                :

                <View style={styles.exibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} ResultImc={imc} />
                    <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={ () =>{
                    dismissKeyboard()
                    validationImc()}}
                >
                    <Text style={styles.textButtonCalculator}>{TextButton}</Text>
                </TouchableOpacity>
                </View>

            }
            <FlatList
            style={styles.listImcs}
            data={imcList.reverse()}
            renderItem={({item}) =>{
                return(
                    <Text style={styles.ResultImcItem}>
                        <Text style={styles.TextResultItemList}>Resultado IMC = </Text>
                        {item.imc}
                    </Text>
                     )
                    }}
                keyExtractor={item =>item.id}
            />

            </View>
    );
}