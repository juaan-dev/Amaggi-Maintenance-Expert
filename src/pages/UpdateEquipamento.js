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

const UpdateEquipamento = ({ navigation }) => {
  let [inputnSerie, setInputnSerie] = useState('');
  let [nome, setNome] = useState('');
  let [modelo, setModelo] = useState('');
  let [composicao, setComposicao] = useState('');
  let [referencia, setReferencia] = useState('');

  let updateAllEquipamento = (nome, modelo, composicao, referencia) => {
    setNome(nome);
    setModelo(modelo);
    setComposicao(composicao);
    setReferencia(referencia);
  };

  let searchEquipamento = () => {
    console.log(inputnSerie);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM equipamento where nSerie = ?',
        [inputnSerie],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllEquipamento(
              res.nome,
              res.modelo,
              res.composicao,
              res.referencia,
            );
          } else {
            alert('Equipamento não encontrado!');
            updateAllEquipamento('', '', '','');
          }
        }
      );
    });
  };
  let updateEquipamento = () => {
    console.log(inputnSerie, nome, modelo, composicao, referencia);

    if (!inputnSerie) {
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
        'UPDATE equipamento set nome=?, modelo=? , composicao=?, referencia=? where nSerie=?',
        [nome, modelo, composicao, referencia, inputnSerie ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Equipamento atualizado com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar equipamento!');
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
                placeholder="Insira Código (Número de Série) do equipamento"
                style={{ padding: 10 }}
                onChangeText={
                  (inputnSerie) => setInputnSerie(inputnSerie)
                }
              />
              <Mybutton
                title="Buscar Peça"
                customClick={searchEquipamento}
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
                customClick={updateEquipamento}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateEquipamento;