import * as React from "react";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { Field } from "formik";
import { Text, useTheme } from "@ui-kitten/components";
import { TextStyle, View } from "react-native";

const BASE_STYLE_INPUT_ANDROID: TextStyle = {
  fontSize: 14,
  marginTop: 4,
  marginBottom: 4,
  paddingHorizontal: 22,
  paddingVertical: 8,
  borderWidth: 1,
  borderRadius: 30,
  color: "black",
  backgroundColor: "#F7F9FC"
}

interface SelectProps {
  name: string,
  placeholder?: string,
  items: any[]
} 

export const Select: React.FC<SelectProps> = (selectProps) => {
  const { name, items, placeholder } = selectProps;
  const theme = useTheme();

  const pickerStyle: PickerStyle = {
    inputAndroid: {
      ...BASE_STYLE_INPUT_ANDROID,
      borderColor: theme["border-basic-color-3"],
      minWidth: "100%"
    },
  }

  const invalidPickerStyle: PickerStyle = {
    inputAndroid: {
      ...BASE_STYLE_INPUT_ANDROID,
      borderColor: theme["border-danger-color-1"],
      minWidth: "100%"
    },
  }

  const defaultPlaceholder = "Selecione um tipo...";

  return (
    <Field name={name}>
      {({ form: { setFieldValue, setFieldTouched }, field: { value }, meta }) => {
        const invalidInput = meta.error && meta.touched

        return (
          <View style={{ marginBottom: 6 }}>
            <RNPickerSelect
              style={invalidInput ? invalidPickerStyle : pickerStyle}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: placeholder || defaultPlaceholder,
                color: "gray",
              }}
              onValueChange={val => {
                setFieldTouched(name)
                setFieldValue(name, val)
              }}
              items={items}
            />
          </View>
        )
      }}
    </Field>
  )
}
