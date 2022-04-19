import EditContact from "./Pages/EditContact/EditContact";
import HomePage from "./Pages/HomePage/HomePage";
import NotFound from "./Pages/NotFound/NotFound";

const routes = [
  { path: '/', element: <HomePage/>, id: 0 },
  { path: '/edit/:id', element: <EditContact/>, id: 1 },
  { path: '/not-found', element: <NotFound/>, id: 3 },
];
export default routes;
