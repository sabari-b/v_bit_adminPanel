import Login from "./login";
import ProtectedRoute from "../auth/ProtectRoute";




const LoginRenderer = () => {
   const gettoken=localStorage.getItem('token')

    if (gettoken) {
        // Render unprotected Dashboard if user query parameter is present
        return <ProtectedRoute><Login/></ProtectedRoute>
    } else {
        // Render protected Dashboard if no user query parameter is present
        return <Login/>
        // return <Dashboard/>
    }
}

export default LoginRenderer;