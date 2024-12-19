import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/** @type {import('rollup').RollupOptions} */
export default {
    input: 'index.js',
    output: [
        {
            format: /** @type {import('rollup').ModuleFormat} */ ('commonjs'),
            file: 'dist/cjs/index.js',
            sourcemap: true
        },
        {
            format: /** @type {import('rollup').ModuleFormat} */ ('esm'),
            file: 'dist/es/index.js',
            sourcemap: true
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs()
    ]
};