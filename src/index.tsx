import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import "./internationalization/i18n"; // import i18n (needs to be bundled ;))
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route} from 'react-router-dom';
import {GlobalStyle} from "./globalStyle";
import Theme from "./views/components/theme";
import App from "./views/components/app";
import {CssBaseline} from "@material-ui/core";
import initWorkboxRefresh from '@loopmode/cra-workbox-refresh'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <GlobalStyle/>
                <CssBaseline/>
                <Theme>
                    <Suspense fallback="">
                        <App/>
                    </Suspense>
                </Theme>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// function renderRefreshUI(registration, { refresh }) {
//     const el = document.createElement('div');
//     document.body.appendChild(el);
//
//     ReactDOM.render(<div onClick={refresh}>Вышла новая версия. Обновить?</div>, document.getElementById(el));
// }

serviceWorker.register({
         onUpdate: registration => {
             alert("New Version")
             console.log("New Version")
             return initWorkboxRefresh(registration, {render: () => alert("New Version")});
         }
})


//
// serviceWorker.register({//https://www.npmjs.com/package/@loopmode/cra-workbox-refresh
//         onUpdate: registration => initWorkboxRefresh(registration, { render: renderRefreshUI })
//     }
//     //https://stackoverflow.com/questions/55245427/create-react-app-reload-on-service-worker-update
//     // onUpdate: registration => {
//     //     alert('New version available!  Ready to update?');
//     //     if (registration && registration.waiting) {
//     //         registration.waiting.postMessage({ type: 'SKIP_WAITING' });
//     //     }
//     //     window.location.reload();
// );
