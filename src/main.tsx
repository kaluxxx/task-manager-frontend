import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";

import {Toaster} from "@/components/ui/toaster.tsx";
import {store} from "@/store.ts";

import App from "./app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </React.StrictMode>,
);
