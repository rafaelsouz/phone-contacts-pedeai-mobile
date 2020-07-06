import React, { useRef, useCallback, useEffect, useState } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

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
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface ContactFormData {
  contact: Contact;
}

interface RouteParams {
  idContact: string;
}

const EditContact: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const route = useRoute();
  const { idContact } = route.params as RouteParams;

  const [contact, setContact] = useState<Contact>({} as Contact);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdate = useCallback(
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

        await api.put(`/contacts/${contact.id}`, data);

        Alert.alert('Contato atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do contato',
          'Ocorreu um erro ao atualizar o contato, tente novamente.',
        );
      }
    },
    [navigation, contact],
  );

  useEffect(() => {
    api.get(`/contacts/${idContact}`).then(response => {
      setContact(response.data);

      formRef.current?.setData(response.data);
    });
  }, [idContact]);

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
              <HeaderTitle>Editar contato</HeaderTitle>
            </Header>
            <FormContainer>
              <Form initialData={contact} ref={formRef} onSubmit={handleUpdate}>
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
                  Confirmar mudanças
                </Button>
              </Form>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditContact;
