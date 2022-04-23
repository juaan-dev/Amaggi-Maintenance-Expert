import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteEquipamento = ({ navigation }) => {
  let [inputnSerie, setInputnSerie] = useState('');

  let deleteEquipamento = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  equipamento where nSerie=?',
        [inputnSerie],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Equipamento Excluído com Sucesso !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor entre com um código de equipamento válido !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entre com o Código do Equipamento"
            onChangeText={
              (inputnSerie) => setInputnSerie(inputnSerie)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Equipamento" customClick={deleteEquipamento} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteEquipamento;