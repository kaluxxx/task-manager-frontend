import AccountAddPage from "@/pages/account/account-add-page.tsx";
import AccountListPage from "@/pages/account/account-list-page.tsx";
import AccountUpdatePage from "@/pages/account/account-update-page.tsx";
import TaskAddPage from "@/pages/task/task-add-page.tsx";
import TaskListPage from "@/pages/task/task-list-page.tsx";
import TaskUpdatePage from "@/pages/task/task-update-page.tsx";

export const routes = [
    {
        path: "/",
        element: <TaskListPage />,
    },
    {
        path: "/tasks",
        element: <TaskListPage />,
    },
    {
        path: "/tasks/new",
        element: <TaskAddPage />,
    },
    {
        path: "/tasks/:id",
        element: <TaskListPage />,
    },
    {
        path: "/tasks/:id/update",
        element: <TaskUpdatePage />,
    },
    {
        path: "/tasks/:id/delete",
        element: <TaskListPage />,
    },
    {
        path: "/accounts",
        element: <AccountListPage />,
    },
    {
        path: "/accounts/new",
        element: <AccountAddPage />,
    },
    {
        path: "/accounts/:id/update",
        element: <AccountUpdatePage />,
    },
];
