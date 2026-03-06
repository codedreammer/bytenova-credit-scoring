
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewEvaluation from './pages/NewEvaluation';
import History from './pages/History';
import Methodology from './pages/Methodology';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#F5F7FA] overflow-hidden text-gray-900 font-inter">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-8 py-10">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewEvaluation />} />
            <Route path="/history" element={<History />} />
            <Route path="/methodology" element={<Methodology />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;