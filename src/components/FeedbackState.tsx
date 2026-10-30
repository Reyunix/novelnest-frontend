import type { ReactNode } from "react";

export const FeedbackState = ({
  title,
  children,
  error = false,
}: {
  title: string;
  children?: ReactNode;
  error?: boolean;
}) => (
  <div
    className={`feedback-state${error ? " feedback-state--error" : ""}`}
    role={error ? "alert" : "status"}
  >
    <h2>{title}</h2>
    {children}
  </div>
);
