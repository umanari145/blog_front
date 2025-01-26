import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Detail } from './pages/Detail';
import { Top } from './pages/Top';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path={`/`} Component={Top} />
            <Route path={`/category/:category_query`} Component={Top} />
            <Route path={`/tag/:tag_query`} Component={Top} />
            <Route path={`/:year_query/:month_query`} Component={Top} />
            <Route path={`/:year/:month/:day/:post_key`} Component={Detail} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </div>
  );
}

export default App;
