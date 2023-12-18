import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenNames} from './screenNames';

type ParamList = {
  [ScreenNames.Login]: undefined;
  [ScreenNames.Dashboard]: undefined;
};

export type NavigationProp = NativeStackScreenProps<ParamList>;
