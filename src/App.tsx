import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';
import React, { Suspense, lazy } from 'react';
import Loadable from 'react-loadable';

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// ленивая загрузка для SSR - приложений, используется библиотека:react-loadable
const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка . . .</div>
});

const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './components/NotFoundBlock/index')
);
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка . . .</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={<LoadableComponent />} />
          <Route path='pizza/:id' element={<FullPizza />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
