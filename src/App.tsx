import './App.css';
import Header from './components/Header/Header';
import Marketplace from './pages/Marketplace/Marketplace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

function App() {
  const toast = useRef<Toast | null>(null);

  const show = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Спасибо!',
      detail: 'Вы успешно оформили заказ! Мы с вами свяжемся в ближайшее время!',
    });
  };
  return (
    <>
      <Router>
        <Toast ref={toast} />
        <Header show={show} />
        <Routes>
          <Route path={'/'} element={<Marketplace />} />
          <Route path={'/marketplace'} element={<Marketplace />} />
          <Route path={'*'} element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
