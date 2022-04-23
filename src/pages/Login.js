import React, { useState, useEffect } from 'react'
import {Alert, View, StyleSheet, Image, ImageBackground, TouchableOpacity,Text} from "react-native"
import SQLite from 'react-native-sqlite-storage'
import { DatabaseConnection } from '../database/database-connection'
import { Button } from 'react-native-web'
import TextInput from 'react-native-textinput-with-icons'

const db = DatabaseConnection.getConnection();
const Login = ({navigation}) =>{
    const [id, setId] = useState(null);
    const [senha, setSenha] = useState(null);
    let [inputId, setInputId] = useState('');
    let [inputSenha, setInputSenha] = useState('');

    useEffect(() =>{
        createTable();
        getData();
    }, []);

    const createTable = () =>{
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +"Embarcacao"
                +"(Id TEXT PRIMARY KEY , Senha TEXT)"
            )
        })
    }
    const getData =  () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.navigate('Home');
                    }
                })
                 db.transaction( async(tx) => {
                     tx.executeSql(
                    "SELECT Id, Senha FROM Embarcacao",
                    [],
                     (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            navigation.navigate('Home');
                        }
                            
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }
    const setData = () => {
        var inID = inputId;
        if(inputId!= '21853826' || inputSenha!='12345678'){
            alert('Dados incorretos!');
        }else {
            try {
                // var user = {
                //     Name: name,
                //     Age: age
                // }
                // await AsyncStorage.setItem('UserData', JSON.stringify(user));
                 db.transaction(async (tx) => {
                    // await tx.executeSql(
                    //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
                    // );
                     tx.executeSql(
                        "INSERT INTO Embarcacao (Id, Senha) VALUES ('21853826','12345678')",
                        [id, senha]
                    );
                })
                navigation.navigate('HomeScreen');
            } catch (error) {
                console.log(error);
            }
        }
    }



    return(
        <View style={styles.container}>
            <React.Fragment>
                <Image source={require('../../assets/img_login/screenlogin.png')} style={styles.backgroundImage}/>
                <Image source={require('../../assets/img_login/screenlogin.png')} style={{ position: 'absolute', opacity: 0.6}} />
            </React.Fragment>
            <View style={styles.box}>
                <Image
                    source={require('../../assets/img/logo.png')}
                    style={styles.logo}
                />
                <TextInput
                    style={styles.input}
                    leftIcon="ship"
                    leftIconType="awesome"
                    
                    //leftIcon={{ type: 'font-awesome', name: 'ship'}}
                    label='     ID embarcação'
                    onChangeText={(inputId) => setInputId(inputId)}
                
                    />

                <TextInput
                    style={styles.input}
                    leftIcon="lock"
                    leftIconType="awesome"
                    secureTextEntry={true}
                    onChangeText={(inputSenha) => setInputSenha(inputSenha)}
                    label='     Senha'
                
                />

                <TouchableOpacity
                    style={styles.botao} 
                    onPress={ setData }
                >
                    <Text style={styles.botaoText}>Entrar</Text>
                </TouchableOpacity>

            </View>
        </View>
       
      
    )}


const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    container:  {
 
    },
    logo:   {
        
    },
    box: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingVertical: 50,
        alignItems:'center',
        borderRadius: 20
    },

    input:  {
        marginTop: 10,
        marginLeft:50,
        flex: 1,
        fontSize:12,
        fontWeight: 'bold',
        //fontFamily:
        //borderRadius: 3,
        //borderWidth: 2
        borderColor: "gray",
        
    },
    botao:  {
        width: 250,
        height: 52,
        backgroundColor: '#3498db',
        marginTop: 30,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoText:  {
        fontSize:  16,
        fontWeight: 'bold',
        color: '#fff'
    },
    container:  {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchIcon: {
        padding: 10,
    }
/*
    imgBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    }
    */
})

export default Login;