import { FeedbackState } from "../../../components/FeedbackState";

export const BookRequestError = ({
  message,
  retry,
}: {
  message: string;
  retry: () => Promise<void>;
}) => (
  <FeedbackState title={message} error>
    <button className="button button-secondary" onClick={() => void retry()}>
      Reintentar
    </button>
  </FeedbackState>
);
