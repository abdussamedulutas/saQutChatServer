import React, { useState } from "react";
import "./assets/style/main.scss";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import {
	store, Provider
} from "./redux/index";

import BackgroundImage from "./pages/companents/BackgroundImage";


import DateAdapter from '@mui/lab/AdapterMoment';
import {AuthenticatedRoutes, NoAuthRoutes} from "./router";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/lab";

import axios from "axios";
import moment from "moment";

axios.defaults.headers['X-Powered'] = "axios";
axios.defaults.headers['nodeus'] = navigator.language;


let { render } = require("react-dom");
document.title = "saQut Chat"

const theme = createTheme({
	typography: {
		fontFamily: [
			'Ubuntu',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	}
});


function App() {
	let {loginned} = useSelector(e => e.Auth);
	
	return <>
		<BackgroundImage />
		<BrowserRouter basename="/">
			<Switch>
				{loginned === false && NoAuthRoutes.map(({
					companent,
					path,
					exact,
					sensitive
				}, key) => {
					return <Route
						key={key}
						children={companent}
						path={path}
						sensitive={sensitive}
						exact={exact}
					/>
				})}
				{loginned === true && AuthenticatedRoutes.map(({
					companent,
					path,
					exact,
					sensitive
				}, key) => {
					return <Route
						key={key}
						children={companent}
						path={path}
						sensitive={sensitive}
						exact={exact}
					/>
				})}
			</Switch>
		</BrowserRouter>
	</>;
}

function Init() {
	return <>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<App />
				</LocalizationProvider>
			</ThemeProvider>
		</Provider>
	</>
}
render(
	<Init />,
	document.getElementById("root")
);
