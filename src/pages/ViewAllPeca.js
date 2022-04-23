import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllPeca = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM peca',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.codigo_SAP}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}
        >
        <Text style={styles.textheader}>Código SAP</Text>
        <Text style={styles.textbottom}>{item.codigo_SAP}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.nome}</Text>

        <Text style={styles.textheader}>Modelo</Text>
        <Text style={styles.textbottom}>{item.modelo}</Text>

        <Text style={styles.textheader}>Composição</Text>
        <Text style={styles.textbottom}>{item.composicao}</Text>
        
        <Text style={styles.textheader}>Referência</Text>
        <Text style={styles.textbottom}>{item.referencia}</Text>


      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#529C4D' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: 'blue',
    fontSize: 12,
    fontWeight: '700',
    marginTop:10
  },
  textbottom: {
    color: '#111',
    fontSize: 20,
    marginTop:5,
    textAlign: 'justify'
  },
});

export default ViewAllPeca;