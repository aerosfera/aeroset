import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route} from 'react-router-dom';
import Theme from "./views/components/theme";
import {GlobalStyle} from "./styles";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <GlobalStyle />
                <Theme>
                    <App/>
                </Theme>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
