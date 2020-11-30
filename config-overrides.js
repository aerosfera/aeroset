const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
const rewireStyledComponents = require('react-app-rewire-styled-components');
require('react-app-rewire-typescript');
require('fork-ts-checker-webpack-plugin');
const path = require('path');

const {
    override,
    getBabelLoader,
    addWebpackModuleRule
} = require('customize-cra')
require('@pmmmwh/react-refresh-webpack-plugin');

/* config-overrides.js */
module.exports = (config, env) => {
    config = rewireStyledComponents(config, env);

    if (env === "production") {
        console.log("Production build - Adding Workbox for PWAs");
        const workboxConfig = {
            ...defaultInjectConfig,
            swSrc: path.join(__dirname, 'src', 'custom-sw.js'),
        }
        config = rewireWorkboxInject(workboxConfig)(config, env);
    }

    const babelLoader = getBabelLoader(config);

    return override(
        addWebpackModuleRule({
            test: /\.worker\.ts$/,
            use: [
                {
                    loader: 'comlink-loader',
                    options : {
                        singleton : true
                    }
                },
                {
                    loader: babelLoader.loader,
                    options: babelLoader.options
                }
            ]
        }
        )
    )(config, env)
}