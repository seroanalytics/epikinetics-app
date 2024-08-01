import type {LinksFunction} from "@remix-run/node";
import {
    Links,
    Meta, MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration, useParams,
} from "@remix-run/react";

import globalStyles from "./styles/global.css?url";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import {Col, Container, Row} from "react-bootstrap";
import React, {useMemo, useReducer} from "react";
import usePersistedState from "./hooks/usePersistedState";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import {initialState, rootReducer, RootContext} from "./RootContext";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: bootstrap},
    {rel: "stylesheet", href: globalStyles},
];

export const meta: MetaFunction = () => [{title: "Epikinetics"}];

export function Layout({children}: { children: React.ReactNode }) {
    const [theme, setTheme] = usePersistedState("theme", "dark");
    const [appState, dispatch] = useReducer(
        rootReducer,
        initialState(),
        () => initialState()
    );

    const contextValue = useMemo(() => ({state: appState, dispatch}), [appState, dispatch])

    return (
        <html lang="en" data-bs-theme={theme} className="h-100">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="h-100">
        <TopNav theme={theme} setTheme={setTheme}></TopNav>
        <Container fluid className="h-100">
            <RootContext.Provider value={contextValue}>
                <Row>
                    <Sidebar/>
                    <Col className={"pt-2"}>{children}</Col>
                </Row>
            </RootContext.Provider>
        </Container>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
