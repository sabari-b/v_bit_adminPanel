// ProtectedRoute.js
// import React from 'react';
// import { Link, Route } from 'react-router-dom';
// import { useAuth } from '../auth/authcontext';

// const ProtectedRouteLogin = ({ component: Component, ...rest }) => {
//   const { isLoggedIn } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? <Component {...props} /> : <Link to="/" />
//       }
//     />
//   );
// };

// export default ProtectedRouteLogin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteLogin = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setIsLoggedIn(false);
            return navigate('/dashboard');
        }
            setIsLoggedIn(true);   
    }
    useEffect(() => {
            checkUserToken();
        },);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRouteLogin

