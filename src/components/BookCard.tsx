import type{ Item } from "../../../shared/schemas/apiResonpeSchema"

interface Props {
    bookItem: Item
}
export const BookCard:React.FC<Props> = ({bookItem}) => {
    const book = bookItem.volumeInfo
    const NOT_AVAILABLE_INFO = "no disponible"
  return (
    
    <div className="book-card">
        <h3>{book?.title ?? "Título no disponible"}</h3>
        <p>Autores: {book?.authors?.join(", ") ?? NOT_AVAILABLE_INFO}</p>
        <img src={book?.imageLinks?.smallThumbnail} alt="" />
        <p>Categorías: {book?.categories?.join(", ") ?? NOT_AVAILABLE_INFO}</p>
        <p>Editorial: {book?.publisher ?? NOT_AVAILABLE_INFO}</p>
        {book?.publishedDate && <p>Fecha de publicación: {String(book.publishedDate ?? NOT_AVAILABLE_INFO)}</p>}
        <p>Páginas: {book?.pageCount ?? NOT_AVAILABLE_INFO}</p>
    </div>
  )
}
