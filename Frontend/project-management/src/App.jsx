import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "./Authentication/Sidebar"
import TopNavbar from "./Authentication/TopNavbar"
import ProjectsDetails from "./Components/ProjectsDetails"
import ProjectPage from './Components/ProjectPage'

export default function App() {
  return (
    <Router>
      <div className="h-screen">
        {/* Sidebar stays fixed */}
        <Sidebar />

        {/* Main content offset by sidebar width */}
        <div className="ml-64 flex flex-col h-full ">
          <TopNavbar />

          {/* Main page content changes based on route */}
          <Routes>
            <Route path="/" element={<ProjectsDetails />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
