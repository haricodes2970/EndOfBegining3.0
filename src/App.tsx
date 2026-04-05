import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chronicles from './pages/Chronicles';
import Pantheon from './pages/Pantheon';
import Vault from './pages/Vault';
import Echoes from './pages/Echoes';
import Memories from './pages/Memories';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/chronicles" element={<Chronicles />} />
        <Route path="/pantheon"   element={<Pantheon />}   />
        <Route path="/vault"      element={<Vault />}      />
        <Route path="/echoes"     element={<Echoes />}     />
        <Route path="/memories"   element={<Memories />}   />
      </Routes>
    </BrowserRouter>
  );
}
