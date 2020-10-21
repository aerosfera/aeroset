// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route} from 'react-router-dom';
import Version from "./views/components/Version";
import Auth from "./views/components/auth/Auth";
import {ThemeProvider} from "styled-components";
//import {PersistGate} from 'redux-persist/lib/integration/react';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <Route exact path="/version" component={Version}/>
                <Route exact path="/auth" component={Auth}/>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
