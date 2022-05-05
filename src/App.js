import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <section className="container">
        <ToastContainer
          theme="colored"
          rtl
          style={{
            fontSize: '2rem',
          }}
        />
        <Routes>
          {routes.map((rout) => {
            return (
              <Route path={rout.path} element={rout.element} key={rout.id} />
            );
          })}
        </Routes>
      </section>
    </div>
  );
}

export default App;
