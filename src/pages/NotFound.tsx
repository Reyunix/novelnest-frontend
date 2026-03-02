import { Link } from "react-router-dom";

export const NotFound = (): React.JSX.Element => {
  return (
    <section>
      <h1>404 - Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  );
};
