import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import Loader from "./component/loader/Loader";

function App() {
  const allPages = createBrowserRouter(routes);
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={allPages} />
    </Suspense>
  );
}

export default App;
