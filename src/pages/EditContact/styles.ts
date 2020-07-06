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

export const FormContainer = styled.View`
  padding: 0 30px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
