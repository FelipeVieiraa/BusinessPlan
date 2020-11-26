import React, { useContext, useState } from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import { Layout,  } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../components';
import Header from '../../components/Header';

import { DataContext } from '../../contexts/data';

import { evaPallete } from '../../theme/pallete';
import { delay } from '../../utils/delay';

const HEADER: ViewStyle = {
  flex: 0.8, 
  width: "100%",
  alignItems: "center",
  backgroundColor: "#FFF",
}

const PROFILE: ViewStyle = {
  width: "100%",
  height: 125,
  marginVertical: 40,
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center"
}

const TITLE: TextStyle = {
  fontSize: 28,
  fontWeight: "bold",
  color: evaPallete["color-text-primary"]
}

const TEXT: TextStyle = {
  fontSize: 17,
  color: "#000",
  marginTop: 18
}

const TEXT2: TextStyle = {
  fontSize: 17,
  color: "#000",
  marginTop: 8
}

const MAIN: ViewStyle = {
  flex: 1, 
  width: "100%",
  alignItems: "center",
  backgroundColor: "transparent",
}

interface FormValues {
  type: String
  values: Number
  description: String
}

const Home: React.FC = (navigator) => {
  const { params } = navigator.route;

  function handleTypeValue(type: string) {
    switch(type) {
      case 'Lucro': return '+'
      case 'Investimento': return '-'
      case 'Gasto': return '-'
    }
  }

  function result(type: string, balance: any, value: any) {
    switch(type) {
      case 'Lucro': {
        return (parseFloat(params.balance) + parseFloat(params.value)).toFixed(2)
      }
      case 'Investimento': {
        return (parseFloat(params.balance) - parseFloat(params.value)).toFixed(2)
      }
      case 'Gasto': {
        return (parseFloat(params.balance) - parseFloat(params.value)).toFixed(2)
      }
    }
  }

  return(
  <Screen>
    <Layout style={HEADER}>
      <Header />

      <Layout style={PROFILE}>
        <Text style={TITLE}>{params.description}</Text>

        <Text style={TEXT}>{`R$${parseFloat(params.balance).toFixed(2)} ${handleTypeValue(params.type)} R$ ${parseFloat(params.value).toFixed(2)}`}</Text>
        <Text style={TEXT2}>{`R$ ${result(params.type, params.balance, params.value)}`}</Text>
      </Layout>

    </Layout>

    <Layout style={[MAIN]}>
    </Layout>
  </Screen>
  )
}

export default Home;