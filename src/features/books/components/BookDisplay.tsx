import type { UserBookSchemaType } from "../schemas/books.schemas";

type Props = {
  userBook: UserBookSchemaType;
};
export const BookDisplay: React.FC<Props> = ({ userBook }) => {
  return (
    <div className="display-userbook">
      <img src={userBook.thumbnail ? userBook.thumbnail: ""} alt="" />
      <p>{userBook.title}</p>
      <p>Añadido: {userBook.createdAt}</p>
    </div>
  );
};
