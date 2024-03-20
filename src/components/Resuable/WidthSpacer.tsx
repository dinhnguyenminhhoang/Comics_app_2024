import React from 'react';
import {View} from 'react-native';
interface WidthSpaceProps {
  width: number;
}

const WidthSpacer: React.FC<WidthSpaceProps> = ({width}) => {
  return <View style={{width: width}}></View>;
};
export default WidthSpacer;
