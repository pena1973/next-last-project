import Layout from "@/components/Layout/layout";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState('eng');


  return (
    <Layout>
      <div className="presentation">

        <div className="tab">
          {lang !== 'eng' && <button className="tablinks" onClick={() => setLang('eng')}>eng</button>}
          {lang === 'eng' && <button className="tablinks active" onClick={() => setLang('eng')}>eng</button>}
          {lang !== 'ru' && <button className="tablinks" onClick={() => setLang('ru')}>ru</button>}
          {lang === 'ru' && <button className="tablinks active" onClick={() => setLang('ru')}>ru</button>}
          {lang !== 'esp' && <button className="tablinks" onClick={() => setLang('esp')}>esp</button>}
          {lang === 'esp' && <button className="tablinks  active" onClick={() => setLang('esp')}>esp</button>}
        </div>

        {lang === 'eng' && <div className="tabcontent">
          <h2>My name is Natalia</h2>
          <p>Hello my name is Natalya
            I recently graduated from <span className="bold">SkillFactory IT school</span>
            with a specialization in <span className="bold">frontend developer</span> and am now considering job offers from various good companies.
            <pre />
            I made this site to show what I can really do at the moment.
            <pre />
            Technology stack used in the project
            <pre />
            <span className="bold">Frontend</span>
            <pre />
            I used frameworks and libraries <span className="bold">React, Next</span>.
            <pre />
            I used <span className="bold">Redux</span> local storage and various <span className="bold">hooks</span> for rendering and <span className="bold">Next</span> router for navigation.
            <pre />
            The server is accessed through asynchronous <span className="bold">fetch</span> requests.
            <pre />
            Authorization on the server involves receiving a token using the bearer authorization method
            when logging in and saving it in the browser storage. The token is valid for one day.
            <pre />
            I also really wanted to make a design that floats in the air, which I did using <span className="bold">HTML and CSS</span> styling.
            <pre />
            <span className="bold">Backend</span>
            <pre />
            I used the <span className="bold">Express</span> library to implement the server logic.
            <pre />
            The <span className="bold">Jwt</span> library was used for authorization
            <pre />
            I used <span className="bold">Supabase</span> as a database.
            <pre />
            In addition, for 20 years I worked in different positions,
            from a 1C language developer to a manager of complex projects related to the development of a product for sale.
            <pre />
            Also at IT school I did more than 10 different pet projects
            <pre />
            I have two higher education degrees and an MBA
            <pre />
            I will send a resume in classic form upon request.
            <pre />
            My contact:
          </p>
        </div>}

        {lang === 'ru' && <div className="tabcontent">
          <h2>Привет меня зовут Наталья</h2>
          <p >
            Я недавно закончила <span className="bold">IT школу SkillFactory</span> по специализации <span className="bold">frontend developer</span> и теперь  рассматриваю предложения о работе от разных хороших компаний.
            <pre />
            Я сделала этот сайт чтобы показать что я реально умею на сегодняшний момент.
            <pre />
            Стек технологий который использован в проекте
            <pre />
            <span className="bold">Frontend</span>
            <pre />
            Я использовала фреймворки и библиотеки <span className="bold">React, Next</span>.
            <pre />
            Я использовала локальное хранилище <span className="bold">Redux</span> и различные <span className="bold">hooks</span> для рендеринга и <span className="bold">Next router</span> для навигации.
            <pre />
            Обращение к серверу идет через асинхронные <span className="bold">fetch</span> запросы.
            <pre />
            Авторизация на сервере идет через получение токена по способу авторизации bearer при логине и сохранении его в хранилище браузера. Токен действителен одни сутки.
            <pre />
            Мне также очень хотелось сделать парящий в воздухе дизайн, что я и сделала посредством <span className="bold">HTML и CSS</span> стилей.
            <pre />
            <span className="bold">Backend</span>
            <pre />
            Я использовала библиотеку <span className="bold">Express</span> для реализации серверной логики.
            <pre />
            Для авторизации использована библиотека <span className="bold">Jwt</span>
            <pre />
            В качестве базы данных я использовала <span className="bold">Supabase</span>.
            <pre />
            Кроме этого я на протяжении 20 лет работала на разных позициях от разработчика на языке 1С до руководителя сложных проектов связанных с разработкой продукта на продажу.
            <pre />
            Также в IT школе я сделала более 10  различных pet  проектов
            <pre />
            У меня два высших образования и MBA
            <pre />
            Резюме в классическом виде отправлю по запросу
            <pre />
            Мой контакт:

          </p>
        </div>}


        {lang === 'esp' && <div className="tabcontent">
          <h2>Hola mi nombre es Natalia</h2>
          <p>Recientemente me gradué de <span className="bold">la escuela de IT SkillFactory</span> con especialización en <span className="bold">frontend developer</span>
            y ahora estoy considerando ofertas de trabajo de varias buenas empresas.
            <pre />
            Creé este sitio para mostrar lo que realmente puedo hacer en este momento.
            <pre />
            Pila de tecnología utilizada en el proyecto.
            <pre />
            <span className="bold">Frontend</span>
            <pre />
            Utilicé frameworks y bibliotecas <span className="bold">React, Next</span>.
            <pre />
            Utilicé el almacenamiento local <span className="bold">Redux</span> y varios 
            <span className="bold">hooks</span> para renderizar y el enrutador <span className="bold">Next</span> para navegación.
            <pre />
            Se accede al servidor mediante <span className="bold"> async fetch</span>.
            <pre />
            La autorización en el servidor implica recibir un token utilizando el método de autorización bearer 
            al iniciar sesión y guardarlo en el almacenamiento del navegador. El token es válido por un día.
            <pre />
            También tenía muchas ganas de hacer un diseño que flotara en el aire, lo cual hice usando estilos <span className="bold">HTML y CSS</span>.
            <pre />
            <span className="bold">Backend</span>
            <pre />
            Utilicé la biblioteca <span className="bold">Express</span> para implementar la lógica del servidor.
            <pre />
            La biblioteca <span className="bold">Jwt</span> se utilizó para la autorización.
            <pre />
            Usé <span className="bold">Supabase</span> como base de datos.
            <pre />
            Además, durante 20 años trabajé en diferentes puestos, 
            desde desarrollador de lenguaje 1C hasta gerente de proyectos complejos relacionados con el desarrollo de un producto para la venta.
            <pre />
            También en la escuela de TI hice más de 10 proyectos favoritos diferentes.
            <pre />
            Tengo dos títulos de educación superior y un MBA.
            <pre />
            Enviaré un currículum en formato clásico si lo solicita.
            <pre />
            Mi contacto:
          </p>
        </div>}


      </div>
    </Layout>
  )
}