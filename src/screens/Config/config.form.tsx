import React, { useContext } from 'react';
import { Formik, getIn } from 'formik';
import { Input, Button, Text, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';


import { INPUT, BUTTON, TEXTERROR, FORM, evaPallete, LABEL } from '../../theme';
import Validations from './config.validations';
import { Loading } from '../../components';
import { DataContext } from '../../contexts/data';

interface LogonValues {
  initialValues: any
  onSubmit: any
}

const LogonForm: React.FC<LogonValues> = ({ initialValues, onSubmit }) => {
  const { balanceData } = useContext(DataContext);

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={Validations}>
      {( {handleChange, handleBlur, handleSubmit, isValid, isSubmitting, errors, touched, values} ) => (
        
        <>
          <Layout style={[FORM, { justifyContent: "center" }]}>
            <Text 
              style={{ 
                fontSize: 30, 
                fontWeight: "bold", 
                color: evaPallete["color-text-primary"],
                marginBottom: 55
              }}
            >
              Configuração
            </Text>
              {console.log(values)}
            <Input
              style={INPUT}
              keyboardType="numeric"
              size="large"
              status={
                getIn(touched, "currentBalance") &&
                getIn(errors, "currentBalance") &&
                "danger"
              }
              onChangeText={handleChange("currentBalance")}
              onBlur={handleBlur("currentBalance")}
              value={!!values.currentBalance ? values.currentBalance : !!balanceData ? balanceData.currentBalance : ''}
              label={() => <Text style={LABEL}>*Saldo</Text>}
              placeholder={`${values.currentBalance}`}
            />

            <Input
              style={INPUT}
              keyboardType="numeric"
              size="large"
              status={
                getIn(touched, "investment") &&
                getIn(errors, "investment") &&
                "danger"
              }
              onChangeText={handleChange("investment")}
              onBlur={handleBlur("investment")}
              value={!!values.investment ? values.investment : !!balanceData ? balanceData.investment : ''}
              label={() => <Text style={LABEL}>*Investido</Text>}
              placeholder={`${values.investment}`}
            />

            <Input
              style={INPUT}
              keyboardType="numeric"
              size="large"
              status={
                getIn(touched, "balanceTotal") &&
                getIn(errors, "balanceTotal") &&
                "danger"
              }
              onChangeText={handleChange("balanceTotal")}
              onBlur={handleBlur("balanceTotal")}
              value={!!values.balanceTotal ? values.balanceTotal : !!balanceData ? balanceData.balanceTotal : ''}
              label={() => <Text style={LABEL}>*Saldo acumulado</Text>}
              placeholder={`${values.balanceTotal}`}
            />

            <Layout style={{ backgroundColor: "transparent" }}>
              { (touched.currentBalance && errors.currentBalance)
                  ? ( <Text style={TEXTERROR} status="danger">{`Saldo: ${errors.currentBalance}`}</Text> )
                  : <></>
              }

              { (touched.investment && errors.investment)
                  ? ( <Text style={TEXTERROR} status="danger">{`Valor investido: ${errors.investment}`}</Text> )
                  : <></>
              }

              { (touched.balanceTotal && errors.balanceTotal)
                  ? ( <Text style={TEXTERROR} status="danger">{`Valor acumulado: ${errors.balanceTotal}`}</Text> )
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
              Concluir
            </Button>
          </SafeAreaView>
          
        </>

      )}
    </Formik>
  );
 
}

export default LogonForm;