import React, { useRef, useCallback } from 'react';

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Header,
  HeaderTitle,
  BackButtom,
  FormContainer,
} from './styles';

export interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  // eslint-disable-next-line camelcase
  user_id: string;
}

const CreateContact: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreate = useCallback(
    async (data: ContactFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email('Digite um e-mail válido'),
          phone: Yup.string().min(8, 'No mínimo 8 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // eslint-disable-next-line no-param-reassign
        data.user_id = user.id;

        await api.post(`/contacts`, data);

        Alert.alert('Contato criado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na criação do contato',
          'Ocorreu um erro ao criar o contato, tente novamente.',
        );
      }
    },
    [navigation, user.id],
  );

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <Container>
            <Header>
              <BackButtom
                onPress={() => {
                  handleGoBack();
                }}
              >
                <Icon name="chevron-left" size={26} color="#999591" />
              </BackButtom>
              <HeaderTitle>Novo contato</HeaderTitle>
            </Header>
            <FormContainer>
              <Form ref={formRef} onSubmit={handleCreate}>
                <Input
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={emailInputRef}
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    phoneInputRef.current?.focus();
                  }}
                />

                <Input
                  ref={phoneInputRef}
                  name="phone"
                  icon="phone"
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />

                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Cadastrar contato
                </Button>
              </Form>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateContact;
