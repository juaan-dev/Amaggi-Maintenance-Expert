import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mytext from './components/Mytext';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
const db = DatabaseConnection.getConnection();

const RegisterEquipamento = ({ navigation }) => {
  let [nome, setNome] = useState('');
  let [modelo, setModelo] = useState('');
  let [composicao, setComposicao] = useState('');
  let [referencia, setReferencia] = useState('');



  let register_equipamento = () => {
    console.log(nome, modelo, composicao, referencia);

    if (!nome) {
      alert('Por favor preencha com o nome !');
      return;
    }
    if (!modelo) {
      alert('Por favor preencha com o modelo');
      return;
    }
    if (!composicao) {
      alert('Por favor preencha com a composição !');
      return;
    }
    if (!referencia) {
        alert('Por favor preencha com a referência !');
        return;
      }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO equipamento (nome, modelo, composicao, referencia) VALUES (?,?,?,?)',
        [nome, modelo, composicao, referencia],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Equipamento Registrado com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar o Equipamento !!!');
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
                placeholder="Nome"
                onChangeText={
                  (nome) => setNome(nome)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Modelo"
                onChangeText={
                  (modelo) => setModelo(modelo)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Composição"
                onChangeText={
                  (composicao) => setComposicao(composicao)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />              
              <Mytextinput
                placeholder="Referência"
                onChangeText={
                  (referencia) => setReferencia(referencia)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Mybutton title="Salvar" customClick={register_equipamento} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterEquipamento;