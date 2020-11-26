import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TextStyle, ViewStyle } from 'react-native';
import { Layout,  } from '@ui-kitten/components';

import { Screen } from '../../components';
import Header from '../../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { evaPallete } from '../../theme';

import Config from '../Config';

import { DataContext } from '../../contexts/data';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { monthBalanceTotal } from '../../utils/monthBalanceTotal';
import { parse } from 'react-native-svg';
import { now } from '../../utils/date';

const HEADER: ViewStyle = {
  flex: 0.8, 
  width: "100%",
  alignItems: "center"
}

const PROFILE = {
  width: 125,
  height: 125,
  marginVertical: 40,
  borderRadius: 100
}

const VALUES: ViewStyle = {
  width: "95%",
  flexDirection: "row",
  justifyContent: 'space-around'
}

const MAIN: ViewStyle = {
  flex: 1, 
  width: "95.4%",
  alignItems: "center",
}

const CENTRALIZER: ViewStyle = {
  alignItems: "center",
  backgroundColor: "transparent"
}

const OPEN_BUTTON: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "row",
  paddingVertical: "2.5%"
}

const VALUE: TextStyle = {
  padding: "5%",
  borderRadius: 100,
  fontSize: 16,
  fontWeight: "bold",
  elevation: 4,
  color: "#FFF"
}

const TEXT: TextStyle = {
  color: evaPallete["color-text-primary"],
  fontWeight: "bold",
  marginVertical: 2
}

const DESCRIPTION: TextStyle = {
  borderRadius: 100,
  fontSize: 17,
  color: "#000",
  flex: 1,
  paddingHorizontal: "2.5%"
}

interface Data {
  description: String
  value: Number|String
  type: String
}

const arrowRight = require("../../assets/arrows/arrow-right.png");

function handleTypeColor(type: string) {
  switch(type) {
    case 'Lucro': return evaPallete["green_value"]
    case 'Investimento': return evaPallete["yellow_value"]
    case 'Gasto': return evaPallete["red_value"]
  }
}

function handleTypeValue(type: string) {
  switch(type) {
    case 'Lucro': return '+'
    case 'Investimento': return '-'
    case 'Gasto': return '-'
  }
}

export default function Home() {
  const navigation = useNavigation();
  const { list, balanceData, updateBalanceData } = useContext(DataContext);

  useEffect(() => {
    if(!!balanceData) {
      const sumTotal = monthBalanceTotal(balanceData.updatedAt);
      const balanceTotal = parseFloat(balanceData.currentBalance) + parseFloat(balanceData.balanceTotal);

      !!sumTotal && updateBalanceData({ 
        ...balanceData, 
        balanceTotal,
        currentBalance: 0,
        updatedAt: now()
      });
    }
  }, []);

  return(
    <>
      { !balanceData 
        ? (
          <Config />
        ) 
        : (
          <Screen>
            <Layout style={HEADER}>
              <Header />
              <Image source={require('../../assets/background.png')} style={PROFILE}/>

              <Layout style={VALUES}>
                <Layout style={CENTRALIZER}>
                  <Text style={TEXT}>Saldo</Text>
                  <Text>{!!balanceData && `R$${parseFloat(balanceData.currentBalance).toFixed(2)}`}</Text>
                </Layout>

                <Layout style={CENTRALIZER}>
                  <Text style={TEXT}>Investido</Text>
                  <Text>{!!balanceData && `R$${parseFloat(balanceData.investment).toFixed(2)}`}</Text>
                </Layout>

                <Layout style={CENTRALIZER}>
                  <Text style={TEXT}>Saldo Total</Text>
                  <Text>{!!balanceData && `R$${parseFloat(balanceData.balanceTotal).toFixed(2)}`}</Text>
                </Layout>

              </Layout>
            </Layout>

            <Layout style={MAIN}>
              <ScrollView style={{ flex: 1, width: "100%", alignSelf: "center" }}>

                {!!list && list.map( (data: any) => (
                  <TouchableOpacity 
                    style={OPEN_BUTTON}
                    onPress={() => navigation.navigate("Info", data)}
                  >
                    <Text 
                      style={[
                        VALUE,
                        { backgroundColor: handleTypeColor(data.type) }
                      ]}
                    >
                      {`${handleTypeValue(data.type)} R$${parseFloat(data.value).toFixed(2)}`}
                    </Text>
                    <Text style={DESCRIPTION}>{data.description}</Text>
                    <Image source={arrowRight} style={{ width: 25, height: 25}}/>
                  </TouchableOpacity>
                ) )}
              </ScrollView>
            </Layout>
          </Screen>
        ) }
    </>
  )
}