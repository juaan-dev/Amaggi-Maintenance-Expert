import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeletePeca = ({ navigation }) => {
  let [inputCodigo_SAP, setInputCodigo_SAP] = useState('');

  let deletePeca = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  peca where codigo_SAP=?',
        [inputCodigo_SAP],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Peça Excluída com Sucesso !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor entre com um código de peça válido !');
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
            placeholder="Entre com o Código da Peça"
            onChangeText={
              (inputCodigo_SAP) => setInputCodigo_SAP(inputCodigo_SAP)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Peça" customClick={deletePeca} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeletePeca;