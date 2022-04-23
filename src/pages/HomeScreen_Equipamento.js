import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen_Equipamento = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='equipamento'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS equipamento', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS equipamento(nSerie INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(50), modelo VARCHAR(255), composicao VARCHAR(255), referencia VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Adicionar Equipamento"
              btnColor='#2992C4'
              btnIcon="plus-circle"
              customClick={() => navigation.navigate('Register_Equipamento')}
            />

            <MyImageButton
              title="Atualizar Equipamento"
              btnColor='#0E7606'
              btnIcon="refresh"
              customClick={() => navigation.navigate('Update_Equipamento')}
            />
            <MyImageButton
              title="Excluir Equipamento"
              btnColor='#D1503A'
              btnIcon="trash"
              customClick={() => navigation.navigate('Delete_Equipamento')}
            />
            <MyImageButton
              title="Visualizar Equipamento"
              btnColor='#F9AD29'
              btnIcon="fire-extinguisher"
              customClick={() => navigation.navigate('ViewEquipamento')}
            />
            <MyImageButton
              title="Visualizar Equipamentos em geral"
              btnColor='#384F62'
              btnIcon="gears"
              customClick={() => navigation.navigate('ViewAllEquipamento')}
            />

          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen_Equipamento;