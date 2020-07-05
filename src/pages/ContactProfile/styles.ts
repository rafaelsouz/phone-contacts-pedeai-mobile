import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight()}px;
  background: #28262e;

  flex-direction: row;
  align-items: center;
`;

export const BackButtom = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: sans-serif;
  font-size: 24px;
  margin-left: 16px;
`;

export const ContactListInfo = styled.View`
  margin-bottom: 24px;
`;

export const ContactContainer = styled.View`
  padding: 0 30px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContatInfo = styled.View`
  min-width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-bottom-width: 2px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ContactInfoText = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-left: 24px;
`;
