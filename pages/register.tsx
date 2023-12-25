import { URL } from '@/const';
import { useState } from "react";
import Layout from "@/components/Layout/layout";


import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/pages/_app";
import { setLogin, setPass, setToken, setName, setAbout } from '@/pages/store/slices';
export default function Register() {
    // состояние редактирования
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [message, setMessage] = useState("");

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    // Регистрация пользователя
    'use client'
    const handleClick = async (e: React.MouseEvent<HTMLElement>) => {

        let _url = String(URL);
        _url = _url.concat((_url[_url.length - 1] === "/") ? "" : "/");

        // {    
        //     "name": "pena",    
        //     "email":"nb@nnn.com",
        //     "pass":"123123123",      
        //     "about":"about"
        //     }

        const res = await fetch(_url + "api/v1/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ 'email': emailValue, 'pass': passwordValue, 'name': nameValue, 'about': descriptionValue }),
        });
        console.log(res.status);
        if (res.status !== 200) {
            // push('/404');  
            // console.log(res.status);

        } else {
            const receivedData = await res.json();
            if (!receivedData.error) {
                // если  успешно сохраняем в персист идем в профиль
                if (receivedData.message === "Успешно!") {
                    setMessage(receivedData.message);
                    dispatch(setLogin(emailValue));
                    dispatch(setToken(receivedData.token));
                    dispatch(setPass(passwordValue));
                    dispatch(setName(nameValue));
                    dispatch(setAbout(descriptionValue));
                    // console.log(receivedData.token);
                    push(`/catalog`);
                }
                else
                    setMessage(receivedData.message);
            }
            else {
                //  push('/404');
            }
        }
        // console.log(e);
    };
    return (
        <Layout>
            {/* <!-- Регистрация  --> */}
            <form className="form_login">           
                {(message !== "Успешно!") &&<div className="message">{message}</div>}
                <label className="form_label">login(email): &nbsp; &nbsp;
                    <input id="login" className="form_input" type="email" value={emailValue}
                        onChange={e => { setEmailValue(e.target.value) }} minLength={4} required />
                </label>

                <label className="form_label"> &nbsp;&nbsp;&nbsp; password: &nbsp; &nbsp;
                    <input id="password" className="form_input" type="password" value={passwordValue}
                        onChange={e => { setPasswordValue(e.target.value) }} minLength={8} required />
                </label>

                <label className="form_label"> &nbsp;&nbsp;&nbsp; name: &nbsp; &nbsp;
                    <input id="name" className="form_input" type="text" value={nameValue}
                        onChange={e => { setNameValue(e.target.value) }} autoComplete="off" required />
                </label>


                <label className="form_label form_label_description">&nbsp; &nbsp;&nbsp;About me: &nbsp; &nbsp;
                    <textarea id="description" className="form_textarea" placeholder="a little be crasy" value={descriptionValue}
                        onChange={e => { setDescriptionValue(e.target.value) }}></textarea>
                </label>

                <div className="form_login_button_container">
                    <button type="button" onClick={(e) => handleClick(e)} >Register!</button>
                </div>
            </form>
        </Layout>
    );
}