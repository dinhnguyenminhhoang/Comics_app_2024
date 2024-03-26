import React, {useState} from 'react';

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, 'password must be at least 8 characters')
//     .required('Required'),
//   email: Yup.string().email('provide a valid email').required('Required'),
// });

const SingninScreen = () => {
  const [loader, setLoader] = useState();
  const [resData, setResData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  return <></>;
};

export default SingninScreen;
