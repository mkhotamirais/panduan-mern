import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Prev } from "./components/Components";

const ErrorBoundary = () => {
  const error = useRouteError();

  let content;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <div>This page does not exist!</div>;
    } else if (error.status === 401) {
      content = <div>You are not authorized to see this</div>;
    } else if (error.status === 503) {
      content = <div>Looks like our API is down</div>;
    } else if (error.status === 418) {
      content = <div>🫖</div>;
    } else content = <div>Something went wrong</div>;
  }

  return (
    <section className="flex flex-col gap-5 justify-center items-center w-full min-h-screen">
      <div className=" italic text-2xl">{content}</div>
      <Link to="/" className="text-blue-500 flex  items-center gap-1 hover:underline">
        <Prev />
      </Link>
    </section>
  );
};
export default ErrorBoundary;
