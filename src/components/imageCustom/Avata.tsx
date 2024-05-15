import React from 'react';
import {Alert, Image, StyleSheet} from 'react-native';
import {COLORS} from 'theme/theme';

// Đường dẫn tới ảnh mặc định cho hồ sơ người dùng
const userProfile = require('../../assets/app_images/userProfile.jpg');

// Định nghĩa props cho component Avata
interface AvataProps {
  src: string;
  customStyles?: object; // Sử dụng 'object' hoặc định nghĩa rõ ràng hơn cho kiểu dữ liệu
}

// Component Avata hiển thị ảnh đại diện
const Avata: React.FC<AvataProps> = ({src, customStyles}) => {
  return (
    <Image
      source={
        src !== 'https://i.postimg.cc/C1RmrzbL/anonymous-avatar-icon-25.png'
          ? {uri: src}
          : userProfile
      }
      style={[styles.img, customStyles]}
    />
  );
};

export default Avata;

// Tạo StyleSheet cho component
const styles = StyleSheet.create({
  img: {
    borderRadius: 999,
    width: 45,
    height: 45,
    resizeMode: 'cover', // Thay đổi từ 'contain' sang 'cover' để ảnh đầy đủ khung hình
    borderColor: COLORS.dark.primaryGreyHex,
    borderWidth: 1,
  },
});
