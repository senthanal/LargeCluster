module.exports = ({
    file,
    options,
    env
}) => ({
    plugins: {
        'postcss-cssnext': {},
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
        'cssnano': env === 'production' ? {} : false
    }
});