import React, { useState, useContext } from 'react';

import ConfigForm from './config.form';

import { Screen } from '../../components'
import { DataContext } from '../../contexts/data';
import { useNavigation } from '@react-navigation/native';
import { now } from '../../utils/date';

interface FormValues {
  currentBalance: Number|''
  investment: Number|''
  balanceTotal: Number|''
}

const Logon: React.FC = () => {
  const navigation = useNavigation();
  const [config] = useState<FormValues>({
    currentBalance: '',
    investment: '',
    balanceTotal: ''
  });
  const { updateBalanceData } = useContext(DataContext)

  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {   
    const data = {
      ...values,
      updatedAt: now()  
    }

    await updateBalanceData(data)

    setSubmitting(false)
    
    navigation.navigate("Home");
  }

  return (
    <Screen>
      <ConfigForm 
        initialValues={config} 
        onSubmit={onSubmit}
      />
    </Screen>
  );
}

export default Logon
