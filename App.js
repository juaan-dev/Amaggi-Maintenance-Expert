import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/pages/HomeScreen_Equipamento';
import RegisterUser from './src/pages/RegisterUser';
import UpdateUser from './src/pages/UpdateUser';
import ViewAllUser from './src/pages/ViewAllUser';
import DeleteUser from './src/pages/DeleteUser';
import HomeScreen_Equipamento from './src/pages/HomeScreen_Equipamento';
import HomeScreen_Peca from './src/pages/HomeScreen_Peca';
import Modal from './src/pages/HomeScreen';
import RegisterPeca from './src/pages/RegisterPeca';
import RegisterEquipamento from './src/pages/RegisterEquipamento';
import ViewEquipamento from './src/pages/ViewEquipamento';
import ViewPeca from './src/pages/ViewPeca';
import ViewAllEquipamento from './src/pages/ViewAllEquipamento';
import ViewAllPeca from './src/pages/ViewAllPeca';
import Login from './src/pages/Login';
import UpdateEquipamento from './src/pages/UpdateEquipamento';
import UpdatePeca from './src/pages/UpdatePeca';
import DeletePeca from './src/pages/DeletePeca';
import DeleteEquipamento from './src/pages/DeleteEquipamento';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen
          name="HomeScreen"
          component={Modal}
          options={{
            headerLeft: null,
            title: '',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />        
      <Stack.Screen
          name="HomeScreen_Equipamento"
          component={HomeScreen_Equipamento}
          options={{
            title: 'Seção de Equipamentos',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="HomeScreen_Peca"
          component={HomeScreen_Peca}
          options={{
            title: 'Seção de Peças',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register_Equipamento"
          component={RegisterEquipamento}
          options={{
            title: 'Cadastrar Equipamento',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register_Peça"
          component={RegisterPeca}
          options={{
            title: 'Cadastrar Peça',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update_Peça"
          component={UpdatePeca}
          options={{
            title: 'Atualizar Peças',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update_Equipamento"
          component={UpdateEquipamento}
          options={{
            title: 'Atualizar Equipamentos',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="ViewEquipamento"
          component={ViewEquipamento}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewPeca"
          component={ViewPeca}
          options={{
            title: 'Visualizar Peça',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAllPeca"
          component={ViewAllPeca}
          options={{
            title: 'Peças em Geral',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAllEquipamento"
          component={ViewAllEquipamento}
          options={{
            title: 'Equipamentos em Geral',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />        
        <Stack.Screen
          name="Delete_Equipamento"
          component={DeleteEquipamento}
          options={{
            title: 'Excluir Equipamentos',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
                <Stack.Screen
          name="Delete_Peça"
          component={DeletePeca}
          options={{
            title: 'Excluir Peças',
            headerStyle: {
              backgroundColor: '#C0CCDA',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;