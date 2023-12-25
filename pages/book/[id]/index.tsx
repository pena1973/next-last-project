import Layout from "@/components/Layout/layout";
import BookItem from "@/components/BookItem/bookItem";

// запрос данных страницы
type Context = {
  params: { id: number },
  // query: { token: string }
}

// Эта функция вызывается в момент рендеринга 
// на стороне сервера  и принимает пропсы страницы 
// чтобы предварительно получить нужные данные
// params -(часть контекста) параметры страницы в которых есть Id страницы
export async function getServerSideProps(context: Context) {

  // debugger;  
  // const token = context.query.token;
  const id: number = Number(context.params.id);
  
  return { props: { id: id } }

}

interface BookProps {
  // item: Item, error: boolean, status: number
  id: number
}
export default function Book({
  // item, error, status
  id
}: BookProps) {
 
  return (
    <Layout>
      <BookItem id={id} />
    </Layout>
  );
};