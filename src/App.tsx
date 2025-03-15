import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Detail } from './pages/Detail';
import { Top } from './pages/Top';
import { SearchProvider } from './context/SearchContext';
import Login from './pages/Login';
import { authenticateUser } from './util/auth';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Create from './pages/Create';
import Update from './pages/Update';
import { MenuProvider } from './context/MenuContext';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log(isAuthenticated);
    if (authenticateUser(email, password)) {
      setIsAuthenticated(true);
    } else {
      alert('ログインに失敗しました。');
    }
  };

  return (
    <div className="App">
      <AuthProvider>
        <MenuProvider>
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Top />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/:year/:month/:day/:post_key" element={<Detail />} />
                {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>*/}
                <Route path="/post" element={<Create />} />
                <Route path="/post/:post_key" element={<Update />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </MenuProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
