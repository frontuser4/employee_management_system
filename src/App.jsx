import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const allPages = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={allPages} />
    </>
  );
}

export default App;
