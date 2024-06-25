import {Navbar} from "flowbite-react";

import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "@/hook.ts";
import {selectIsAuthenticated} from "@/features/authentication-slice.ts";

export function Navigation() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    const isActiveLink = (path: string) => {
        return location.pathname === path;
    };

    return (
        <Navbar
            rounded
            fluid
            theme={{
                root: {
                    base: "",
                    inner: {
                        base: "mx-auto flex flex-wrap items-center justify-between",
                    },
                },
                link: {
                    base: "text-white",
                    active: {
                        on: "text-white",
                        off: "text-gray-400",
                    },
                }
            }}
        >
            <Navbar.Brand as={Link} className="text-3xl mx-0" to="/">
                Task Manager
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                {isAuthenticated && (
                    <>
                        <Navbar.Link href="/tasks" active={isActiveLink("/tasks")}>
                            Tasks
                        </Navbar.Link>
                        <Navbar.Link
                            href="/accounts"
                            active={isActiveLink("/accounts")}
                        >
                            Accounts
                        </Navbar.Link>
                        <span
                            className={"cursor-pointer"}
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </span>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Navbar.Link
                            href="/login"
                            active={isActiveLink("/login")}
                        >
                            Login
                        </Navbar.Link>
                        <Navbar.Link
                            href="/register"
                            active={isActiveLink("/login")}
                        >
                            Register
                        </Navbar.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}