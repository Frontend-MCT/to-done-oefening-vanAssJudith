const path = require('path');

module.exports = {
    mode: 'production',
    output: {
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve
                (__dirname, './src/js/lib/**')],
                loader: 'babel-loader'
            }
        ]
    }
};