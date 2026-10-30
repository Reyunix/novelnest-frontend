import { FeedbackState } from "../../../components/FeedbackState";

export const BookRequestError = ({
  title = "No se pudo cargar el contenido",
  message,
  retry,
}: {
  title?: string;
  message: string;
  retry: () => Promise<void>;
}) => (
  <FeedbackState title={title} error>
    <p>{message}</p>
    <button className="button button-secondary" onClick={() => void retry()}>
      Reintentar
    </button>
  </FeedbackState>
);
