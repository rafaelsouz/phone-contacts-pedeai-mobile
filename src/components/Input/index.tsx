import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#9c9a97" />

      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#9c9a97"
        {...rest}
      />
    </Container>
  );
};

export default Input;
