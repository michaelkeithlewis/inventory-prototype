import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CasesPage } from './components/CasesPage';
import { PacksPage } from './components/PacksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/cases" replace />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="packs" element={<PacksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
