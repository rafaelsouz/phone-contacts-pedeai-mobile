import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: sans-serif;
  margin: 54px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: sans-serif;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  background: #312e38;
  border-top-width: 2px;
  border-color: #232129;
  padding: 16px 0 ${14 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const CreateAccountButtonText = styled.Text`
  color: #ff3030;
  font-size: 18px;
  font-family: sans-serif;
  margin-left: 16px;
`;
