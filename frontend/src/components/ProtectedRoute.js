import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, logged, ...props }) => {
  return logged ? <Component {...props} /> : <Navigate to='/sign-in' replace />;
};

export default ProtectedRoute;
