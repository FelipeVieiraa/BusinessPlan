import React from 'react';
import { Formik, getIn } from 'formik';
import { Input, Button, Text, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';


import { INPUT, BUTTON, TEXTERROR, FORM } from '../../theme';
import Validations from './logon.validations';
import { Loading } from '../../components';

interface LogonValues {
  initialValues: any
  onSubmit: any
}

const LogonForm: React.FC<LogonValues> = ({ initialValues, onSubmit }) => {

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={Validations}>
      {( {handleChange, handleBlur, handleSubmit, isValid, isSubmitting, errors, touched, values} ) => (
        
        <>
          <Layout style={[FORM, { justifyContent: "center" }]}>

            <Text 
              style={{ 
                fontSize: 48, 
                fontWeight: "bold", 
                color: "#FFF",
                marginBottom: 50
              }}
            >
              Business {'\n'}
              Plan
            </Text>

            <Input
              style={INPUT}
              size="large"
              status={
                getIn(touched, "email") &&
                getIn(errors, "email") &&
                "danger"
              }
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Usuário"
            />

            <Input
              style={INPUT}
              size="large"
              status={
                getIn(touched, "password") &&
                getIn(errors, "password") &&
                "danger"
              }
              onChangeText={handleChange("password")}
              secureTextEntry={true}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Senha"
            />

            <Layout style={{ backgroundColor: "transparent" }}>
              { (touched.email && errors.email)
                  ? ( <Text style={TEXTERROR} status="danger">{`Email: ${errors.email}`}</Text> )
                  : <></>
              }

              { (touched.password && errors.password)
                  ? ( <Text style={TEXTERROR} status="danger">{`Senha: ${errors.password}`}</Text> )
                  : <></>
              }
            </Layout>

          </Layout>


          <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              appearance="filled"
              status="primary"
              size="large"
              style={BUTTON}
              onPress={() => handleSubmit()} 
              disabled={!isValid || isSubmitting}
              accessoryLeft={isSubmitting ? Loading : undefined}
            >
              Entrar
            </Button>
          </SafeAreaView>
          
        </>

      )}
    </Formik>
  );
 
}

export default LogonForm;