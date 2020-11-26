import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';

import LogonForm from './logon.form';

import { AuthContext } from '../../contexts/auth';

const background = require('../../assets/background.png');

interface FormValues {
  email: string,
  password: string
}

const Logon: React.FC = () => {
  const [login] = useState<FormValues>({
    email: "",
    password: ""
  });
  const {signIn } = useContext(AuthContext)

  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {   
    await signIn(values.email, values.password)
    setSubmitting(false)
  }

  return (
    <ImageBackground 
      source={background} 
      style={{ 
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LogonForm 
        initialValues={login} 
        onSubmit={onSubmit}
      />
    </ImageBackground>
  );
}

export default Logon
