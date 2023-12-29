import Layout from "@/components/Layout/layout";
import { URL } from '@/const';
import { useState } from "react";
import Image from 'next/image';

import register1 from "../public/myapi/register1.jpg";
import register2 from "../public/myapi/register2.jpg";
import login1 from "../public/myapi/login1.jpg";
import login2 from "../public/myapi/login2.jpg";

export default function Home() {
  const [query, setquery] = useState('register');

  return (
    <Layout>

      <div className="presentation ">

        <div className="tab">
          {query !== 'register' && <button className="tablinks" onClick={() => setquery('register')}>register</button>}
          {query === 'register' && <button className="tablinks active" onClick={() => setquery('register')}>register</button>}

          {query !== 'login' && <button className="tablinks" onClick={() => setquery('login')}>login</button>}
          {query === 'login' && <button className="tablinks active" onClick={() => setquery('login')}>login</button>}

          {query !== 'get books' && <button className="tablinks" onClick={() => setquery('get books')}>get books</button>}
          {query === 'get books' && <button className="tablinks  active" onClick={() => setquery('get books')}>get books</button>}

          {query !== 'post books' && <button className="tablinks" onClick={() => setquery('post books')}>post books</button>}
          {query === 'post books' && <button className="tablinks  active" onClick={() => setquery('post books')}>post books</button>}

          {query !== 'get book' && <button className="tablinks" onClick={() => setquery('get book')}>get book</button>}
          {query === 'get book' && <button className="tablinks  active" onClick={() => setquery('get book')}>get book</button>}

          {query !== 'put book' && <button className="tablinks" onClick={() => setquery('put book')}>put book</button>}
          {query === 'put book' && <button className="tablinks  active" onClick={() => setquery('put book')}>put book</button>}

          {query !== 'delete book' && <button className="tablinks" onClick={() => setquery('delete book')}>delete book</button>}
          {query === 'delete book' && <button className="tablinks  active" onClick={() => setquery('delete book')}>delete book</button>}

        </div>
        {query === 'register' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type POST: </span>
            <pre />
            <span className="bold">query: </span>  URL+/register/
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">body:  </span> <pre />
            <Image src={register1} alt="register1" width={300} height={120} />

            <pre />
            <span className="bold">answer success: </span><pre />

            <Image src={register2} alt="register2" width={1000} height={80} />
          </p>
        </div>}
        {query === 'login' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type POST: </span>
            <pre />
            <span className="bold">query: </span>  URL+/login/
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">body:  </span> <pre />
            <Image src={login1} alt="login1" width={250} height={100} />
            <pre />
            <span className="bold">answer success: </span><pre />
            <Image src={login2} alt="login2" width={1000} height={100} />
          </p>
        </div>}

        {query === 'get books' && <div className="tabcontent ">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type GET: </span>
            <pre />
            <span className="bold">query: </span>  URL+/books/books?limit=5&perPage=true&page=1&categories=История,МЕМУАРЫ
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">answer success: </span><pre />

            <Image src={"/myapi/getbooks.jpg"} alt="login2" width={1000} height={600} />
          </p>
        </div>}

        {query === 'post books' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type POST: </span>
            <pre />
            <span className="bold">query: </span>  URL+/books/books?limit=5&perPage=true&page=1&categories=История,МЕМУАРЫ
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">body:  </span> <pre />
            <Image src={"/myapi/postbooks1.jpg"} alt="login1" width={1000} height={230} />
            <pre />
            <span className="bold">answer success: </span><pre />

            <Image src={"/myapi/postbooks2.jpg"} alt="login2" width={1000} height={500} />
          </p>
        </div>}

        {query === 'get book' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type GET: </span>
            <pre />
            <span className="bold">query: </span>  URL+/books/book/1699741353125
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">answer success: </span><pre />

            <Image src={"/myapi/getbook.jpg"} alt="getbook" width={1000} height={500} />
          </p>
        </div>}

        {query === 'put book' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type PUT: </span>
            <pre />
            <span className="bold">query: </span>  URL+/books/1699741353125
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />
            <span className="bold">body:  </span> <pre />
            <Image src={"/myapi/putbook1.jpg"} alt="login1" width={1000} height={230} />
            <pre />
            <span className="bold">answer success: </span><pre />

            <Image src={"/myapi/putbook2.jpg"} alt="login2" width={1000} height={500} />
          </p>
        </div>}


        {query === 'delete book' && <div className="tabcontent">
          <h2> URL = {URL}api/v1</h2>

          <p> <span className="bold">type DELETE: </span>
            <pre />
            <span className="bold">query: </span>  URL+/books/1699741353125
            <pre />
            <span className="bold">Authorization: </span>  Bearer
            <pre />

            <span className="bold">answer success: </span><pre />

            <Image src={"/myapi/deletebook1.jpg"} alt="login2" width={200} height={80} />
          </p>
        </div>}
      </div>
    </Layout >
  )
}