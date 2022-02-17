/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import StyledWrapper from './styled';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// import web3 from "web3";
import MetamaskLoginButton from './MetamaskLoginButton';

import GoogleLoginButton from './GoogleLoginButton';
import { useLoginMutation } from '../../app/services/auth';
import { setAuthData } from '../../app/slices/auth.data';

export default function LoginPage() {
 const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();

 // const { token } = useSelector((store) => store.authData);
 const navigateTo = useNavigate();
 const dispatch = useDispatch();
 const [input, setInput] = useState({
  email: '',
  password: ''
 });

 useEffect(() => {
  if (error) {
   console.log(error);
   switch (error.status) {
    case 'PARSING_ERROR':
     toast.error(error.data);
     break;
    case 401:
     toast.error('username or password incorrect');
     break;
    case 404:
     toast.error('account not exsit');
     break;

    default:
     toast.error('something error');
     break;
   }
   return;
  }
 }, [error]);
 useEffect(() => {
  if (isSuccess && data) {
   // 更新本地认证信息
   toast.success('login success');
   dispatch(setAuthData(data));
   navigateTo('/');
  }
 }, [isSuccess, data]);

 const handleLogin = (evt) => {
  evt.preventDefault();
  console.log('wtf', input);
  login({
   ...input,
   type: 'password'
  });
 };

 const handleInput = (evt) => {
  const { type } = evt.target.dataset;
  const { value } = evt.target;
  console.log(type, value);
  setInput((prev) => {
   prev[type] = value;
   return { ...prev };
  });
 };
 const { email, password } = input;
 return (
  <StyledWrapper>
   <div className="form">
    <div className="tips">
     <img
      src="https://static.nicegoodthings.com/project/ext/webrowse.logo.png"
      alt="logo"
      className="logo"
     />
     <h2 className="title">Login to Rustchat</h2>
     <span className="desc">Please enter your details.</span>
    </div>
    <form onSubmit={handleLogin}>
     <input
      name="email"
      value={email}
      required
      placeholder="Enter your email"
      data-type="email"
      onChange={handleInput}
     />
     <input
      type="password"
      value={password}
      name="password"
      required
      data-type="password"
      onChange={handleInput}
      placeholder="Enter your password"
     />
     <button className="btn" type="submit" disabled={isLoading}>
      Sign in
     </button>
    </form>
    <hr className="or" />
    <GoogleLoginButton login={login} />
    <MetamaskLoginButton login={login} />
   </div>
  </StyledWrapper>
 );
}
