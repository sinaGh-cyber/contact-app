import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import routes from './routes';

function App() {
  return (
    <main className="App">
      <ToastContainer theme='colored' />
      <Routes>
        {routes.map((rout) => {
          return (
            <Route path={rout.path} element={rout.element} key={rout.id} />
          );
        })}
      </Routes>
    </main>
  );
}

export default App;
