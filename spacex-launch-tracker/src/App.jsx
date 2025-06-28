import { Routes, Route } from 'react-router-dom';
import { SpaceXProvider } from './context/SpaceXContext';
import HomePage from './pages/HomePage';
import LaunchDetailPage from './pages/LaunchDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RocketDetailPage from './pages/RocketDetailPage';
import './App.css'
import { Header } from './components/Header';

function App() {

  return (
    <SpaceXProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/launch/:launchId" element={<LaunchDetailPage />} />
            <Route path="/rocket/:rocketId" element={<RocketDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </div>
    </SpaceXProvider>
  )
}

export default App;
