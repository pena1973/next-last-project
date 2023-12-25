import { setCategories } from "./pages/store/slices";

// перенвдит массив записей в массив их name
export function getNameArray(data: {name:string}[]): string[] {

    return data.map(record=>{return record.name})
    
}
// перенвдит массив категорий обкьтов в масив категорий строк
export function getStringCategories(data: Category[]): string[] {

    let cat: string[] = [];
    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        if (!cat.includes(category.name)) {
            cat.push(category.name)
        };
    }
    return cat;
}
// перенвдит массив авторовй обкьтов в масив авторов строк
export function getStrinAuthors(data: Author[]): string[] {

    let cat: string[] = [];
    for (let i = 0; i < data.length; i++) {
        const author = data[i];
        if (!cat.includes(author.name)) {
            cat.push(author.name)
        };
    }
    return cat;
}
// добавыит новую категорию в масиив строк категорий
export const addNewCategories = (cat: {marked:boolean, name:string}[], newbooks: Item[]) => {
    let newcat: {marked:boolean, name:string}[] = [...cat];
    
    for (let i = 0; i < newbooks.length; i++) {
        const item = newbooks[i];
        item.categories.forEach(category => {

            if (!newcat.find(elem => elem.name === category.name)) {
                newcat.push({marked:false, name:category.name})
            }
        });
    }
    return newcat;
}


// добавыит новый предмет в каталог
export function addtoCatalogNewItems(catalog: Item[], receivedItems: Item[]):Item[] {

    let newCatalog = [...receivedItems];

    catalog.forEach(item => {
        let potentialItem = newCatalog.find((e) => { return (e.id === item.id) })
        if (!potentialItem) newCatalog.push(item);
    });

    return newCatalog;
}
// удалит предмет из католога по ИД
export function removefromCatalogItems(catalog: Item[], id: number) {

    const newCat = catalog.filter(n => n.id !== id);

    return newCat;
}



export function getUnickID(): number {
    return Number(Date.now());
}