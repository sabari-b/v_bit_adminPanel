import Dashboard from "./Dashboard";
import ProtectedRoute from "../auth/ProtectRoute";
import SidebarLayout from "./sidebar";


const DashboardRenderer = () => {
   const gettoken = localStorage.getItem('token')

    if (gettoken) {
        // Render unprotected Dashboard if user query parameter is present
        return < SidebarLayout />;
    } else {
        // Render protected Dashboard if no user query parameter is present
        return <ProtectedRoute><Dashboard/></ProtectedRoute>
        // return <Dashboard/>
    }
}

export default DashboardRenderer;