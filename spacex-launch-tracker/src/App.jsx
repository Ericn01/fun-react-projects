import { Routes, Route } from 'react-router-dom';
import { SpaceXProvider } from './context/SpaceXContext';
import HomePage from './pages/HomePage';
import LaunchDetailPage from './pages/LaunchDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RocketDetailPage from './pages/RocketDetailPage';
import { Header } from './components/Header';

function App() {

  return (
    <SpaceXProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 m-0 p-0">
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/launch/:launchId" element={<LaunchDetailPage />} />
            <Route path="/rockets/:rocketId" element={<RocketDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </div>
    </SpaceXProvider>
  )
}

export default App;
