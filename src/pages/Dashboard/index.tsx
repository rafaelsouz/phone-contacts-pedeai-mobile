import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ContactsList,
  ContactContainer,
  ContactName,
  ContactInfo,
  ContactMeta,
  ContactMetaText,
  ContactsListTitle,
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

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/contacts').then(response => {
      setContacts(response.data);
    });
  }, []);

  const navigateToContactProfile = useCallback(
    (contactId: string) => {
      navigate('ContactProfile', { contactId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
      </Header>

      <ContactsList
        data={contacts}
        keyExtractor={contact => contact.id}
        ListHeaderComponent={<ContactsListTitle>Contatos</ContactsListTitle>}
        renderItem={({ item: contact }) => (
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
        )}
      />
    </Container>
  );
};

export default Dashboard;
