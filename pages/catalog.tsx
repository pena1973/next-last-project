import { URL } from '@/const';
import Layout from "@/components/Layout/layout";
import BookCatalog from '../components/BookCatalog/bookCatalog';
import CategoryCatalog from '../components/CategoryCatalog/categoryCatalog';

import { data } from "../mock"
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from "@/pages/_app";
import { useRouter } from 'next/navigation';
import { setPage, setCatalog } from '@/pages/store/slices';
import { useState, useEffect,useRef, createContext, useContext} from "react";
import { addNewCategories, addtoCatalogNewItems } from '@/utils'


export default function Catalog() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  
  const page = useRef(0);

  const token = useSelector((state: RootState) => {
    return state.authSlice.token;
  })

  const catalog = useSelector((state: RootState) => {
    return state.workSlice.catalog;
  })

  const [categories, setCategories] = useState([] as { marked: boolean, name: string }[]);

  //  фильтрует показ книг 
  //  если ничего  по фильтру не найдено  возврат всего каталога
  //  если найдено то все что нашлочсь по фильтру
  const filterBooks = (categories: { marked: boolean, name: string }[],catalog:Item[]) => {
    let markedCategory = categories.filter(elem => { return elem.marked });
    if (markedCategory.length === 0) {
      return catalog;
    } else {

      let cat = catalog.filter(
        item => {
          for (let index = 0; index < item.categories.length; index++) {
            const itemcat = item.categories[index]; // категория
            // если есть в маркированных категориях то оставляем
            return (markedCategory.find(catgory => { return itemcat.name === catgory.name }) !== undefined)
          }
        }
      );
      return cat;
    }
  }
  const [filteredCatalog, setFilteredCatalog] = useState(filterBooks(categories,catalog));

  // обрабатывает нажатие по категории по категории (отбор по категории)
  const selectCategory = (category: { marked: boolean, name: string }) => {
    categories.forEach(elem => {
      if (elem.name === category.name) {
        elem.marked = !elem.marked;
      }
      setFilteredCatalog(filterBooks(categories,catalog));
      setCategories([...categories])
    })
  }

  // Загрузка порции  книг
  const loadMore = async () => {

    let _url = String(URL);
    _url = _url.concat((_url[_url.length - 1] === "/") ? "" : "/");
    let filteredCategories = categories.filter(elem => elem.marked)

    let categoriesStringArray: string[] = [];
    if (filteredCategories.length > 0) {
      categoriesStringArray = filteredCategories.map(elem => { return elem.name })
    }

    const res = await fetch(`${_url}api/v1/books/books?limit=10&perPage=true&page=${page.current + 1}&categories=${categoriesStringArray}`,
      {
        method: 'get',
        headers: new Headers({
          // 'Authorization': 'Basic '+btoa(token),  потом в сервере надо передклать на базовую
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }),
      }
    );
    if (res.status === 401) push('/login');
    if (res.status === 404) push('/404');
    if (res.status !== 200) {

    } else {
      const receivedData = await res.json();
      if (receivedData.success) {

        let commonCategories = addNewCategories(categories, receivedData.result)
        let commonCatalog = addtoCatalogNewItems(catalog, receivedData.result)
        page.current = page.current + 1;        
        dispatch(setCatalog(commonCatalog));
        setCategories(commonCategories);
        setFilteredCatalog(filterBooks(categories,commonCatalog))        
      }
      else {
        push('/404');
      }
    }
  }

  // загруз на старте
  useEffect(() => {
     dispatch(setPage(0));
     dispatch(setCatalog([] as Item[]));
    loadMore();
  }, []);


  let itemsReactNodes = filteredCatalog.map(item => (<BookCatalog key={item.id} item={item} />));
  let categoriesReactNodes = categories.map(category => (
    <CategoryCatalog key={category.name} category={category} selectCategory={(category) => selectCategory(category)} />));

  // добавить новую кнгигу в каталог
  const addBook = () => {
    // переводим в форму редактирования
    push('/book/0');
  };
  return (
    <Layout>
 
      {/* <div className="button-container-back"><button className="smallround-gray"> back</button></div> */}
      <div className="catalog-container">

        <div className="catalog-left">

          <div className="h1">Categories</div>
          <nav className="catalog-left-nav">
            <ul className="catalog-left-ul">
              {categoriesReactNodes}
            </ul>
          </nav>

        </div>

        <div className="catalog-right">
          {itemsReactNodes}
          <div className="catalog-book-button-container">
            <button className="biground-gray" onClick={(e) => loadMore()}> More</button>
            <button className="biground-red" onClick={(e) => addBook()}> Add book</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}