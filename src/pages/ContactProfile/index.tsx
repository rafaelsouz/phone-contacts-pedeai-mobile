import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import Button from '../../components/Button';

import {
  Container,
  ContatInfo,
  ContactListInfo,
  ContactInfoText,
  Header,
  BackButtom,
  HeaderTitle,
  ContactContainer,
} from './styles';

interface RouteParams {
  contactId: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const ContactProfile: React.FC = () => {
  const { navigate, goBack, addListener } = useNavigation();
  const route = useRoute();
  const { contactId } = route.params as RouteParams;

  const [contact, setContact] = useState<Contact>({} as Contact);

  const navigateToEditContact = useCallback(
    (idContact: string) => {
      navigate('EditContact', { idContact });
    },
    [navigate],
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    addListener('focus', () => {
      api.get(`/contacts/${contactId}`).then(response => {
        setContact(response.data);
      });
    });
  }, [contactId, addListener]);

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
                  navigateBack();
                }}
              >
                <Icon name="chevron-left" size={26} color="#999591" />
              </BackButtom>
              <HeaderTitle>{contact.name}</HeaderTitle>
            </Header>

            <ContactContainer>
              <ContactListInfo>
                <ContatInfo>
                  <Icon name="phone" size={24} color="#ff3030" />
                  <ContactInfoText>{contact.phone}</ContactInfoText>
                </ContatInfo>

                <ContatInfo>
                  <Icon name="mail" size={24} color="#ff3030" />
                  <ContactInfoText>{contact.email}</ContactInfoText>
                </ContatInfo>
              </ContactListInfo>

              <Button
                onPress={() => {
                  navigateToEditContact(contact.id);
                }}
              >
                Editar
              </Button>

              <Button
                onPress={() => {
                  Linking.openURL(`tel:${contact.phone}`);
                }}
              >
                Ligar
              </Button>
            </ContactContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ContactProfile;
