import './App.scss';
import Header from './components/Header/Header';
import Marketplace from './pages/Marketplace/Marketplace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'primereact/resources/themes/viva-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import MemoizedProduct from './pages/Product/Product';
import MemoizedQuestion from './components/Question/Question';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-J38TYSRN41');
    ReactGA.send('pageview');
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={'/'} element={<Marketplace />} />
          <Route path={'/marketplace'} element={<Marketplace />} />
          <Route path={'/product/:id'} element={<MemoizedProduct />} />
          <Route path={'*'} element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <MemoizedQuestion />
    </>
  );
}

export default App;
