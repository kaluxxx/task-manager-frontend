import AccountAddPage from "@/pages/account/account-add-page.tsx";
import AccountListPage from "@/pages/account/account-list-page.tsx";
import AccountUpdatePage from "@/pages/account/account-update-page.tsx";
import TaskAddPage from "@/pages/task/task-add-page.tsx";
import TaskListPage from "@/pages/task/task-list-page.tsx";
import TaskUpdatePage from "@/pages/task/task-update-page.tsx";
import RegisterPage from "@/pages/authentication/register-page.tsx";
import PrivateRoute from "@/router/private-route.tsx";
import LoginPage from "@/pages/authentication/login-page.tsx";

export const routes = [
    {
        path: "/",
        element: <PrivateRoute element={<TaskListPage/>}/>,
    },
    {
        path: "/tasks",
        element: <PrivateRoute element={<TaskListPage/>}/>,
    },
    {
        path: "/tasks/new",
        element: <PrivateRoute element={<TaskAddPage/>}/>,
    },
    {
        path: "/tasks/:id",
        element:  <PrivateRoute element={<TaskListPage/>}/>,
    },
    {
        path: "/tasks/:id/update",
        element:  <PrivateRoute element={<TaskUpdatePage/>}/>,
    },
    {
        path: "/tasks/:id/delete",
        element:  <PrivateRoute element={<TaskListPage/>}/>,
    },
    {
        path: "/accounts",
        element:  <PrivateRoute element={<AccountListPage/>}/>,
    },
    {
        path: "/accounts/new",
        element:  <PrivateRoute element={<AccountAddPage/>}/>,
    },
    {
        path: "/accounts/:id/update",
        element: <PrivateRoute element={<AccountUpdatePage/>}/>,
    },
    {
        path: "register",
        element: <RegisterPage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
    {
        path: "*",
        element: <PrivateRoute element={<TaskListPage/>}/>,
    }
];
