
//import { AuthProvider } from './context/AuthContext';


import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/HomeComponet/MainPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* After login */}
      <Route path="/home" element={
        <Home />
      } />
      <Route path="/book/:id" element={<BookDetails />} />

    </Routes>
  );
}

export default App;
