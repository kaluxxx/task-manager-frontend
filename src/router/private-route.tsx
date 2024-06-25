import { Navigate } from 'react-router-dom';
import {useAppSelector} from "@/hook.ts";
import {selectIsAuthenticated} from "@/features/authentication-slice.ts";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
