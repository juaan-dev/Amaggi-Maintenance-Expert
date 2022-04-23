import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import menuNavigation from '../menuNavigation';
const menuEquipamento = require('../../assets/img/icons/equipamento.png');
const menuPeca = require('../../assets/img/icons/peca.png');
const logo = require('../../assets/logo.png');

export default function Modal({navigation}){

    return (  
			<View>
        <StatusBar 
          //hidden
          backgroundColor='#000'
        />
        <View style={{marginLeft:60,marginTop:'25%'}}>
            <Image source={logo} />
        </View>

        <View style={styles.menu}>

          <View style={styles.menuGrupo}>
            <View>
              <TouchableOpacity
                hitSlop={{right: 20, left:20}}
                underlayColor={'#ccc'}
                activeOpacity={0.4}
                onPress={() => navigation.navigate('HomeScreen_Peca')}
              >
                <View style={styles.box2}>
                  <Image style={styles.imgMenu} source={menuPeca}/>
                </View>
              </TouchableOpacity>
              <Text style={styles.font2}>
                PEÇAS
              </Text>
            </View>

            <View>
              <TouchableOpacity
                underlayColor={'#ccc'}
                activeOpacity={0.4}
                onPress={() => navigation.navigate('HomeScreen_Equipamento')}
              >
                <View style={styles.box3}>
                  <Image style={styles.imgMenu} source={menuEquipamento} />
                </View>
              </TouchableOpacity>
              <Text style={styles.font3}>
                EQUIPAMENTOS
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  menu: {
    alignItems: 'center'
  },
  font2: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign:'justify',
    position: 'relative',
    marginTop: 10,
    left: 10,
  },
  font3: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign:'justify',
    position: 'relative',
    marginTop: 10,
    left: 5,
  },
  menuGrupo: {
    flexDirection: 'row',
    marginTop: '30%'
  },
  imgMenu: {
    width: 65,
    height:65,
    position: 'absolute',
    right:10,
    marginTop: 6
  },
 box2: {
     width:   90,
     height: 90,
     backgroundColor: '#C0CCDA',
     marginRight:40,
     borderRadius: 20
 }, 
 box3:{
     width:   90,
     height: 90,
     backgroundColor: '#C0CCDA',
     borderRadius: 20
 }
});
