import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import { SearchProvider } from './context/SearchContext';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <MenuProvider>
          <SearchProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SearchProvider>
        </MenuProvider>
      </AuthProvider> 
    </div>
  );
}

export default App;
