import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SigIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} style={{ height: 150, resizeMode: 'contain' }} />

      <Title>Faça seu login</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button
        onPress={() => {
          console.log('Button');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SigIn;
