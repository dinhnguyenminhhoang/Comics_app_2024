import React from 'react';
import {View} from 'react-native';
interface HeightSpaceProps {
  height: number;
}

const HeightSpacer: React.FC<HeightSpaceProps> = ({height}) => {
  return <View style={{height: height}}></View>;
};
export default HeightSpacer;
