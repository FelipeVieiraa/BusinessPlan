import React, { useContext, useState } from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import { Layout,  } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import RegisterForm from './register.form';
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

const MAIN: ViewStyle = {
  flex: 1, 
  width: "100%",
  alignItems: "center",
  backgroundColor: "transparent",
}

interface FormValues {
  type: String
  values: Number|''
  description: String
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { createData, balanceData } = useContext<any>(DataContext);
  const [register] = useState({
    type: '',
    value: '',
    description: ''
  })

  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setSubmitting(true)

    delay(1000).then(() => {
      const data = {
        ...values,
        balance: balanceData.currentBalance
      }
      createData(data)
      navigation.navigate("Home");
    })
  }

  return(
  <Screen>
    <Layout style={HEADER}>
      <Header />

      <Layout style={PROFILE}>
        <Text style={TITLE}>Registrar ações</Text>
      </Layout>

    </Layout>

    <Layout style={[MAIN]}>
      <RegisterForm initialValues={register} onSubmit={onSubmit}/>
    </Layout>
  </Screen>
  )
}

export default Home;