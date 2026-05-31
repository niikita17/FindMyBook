import { Navigate } from "react-router-dom";

import { getUser } from "../utils/auth"
function AdminRoute({ children }) {
    const user = getUser();

    if (!user) {
        return <Navigate to="/" />;
    }

    if (user?.role !== "Admin") {
        return <Navigate to="/home" />;
    }

    return children;
}

export default AdminRoute;