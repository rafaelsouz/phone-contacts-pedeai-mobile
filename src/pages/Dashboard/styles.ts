import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Contact } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight()}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: sans-serif;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff3030;
  font-weight: bold;
`;

export const ContactsListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: sans-serif;
`;

export const ContactsList = styled(FlatList as new () => FlatList<Contact>)`
  padding: 32px 24px 16px;
`;

export const ContactContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ContactInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ContactName = styled.Text`
  font-family: sans-serif;
  font-size: 18px;
  color: #f4ede8;
`;

export const ContactMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ContactMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: sans-serif;
`;
