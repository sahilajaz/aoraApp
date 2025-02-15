import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { FC, useState } from 'react';

import { icons } from '../constants';


interface FormType {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  otherStyles: string;
  keyBoardType?: string;
  [key: string]: any;
}

const FormField: FC<FormType> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
 

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
