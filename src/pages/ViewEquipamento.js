import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import { FlatList } from 'react-native-gesture-handler';

const db = DatabaseConnection.getConnection();

const ViewEquipamento = () => {
  let [inputnSerie, setInputnSerie] = useState('');
  let [userData, setUserData] = useState({});

  let searchEquipamento = () => {
    console.log(inputnSerie);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM equipamento where nSerie = ?',
        [inputnSerie],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Equipamento não encontrado !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Pesquisar por Equipamento" />
          <Mytextinput
            placeholder="Número de Série do referido equipamento"
            onChangeText={
              (inputnSerie) => setInputnSerie(inputnSerie)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Equipamento" customClick={searchEquipamento} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>

            <View style={{ backgroundColor: '#EEE', borderWidth:0.5 ,borderColor:'#2E619E' ,marginTop: 20, padding: 30, borderRadius: 10 }}>
            <Text style={{marginTop:15, color:'#2E619E'}}>Código : {userData.nSerie}</Text>
            <Text style={{marginTop:15, color:'#2E619E'}}>Nome : {userData.nome}</Text>
            <Text style={{marginTop:15, color:'#2E619E'}}>Modelo : {userData.modelo}</Text>
            <Text style={{marginTop:15, color:'#2E619E'}}>Composição : {userData.composicao}</Text>
            <Text style={{marginTop:15, color:'#2E619E'}}>Referência : {userData.referencia}</Text>
            </View>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default ViewEquipamento;