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

export const ButtonLogout = styled.TouchableOpacity`
  border: #201e25 2px;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px #888;
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

export const ContainerItem = styled.View`
  background: #3e3b47;
  border-radius: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

export const ContactContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
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

export const ButtonNewContact = styled.TouchableOpacity`
  width: 62px;
  height: 62px;

  position: absolute;
  bottom: 20px;
  right: 20px;

  align-items: center;
  justify-content: center;

  border-radius: 50px;
  background: #28262e;
  box-shadow: 1px 1px 2px #888;
`;

export const ContainerActionsButton = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-around;
  align-items: center;
`;
export const ButtonToAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  border-radius: 25px;
  padding: 12px 25px;
  justify-content: center;
  background: #28262e;
`;
export const ButtonToActionText = styled.Text`
  font-size: 16px;
  margin-left: 16px;
  color: #fff;
`;
