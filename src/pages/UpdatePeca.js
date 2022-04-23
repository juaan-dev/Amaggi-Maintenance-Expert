import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdatePeca = ({ navigation }) => {
  let [inputCodigo_SAP, setInputCodigo_SAP] = useState('');
  let [nome, setNome] = useState('');
  let [modelo, setModelo] = useState('');
  let [composicao, setComposicao] = useState('');
  let [referencia, setReferencia] = useState('');

  let updateAllPeca = (nome, modelo, composicao, referencia) => {
    setNome(nome);
    setModelo(modelo);
    setComposicao(composicao);
    setReferencia(referencia);
  };

  let searchPeca = () => {
    console.log(inputCodigo_SAP);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM peca where codigo_SAP = ?',
        [inputCodigo_SAP],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllPeca(
              res.nome,
              res.modelo,
              res.composicao,
              res.referencia,
            );
          } else {
            alert('Peça não encontrada!');
            updateAllPeca('', '', '','');
          }
        }
      );
    });
  };
  let updatePeca = () => {
    console.log(inputCodigo_SAP, nome, modelo, composicao, referencia);

    if (!inputCodigo_SAP) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!nome) {
      alert('Por favor informe o Nome !');
      return;
    }
    if (!modelo) {
      alert('Por Favor informe o Modelo !');
      return;
    }
    if (!composicao) {
      alert('Por Favor informe a Composição !');
      return;
    }
    if (!referencia) {
        alert('Por Favor informe a Referencia !');
        return;
      }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE peca set nome=?, modelo=? , composicao=?, referencia=? where codigo_SAP=?',
        [nome, modelo, composicao, referencia, inputCodigo_SAP ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Peça atualizada com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar a peça!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Insira Código SAP da peça"
                style={{ padding: 10 }}
                onChangeText={
                  (inputCodigo_SAP) => setInputCodigo_SAP(inputCodigo_SAP)
                }
              />
              <Mybutton
                title="Buscar Peça"
                customClick={searchPeca}
              />
              <Mytextinput
                placeholder="Insira o Nome"
                value={nome}
                style={{ padding: 10 }}
                onChangeText={
                  (nome) => setNome(nome)
                }
              />
            <Mytextinput
                placeholder="Insira o Modelo"
                value={modelo}
                style={{ padding: 10 }}
                onChangeText={
                  (modelo) => setModelo(modelo)
                }
              />
            <Mytextinput
                placeholder="Insira a Composição"
                value={composicao}
                style={{ padding: 10 }}
                onChangeText={
                  (composicao) => setComposicao(composicao)
                }
              />
              <Mytextinput
                value={referencia}
                placeholder="Insira a Referência"
                onChangeText={
                  (referencia) => setReferencia(referencia)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Atualizar Peça"
                customClick={updatePeca}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePeca;