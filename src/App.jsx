
//import { AuthProvider } from './context/AuthContext';


import { Routes, Route } from "react-router-dom";
import Login from "./Components/AuthComponent/Login";
import Home from "./pages/Home"
import Register from "./Components/AuthComponent/Register";
import AdminRoute from "./routes/AdminRoute";
import Layout from "./Layout/Layout"
import BookDetails from "./Components/BookComponent/BookDetails";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard";
import AddBook from "./Components/AdminComponent/AddBook";
import AdminBooks from "./Components/AdminComponent/AdminBooks";
import ViewMyCart from "./Components/CartCompoenet/ViewMyCart";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="book/:id" element={<BookDetails />} />

        <Route path="cart" element={<ViewMyCart />} />


      </Route>
      <Route path="/admin" element={<Layout />}>

        <Route
          index
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="books"
          element={
            <AdminRoute>
              <AdminBooks />
            </AdminRoute>
          }
        />

        <Route
          path="books/add"
          element={
            <AdminRoute>
              <AddBook />
            </AdminRoute>
          }
        />

        <Route path="/admin/books/edit/:id" element={
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        } />

      </Route>
    </Routes>
  );
}

export default App;
