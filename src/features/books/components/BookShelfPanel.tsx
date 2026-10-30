import type { UserBookStatus } from "../schemas/books.schemas";

export const BookShelfPanel = ({
  id,
  title,
  status,
  pending,
  onChange,
}: {
  id: number;
  title: string;
  status: UserBookStatus;
  pending: boolean;
  onChange: (status: UserBookStatus) => void;
}) => (
  <label className="reading-status" htmlFor={`status-${id}`}>
    <span>Estado de lectura</span>
    <select
      id={`status-${id}`}
      aria-label={`Estado de lectura de ${title}`}
      value={status}
      disabled={pending}
      onChange={(event) => onChange(event.target.value as UserBookStatus)}
    >
      <option value="want_to_read">Quiero leer</option>
      <option value="reading">Leyendo</option>
      <option value="completed">Leído</option>
      <option value="abandoned">Abandonado</option>
    </select>
  </label>
);
