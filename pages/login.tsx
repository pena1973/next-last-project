import { URL } from '@/const';
import { useState } from "react";
import Layout from "@/components/Layout/layout";

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from "@/pages/_app";
import { setLogin, setPass, setToken } from '@/pages/store/slices';

export default function Login() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // const login = useSelector((state: RootState) => {
  //     return state.authSlice.login;
  //   })
  //   const pass = useSelector((state: RootState) => {
  //     return state.authSlice.pass;
  //   })     
  const [message, setMessage] = useState("");

  // логин пользователя
  'use client'
  const handleClick = async function (e: React.MouseEvent<HTMLElement>) {

    let _url = String(URL);
    _url = _url.concat((_url[_url.length - 1] === "/") ? "" : "/");

    //  {    
    //     "login":"nb@nnn.com",
    //     "pass":"123"      
    //     }


    const res = await fetch(_url + "api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ 'login': emailValue, 'pass': passwordValue }),
    })


    if (res.status !== 200) {
      push('/404');

    } else {
      const receivedData = await res.json();

      if (!receivedData.error) {
        // если  успешно сохраняем в персист идем в профиль
        if (receivedData.message === "Успешно!") {
          setMessage(receivedData.message);
          dispatch(setLogin(emailValue));
          dispatch(setToken(receivedData.token));
          dispatch(setPass(passwordValue));
          push(`/catalog`);
        }
        else
          setMessage(receivedData.message);
      }
      else {
        //  push('/404');
      }
    }
  };
  return (
    <Layout>
      {/* <!-- логин  --> */}

      <div className="form_login">
        {(message !== "Успешно!") && <div className="message">{message}</div>}
        <div className="form_label">login(email): &nbsp; &nbsp;
          <input id="login" className="form_input" type="email" value={emailValue}
            onChange={e => { setEmailValue(e.target.value) }} minLength={4} required />
        </div>

        <div className="form_label"> &nbsp;&nbsp;&nbsp; password: &nbsp; &nbsp;
          <input id="password" className="form_input" type="password" value={passwordValue}
            onChange={e => { setPasswordValue(e.target.value) }} minLength={8} required />
        </div>

        <div className="form_login_button_container">
          <button type="submit" onClick={(e) => handleClick(e)}>Log in!</button>
        </div>
      </div>
    </Layout>
  );
}