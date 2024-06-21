import {Navbar} from "flowbite-react";

import {Link, useLocation} from "react-router-dom";

export function Navigation() {
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
                        base: "mx-auto flex flex-row justify-between items-center",
                    },
                },
                link: {
                    base: "text-white",
                    active: {
                        on: "text-white",
                        off: "text-gray-400",
                    },
                },
            }}
        >
            <Navbar.Brand as={Link} className="text-3xl mx-0" to="/">
                Task Manager
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" active={isActiveLink("/")}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/tasks" active={isActiveLink("/tasks")}>
                    Tasks
                </Navbar.Link>
                <Navbar.Link
                    href="/accounts"
                    active={isActiveLink("/accounts")}
                >
                    Accounts
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
