import AddContact from './components/AddContact/AddContact';
import EditContact from './Pages/EditContact/EditContact';
import HomePage from './Pages/HomePage/HomePage';
import NotFound from './Pages/NotFound/NotFound';

const routes = [
  { path: '/edit/:id', element: <EditContact />, id: 0 },
  { path: '/add', element: <AddContact />, id: 1 },
  { path: '/', element: <HomePage />, id: 2 },
  { path: '*', element: <NotFound />, id: 3 },
];
export default routes;
