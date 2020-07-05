import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 80 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: sans-serif;
  margin: 54px 0 24px;
`;

export const BackButtom = styled.TouchableOpacity`
  position: absolute;
  top: 64px;
  left: 24px;
`;
