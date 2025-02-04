import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Detail } from './pages/Detail';
import { Top } from './pages/Top';
import { SearchProvider } from './context/SearchContext';
import Login from './pages/Login';
import { authenticateUser } from './util/auth';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './middleware/ProtectedRoute';
import Create from './pages/Create';

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
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Top />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/:year/:month/:day/:post_key" element={<Detail />} />
              {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>*/}
              <Route path="/create" element={<Create />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
