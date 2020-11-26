import React, { ReactNode, createContext, useState, useEffect } from 'react';
import Storage from '@react-native-async-storage/async-storage';

interface Context {
  list?: Array<object>|null
  createData?: any
  balanceData?: Array<object>|null
  updateBalanceData?: any
}

interface Data {
  type: String
  value: any
  description: String
  balance: Number
}

interface BalanceData {
  currentBalance: Number
  investment: Number
  balanceTotal: Number
  updatedAt: any
}

interface PropsProvider {
  children: ReactNode
}

export const DataContext = createContext<Context>({});

export default function DataProvider({children}: PropsProvider) {

  const [list, setList] = useState<any>(null);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const data = await Storage.getItem("Data");
      const balance = await Storage.getItem("BalanceData");

      if(data) {
        setList(JSON.parse(data));
      }
      if(balance) {
        setBalanceData(JSON.parse(balance));
      }
      setLoading(false)
    }

    loadStorage();
  }, [])

  async function storageNewData(data: any) {
    await Storage.setItem('Data', JSON.stringify(data));
  }

  async function createData(data: Data) {
    const storageData = await Storage.getItem("Data");

    if(data.type == 'Gasto'){
        const currentBalance = parseFloat(balanceData.currentBalance) - parseFloat(data.value);
        setBalanceData({ ...balanceData, currentBalance });
        storageNewBalanceData({ ...balanceData, currentBalance });
    } else if(data.type == 'Investimento') {
        const currentBalance = parseFloat(balanceData.currentBalance) - parseFloat(data.value);
        const investment = parseFloat(balanceData.investment) + parseFloat(data.value);

        setBalanceData({ ...balanceData, currentBalance, investment });
        storageNewBalanceData({ ...balanceData, currentBalance, investment });
    }else {
        const currentBalance = parseFloat(balanceData.currentBalance) + parseFloat(data.value);
        setBalanceData({ ...balanceData, currentBalance });
        storageNewBalanceData({ ...balanceData, currentBalance });
    }

    if(storageData) {
      let storageDataJSON = JSON.parse(storageData)
      storageDataJSON.push(data)

      storageNewData(storageDataJSON)
      setList(storageDataJSON)
    }else {
      storageNewData([data])
      setList([data])
    }
  }

  async function storageNewBalanceData(data: any) {
    await Storage.setItem('BalanceData', JSON.stringify(data));
  }

  async function updateBalanceData(data: BalanceData) {
      storageNewBalanceData(data)
      setBalanceData(data)
  }

  return(
    <DataContext.Provider
      value={{ list, balanceData, createData, updateBalanceData }}
    >
      {children}
    </DataContext.Provider>
  );

}
