type Item ={
    id:number,
    authors: Author[],
    name:string
    categories:Category[],
    language:string,
    esteemes:number,
    raiting:number,
    description:string,
    price:number,
    curency:Curency,
    published:number
}

type Curency ={
    id:number,    
    name:string    
}
type Category ={
    id:number,    
    name:string    
}
type Author ={
    id: number,
    name: string, 
    birth: number,
    death: number,       
}
type  User ={   
    id:number,
    name:string
    description: string,
    email: string,
    pass: string, 
  }
  
  type Raiting ={
    id: number,
    user: User,      
    book: Item,      
    value: number   
  }
  
// type IBookPayload ={
//     id:number,
//     name: string,
//     categories:ICategoryPayload[],
//     language: string,
//     price: number,
//     curency: string,
//     published: number,
//     authors:IAuthorPayload[],
//     raiting:number,
//     user:IUserPayload,    
//   }

//   export interface ICategoryPayload {  
//     id: number;
//     name: string;              
//   }
  
//   export interface IRaitingPayload {
//     id:number,
//     user: IUserPayload,      
//     book: IBookPayload,      
//     raiting: number,
//   }

//   export interface IAuthorPayload {  
//     id: number;
//     name: string; 
//     birth: number,
//     death: number,                
//   }

//   export interface IUserPayload{     
//     name:string,
//     description:string,
//     email: string,
//     pass:string,
//   }

  