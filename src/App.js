import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Categories from './components/Search/Categories';
import Sort from './components/Search/Sort';
import './scss/app.scss';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <Categories />
      <Sort />
      <PizzaBlock />
    </div>
  );
}

export default App;
