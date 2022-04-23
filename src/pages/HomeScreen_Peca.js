import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen_Peca = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='peca'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS peca', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS peca(codigo_SAP INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(50), modelo VARCHAR(255), composicao VARCHAR(255), referencia VARCHAR(255) )',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View>
            <MyImageButton
              title="Adicionar Peça"
              btnColor='#2992C4'
              btnIcon="plus-circle"
              customClick={() => navigation.navigate('Register_Peça')}
            />

            <MyImageButton
              title="Atualizar Peça"
              btnColor='#0E7606'
              btnIcon="refresh"
              customClick={() => navigation.navigate('Update_Peça')}
            />
            <MyImageButton
              title="Excluir Peça"
              btnColor='#D1503A'
              btnIcon="trash"
              customClick={() => navigation.navigate('Delete_Peça')}
            />
        </View>
            <MyImageButton
              title="Visualizar Peça"
              btnColor='#F9AD29'
              btnIcon="puzzle-piece"
              customClick={() => navigation.navigate('ViewPeca')}
            />
            <MyImageButton
              title="Visualizar Peças em geral"
              btnColor='#384F62'
              btnIcon="gears"
              customClick={() => navigation.navigate('ViewAllPeca')}
            />

    </SafeAreaView>
  );
};



export default HomeScreen_Peca;