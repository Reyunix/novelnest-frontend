import type { Item } from "../schemas/apiResponseSchema"

interface Props {
    bookItem: Item
}
export const BookCard:React.FC<Props> = ({bookItem}) => {
    const toSecureUrl = (url?: string) => url?.startsWith("http:") ? url.replace(/^http:/,"https:"): url
    const book = bookItem.volumeInfo
    const NOT_AVAILABLE_INFO = "no disponible"
    const secureSmallThumbnail= toSecureUrl(book?.imageLinks?.smallThumbnail)
    const secureThumbnail= toSecureUrl(book?.imageLinks?.thumbnail)
    const secureCanonicalLink = toSecureUrl(book?.canonicalVolumeLink)
    const secureBookLinks = {
      ...book, 
      imageLinks: {
        smallThumbnail: secureSmallThumbnail, 
        thumbnail: secureThumbnail}, 
      canonicalVolumeLink: secureCanonicalLink}
    
    console.log((secureBookLinks))
  return (    
    <div className="book-card">
        <h3>{secureBookLinks?.title ?? "Título no disponible"}</h3>
        <p>Autores: {secureBookLinks?.authors?.join(", ") ?? NOT_AVAILABLE_INFO}</p>
        <img src={secureBookLinks?.imageLinks?.smallThumbnail} alt="" />
        <p>Categorías: {secureBookLinks?.categories?.join(", ") ?? NOT_AVAILABLE_INFO}</p>
        <p>Editorial: {secureBookLinks?.publisher ?? NOT_AVAILABLE_INFO}</p>
        {secureBookLinks?.publishedDate && <p>Fecha de publicación: {String(secureBookLinks.publishedDate ?? NOT_AVAILABLE_INFO)}</p>}
        <p>Páginas: {book?.pageCount ?? NOT_AVAILABLE_INFO}</p>
    </div>
  )
}
