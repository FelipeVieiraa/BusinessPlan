import React from 'react';
import { Formik, getIn } from 'formik';
import { Input, Button, Text, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';


import { INPUT, BUTTON, TEXTERROR, FORM } from '../../theme';
import Validations from './register.validation';
import { Loading, Select } from '../../components';


interface RegisterValues {
  initialValues: any
  onSubmit: any
}

const LogonForm: React.FC<RegisterValues> = ({ initialValues, onSubmit }) => {

  const options = [
    {value: "Investimento", label: "Investimento"},
    {value: "Gasto", label: "Gasto"},
    {value: "Lucro", label: "Lucro"}
  ]

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={Validations}>
      {( {handleChange, handleBlur, handleSubmit, isValid, isSubmitting, errors, touched, values} ) => (
        
        <>
          <Layout style={FORM}>

            <Select
              name={"type"}
              items={options}
            />

            <Input
              style={INPUT}
              keyboardType="numeric"
              size="large"
              status={
                getIn(touched, "value") &&
                getIn(errors, "value") &&
                "danger"
              }
              onChangeText={handleChange("value")}
              onBlur={handleBlur("value")}
              value={values.value}
              placeholder="Valor"
            />

            <Input
              style={INPUT}
              multiline={true}
              size="large"
              status={
                getIn(touched, "description") &&
                getIn(errors, "description") &&
                "danger"
              }
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholder="Descrição"
            />

            <Layout style={{ backgroundColor: "transparent" }}>
              { (touched.type && errors.type)
                  ? ( <Text style={TEXTERROR} status="danger">{`Tipo: ${errors.type}`}</Text> )
                  : <></>
              }

              { (touched.value && errors.value)
                  ? ( <Text style={TEXTERROR} status="danger">{`Valor: ${errors.value}`}</Text> )
                  : <></>
              }

              { (touched.description && errors.description)
                  ? ( <Text style={TEXTERROR} status="danger">{`Descrição: ${errors.description}`}</Text> )
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
              onPress={() => handleSubmit} 
              disabled={!isValid || isSubmitting}
              accessoryLeft={isSubmitting ? Loading : undefined}
            >
              {isSubmitting ? "Registrando" : "Registrar"}
            </Button>
          </SafeAreaView>
          
        </>

      )}
    </Formik>
  );
 
}

export default LogonForm;