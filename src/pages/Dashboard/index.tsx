import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Linking } from 'react-native';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ContactsList,
  ContainerItem,
  ContactContainer,
  ContactName,
  ContactInfo,
  ContactMeta,
  ContactMetaText,
  ContactsListTitle,
  ButtonNewContact,
  ContainerActionsButton,
  ButtonToAction,
  ButtonToActionText,
  ButtonLogout,
} from './styles';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);

  const { navigate, addListener } = useNavigation();

  useEffect(() => {
    addListener('focus', () => {
      api.get('/contacts').then(response => {
        setContacts(response.data);
      });
    });
  }, [addListener]);

  const navigateToContactProfile = useCallback(
    (contactId: string) => {
      navigate('ContactProfile', { contactId });
    },
    [navigate],
  );

  const navigateToEditContact = useCallback(
    (contactId: string) => {
      navigate('EditContact', { idContact: contactId });
    },
    [navigate],
  );

  const navigateToCreateContact = useCallback(() => {
    navigate('CreateContact');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ButtonLogout
          onPress={() => {
            signOut();
          }}
        >
          <Icon name="log-out" size={28} color="#ff3030" />
        </ButtonLogout>
      </Header>

      <ContactsList
        data={contacts}
        keyExtractor={contact => contact.id}
        ListHeaderComponent={<ContactsListTitle>Contatos</ContactsListTitle>}
        renderItem={({ item: contact }) => (
          <ContainerItem>
            <ContactContainer
              onPress={() => {
                navigateToContactProfile(contact.id);
              }}
            >
              <ContactInfo>
                <ContactName>{contact.name}</ContactName>

                <ContactMeta>
                  <Icon name="user" size={14} color="#ff3030" />
                  <ContactMetaText>{contact.email}</ContactMetaText>
                </ContactMeta>

                <ContactMeta>
                  <Icon name="phone" size={14} color="#ff3030" />
                  <ContactMetaText>{contact.phone}</ContactMetaText>
                </ContactMeta>
              </ContactInfo>
            </ContactContainer>

            <ContainerActionsButton>
              <ButtonToAction
                onPress={() => {
                  Linking.openURL(`tel:${contact.phone}`);
                }}
              >
                <Icon name="phone-call" size={18} color="#ff3030" />
                <ButtonToActionText>Chamar</ButtonToActionText>
              </ButtonToAction>

              <ButtonToAction
                onPress={() => {
                  navigateToEditContact(contact.id);
                }}
              >
                <Icon name="edit-2" size={18} color="#ff3030" />
                <ButtonToActionText>Editar</ButtonToActionText>
              </ButtonToAction>
            </ContainerActionsButton>
          </ContainerItem>
        )}
      />

      <ButtonNewContact
        onPress={() => {
          navigateToCreateContact();
        }}
      >
        <Icon name="user-plus" size={28} color="#ff3030" />
      </ButtonNewContact>
    </Container>
  );
};

export default Dashboard;
