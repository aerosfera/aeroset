const {rewireWorkboxInject,defaultInjectConfig} = require('react-app-rewire-workbox');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireStyledComponents(config, env);

    if (env === "production") {
        console.log("Production build - Adding Workbox for PWAs");
        const workboxConfig = {
            ...defaultInjectConfig,
            swSrc: path.join(__dirname, 'src', 'custom-sw.js'),
        }
        config = rewireWorkboxInject(workboxConfig)(config, env);
    }


    return config;
}