import { createSlice } from '@reduxjs/toolkit';


export type WorkState = {
    page: number, // номер скачанной итерации
    catalog: Item[], // все скачанные книги
    categories: {marked:boolean,name:string}[], // все категории книг с пометками
    loading:boolean,
      
}
export type CartState = {
    cart: {item: Item,quantity:number}[], // тек корзина    
    quantity: number,   
}
export type AuthState = {
    name: string,
    about: string,
    login: string,
    pass: string,
    token:string,    
}

const workIntialState: WorkState = {
    page: 0,    
    catalog: [
        // {
        //     id:1,
        //     authors: ['Puskin', 'Lermontov'],
        //     name:'book',
        //     categories:[{id:1,name:'Drama'}, {id:2,name:'Romans'}],
        //     language:'LV',
        //     esteemes:5,
        //     raiting:4,
        //     description:'string',
        //     price:10.4,
        //     curency: {id:740,name:'USD'},
        //     published:2020,
        // },
        // {
        //     id: 2,
        //     autors: ["Kevin Kwan"],
        //     name: "Crazy rich asians",
        //     categories:[{id:1,name:'Drama'}, {id:2,name:'Romans'}],
        //     language:'LV',
        //     esteemes:5,
        //     raiting:4,
        //     description:'the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...',
        //     price:10.4,
        //     curency: {id:740,name:'USD'},
        //     published:2020,
        // },
        // {
        //     id: 5,
        //     autors: ["Kevin Kwan"],
        //     name: "Crazy rich asians",
        //     categories:[{id:1,name:'Drama'}, {id:2,name:'Romans'}],
        //     language:'LV',
        //     esteemes:5,
        //     raiting:4,
        //     description:'the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...',
        //     price:10.4,
        //     curency: {id:740,name:'USD'},
        //     published:2020,
        
        // }
    ],
    categories: [],
    // filter: [],
    // error: false,
    // message: "",
    loading:false,
    
}
const cardIntialState: CartState = {    
    cart: [],
    quantity: 0
   
}
const authIntialState: AuthState = {
    name: 'John Smith',
    login: 'example@mail.com',
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
     ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
     quis ipsum. Proin mollis pellentesque nulla ac varius.` ,
    pass: "string",
    token:"string", 
}

const workSlice = createSlice({
    name: 'work',
    initialState: workIntialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setCatalog: (state, action) => {
            state.catalog = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },     
        showLoading: (state, action) => {
            state.loading = action.payload;
        },     
    },

})

const authSlice = createSlice({
    name: 'auth',
    initialState: authIntialState,
    reducers: {
        setAbout: (state, action) => {
            state.about = action.payload;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setPass: (state, action) => {
            state.pass = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },       
    },

})
const cartSlice = createSlice({
    name: 'cart',
    initialState: cardIntialState,
    reducers: {        
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },        

    },

})
export default function Foo(){return<></>}  // пустышка для билда

export const { setPage, setCatalog, setCategories,showLoading } = workSlice.actions;
export const { setCart,  setQuantity } = cartSlice.actions;
export const { setAbout, setLogin, setPass, setName, setToken} = authSlice.actions;
export {  authSlice, cartSlice,  workSlice };