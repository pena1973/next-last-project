import styles from "./bookItem.module.css";
import Image from 'next/image';
import Raiting from '../Raiting/raiting';
import { clsx } from 'clsx';
import { getStringCategories, getStrinAuthors, getUnickID } from '@/utils'
import { URL } from '../../const'
import book from "../../public/book.png";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter,redirect,RedirectType } from 'next/navigation';

import { setCatalog, setCategories } from '@/pages/store/slices';
import { RootState, useAppDispatch } from "@/pages/_app";

import { addNewCategories, addtoCatalogNewItems, removefromCatalogItems, } from '@/utils'

interface ItemProps {   
    id: number
}

export default function BookItem({
    id,
}: ItemProps) {
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const token = useSelector((state: RootState) => {
        return state.authSlice.token;
    })
    const login = useSelector((state: RootState) => {
        return state.authSlice.login;
    })
    const categories = useSelector((state: RootState) => {
        return state.workSlice.categories;
    })

    const catalog = useSelector((state: RootState) => {
        return state.workSlice.catalog;
    })

    let item = {} as Item;
    if (id === 0) item.id = 0;
    else item = catalog.find(elem => { return elem.id === id }) as Item;

    if (!item) {push('/404'); return ( <></>) ;}

    // состояние отображения
    const [itemAuthors, setItemAuthors] = useState((!item?.authors) ? "" : getStrinAuthors(item.authors).join(', '));
    const [itemCategories, setItemCategories] = useState((!item?.categories) ? "" : getStringCategories(item.categories).join(', '));

    const [itemName, setItemName] = useState(item.name);
    const [itemDescription, setItemDescription] = useState(item.description);
    const [itemRaiting, setItemRaiting] = useState(item.raiting);
    const [itemCurency, setItemCurency] = useState(item.curency?.name);
    const [itemPrice, setItemPrice] = useState(item.price);
    const [itemEsteemes, setItemEsteemes] = useState(item.esteemes);
    const [itemId, setItemId] = useState(item.id);
    const [itemLanguage, setItemLanguage] = useState(item.language);
    const [itemPublished, setItemPublished] = useState(item.published);

    // состояние редактирования
    const [edit, setEdit] = useState((item.id === 0) ? true : false); //  если новый сразу на редактирование
    const [nameValue, setNameValue] = useState(item.name);
    const [autorsValue, setAutorsValue] = useState(itemAuthors);
    const [categoriesValue, setCategoriesValue] = useState(itemCategories);
    const [descriptionValue, setDescriptionValue] = useState(item.description);
    const [raitingValue, setRaitingValue] = useState(item.raiting);
    const [curencyValue, setCurencyValue] = useState(item.curency?.name);
    const [priceValue, setPriceValue] = useState(String((item.price===undefined)?"":item.price));
    const [langvuageValue, setLanguageValue] = useState(item.language);
    const [publishedValue, setPublishedValue] = useState(item.published);

    // добавление в корзину
    const buy = (e: React.MouseEvent<HTMLElement>) => { };
    // редактирование книги
    const saveItem = async () => {

        let ibook = {
            id: item.id,
            name: nameValue,
            categories: categoriesValue.trim().split(','),
            language: langvuageValue,
            price: Number(priceValue),
            curency: curencyValue,
            published: publishedValue,
            authors: autorsValue.trim().split(','),
            description: descriptionValue,
            raiting: raitingValue,
            user: login,
        }

        let _url = String(URL);
        _url = _url.concat((_url[_url.length - 1] === "/") ? "" : "/");
        if (item.id === 0) item.id = getUnickID();
        const res = await fetch(`${_url}api/v1/books/book/${item.id}`,
            {
                method: 'put',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(ibook),
            }
        );

        if (res.status === 401) redirect('/login');

        if (res.status !== 200) {

        } else {
            const receivedData = await res.json();
            if (receivedData.success) {
                // нужно обновить эту книгу в хранилище

                let commonCategories = addNewCategories(categories, [receivedData.result])
                let catalog1 = removefromCatalogItems(catalog, receivedData.result.id)
                let commonCatalog = addtoCatalogNewItems(catalog1, [receivedData.result])
                dispatch(setCatalog(commonCatalog));
                dispatch(setCategories(commonCategories));
                setEdit(false);
                let resultEdit: Item = receivedData.result;
                // обновить инфо item                
                setItemCategories(categoriesValue.trim());
                setItemAuthors(autorsValue.trim());

                setItemPrice(resultEdit.price);
                setItemName(resultEdit.name);
                setItemDescription(resultEdit.description);
                setItemRaiting(resultEdit.raiting);
                setItemCurency(resultEdit.curency.name);
                setItemEsteemes(resultEdit.esteemes);
                setItemId(resultEdit.id);
                setItemPublished(resultEdit.published);
                setItemLanguage(resultEdit.language);
            }
            else {
                push('/404');
            }
        }

    };

    //  удаление книги
    const remove = async () => {
        let _url = String(URL);
        _url = _url.concat((_url[_url.length - 1] === "/") ? "" : "/");
        const res = await fetch(`${_url}api/v1/books/book/${item.id}`,
            {
                method: 'delete',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
            }
        );

        if (res.status === 401) push('/login');

        if (res.status !== 200) {
  
        } else {
            const receivedData = await res.json();
            if (receivedData.success) {
                //  если успешно на сервере то обрабатываю на клиенте
                // удаляю предмет из каталога   
                let commonCatalog = removefromCatalogItems(catalog, item.id)
                //  Удаляю категорию если она больше нигде  в книгах не встречается

                let commonCategories = addNewCategories([], commonCatalog);
                //  проставим marked
                commonCategories.forEach(elem => {
                    let a = categories.find(cat => { cat.name === elem.name });
                    if (a !== undefined) elem.marked = a.marked;
                })
                //   кладем в хранилище и уходим
                dispatch(setCatalog(commonCatalog));
                dispatch(setCategories(commonCategories));
                setEdit(false);
                push('/catalog');
            }
        }
    };

    return (
        <>
            <div className={styles.book_container}>
                {(itemId !== 0) && <div className={styles.book_container_show}>
                    <div className={styles.book_container_left}>
                        <Image src={book} alt="book" className={styles.book_thumbnail} />
                    </div>
                    <div className={styles.book_container_right}>
                        <div className={styles.autor}>Autors: {itemAuthors} </div>
                        <div className={styles.name}>Name: {itemName}</div>
                        <div className={styles.category}>Category: {itemCategories}</div>
                        <div className={styles.category}>Price: {itemPrice} {itemCurency}</div>
                        <Raiting raiting={itemRaiting} edit={false} setRaiting={() => { }} />
                        <div className={styles.esteeme}>Esteemes: {itemEsteemes}</div>
                        <div className={styles.category}>Published: {itemPublished}</div>
                        <div className={styles.category}>Language: {itemLanguage}</div>
                        <div className="h3"> Descriptions: {itemDescription} </div>
                        <div className={styles.book_button_container}>
                            <button className="smallround-red" onClick={(e) => buy(e)}> buy</button>
                            <button className="smallround-gray" onClick={(e) => { setEdit(!edit) }}> edit</button>
                            <button className="smallround-gray" onClick={(e) => { remove() }}> remove</button>
                        </div>
                    </div>
                </div>}

                {edit &&
                    <div className={styles.book_container_edit}>

                        <label className={styles.edit_label}>name: </label>
                        {(itemId !== 0) && <div className={styles.name}>{nameValue}</div>}
                        {(itemId === 0) && <textarea className={styles.edit_input} placeholder="name" maxLength={100}
                            itemType="text" value={nameValue}
                            onChange={e => { setNameValue(e.target.value) }} required></textarea>}

                        <label className={styles.edit_label}>autors: </label>
                        <textarea className={styles.edit_input} placeholder="autors" maxLength={100}
                            itemType="text" value={autorsValue}
                            onChange={e => { setAutorsValue(e.target.value) }} required></textarea>

                        <label className={styles.edit_label}>description: </label>
                        <textarea className={clsx(styles.edit_input, styles.description)} placeholder="description" maxLength={1000}
                            itemType="text" value={descriptionValue}
                            onChange={e => { setDescriptionValue(e.target.value) }} required></textarea>

                        <label className={styles.edit_label} >categories: </label>
                        <textarea className={styles.edit_input} placeholder="categories" maxLength={200}
                            itemType="text" value={categoriesValue}
                            onChange={e => { setCategoriesValue(e.target.value) }} required></textarea>

                        <div className={styles.edit_price_container}>
                            <div className={styles.edit_price_container_part}>
                                <label className={styles.edit_label} >Price: </label>
                                <div className={styles.edit_price_container}>
                                    <textarea className={styles.edit_price} maxLength={10}
                                        itemType="text" value={priceValue}
                                        onChange={e => {
                                            // ограничение стмволов ввода                                        
                                            let preg = e.target.value.replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
                                            setPriceValue(preg)
                                        }} required></textarea>
                                    <textarea className={styles.edit_curency} placeholder="EUR" maxLength={3}
                                        itemType="number" value={curencyValue}
                                        onChange={e => { setCurencyValue(e.target.value) }} required></textarea>
                                </div>
                            </div>
                            <div className={styles.edit_price_container_part}>
                                <label className={styles.edit_label} >published: </label>
                                <div className={styles.edit_price_container}>
                                    <textarea className={styles.edit_published} maxLength={4}
                                        itemType="number" value={publishedValue}
                                        onChange={e => { setPublishedValue(Number(e.target.value)) }} required={true}></textarea>
                                </div>
                            </div>
                            <div className={styles.edit_price_container_part}>
                                <label className={styles.edit_label} >lang: </label>
                                <div className={styles.edit_price_container}>
                                    <textarea className={styles.edit_lang} maxLength={10}
                                        itemType="text" value={langvuageValue}
                                        onChange={e => { setLanguageValue(e.target.value) }} required={true}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={styles.edit_raiting}><Raiting raiting={raitingValue} edit={true} setRaiting={(raiting) => { setRaitingValue(raiting) }} />
                            <button className="smallround-gray" onClick={(e) => { saveItem() }}> save</button>
                        </div>
                    </div>
                }

            </div>
        </>
    );
}