"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("@rollup/plugin-auto-install")),r=e(require("@rollup/plugin-commonjs")),u=e(require("@rollup/plugin-node-resolve")),p=e(require("@rollup/plugin-strip")),i=require("rollup-plugin-terser"),o=require("rollup-plugin-typescript2");const l=(e,o=[])=>{const l={input:e.input,output:[],external:[...Object.keys(e.dependencies||{})],plugins:[t(),r(),u(),p(),i.terser(),...o]};return e.cjs&&l.output.push({file:e.cjs,format:"cjs"}),e.esm&&l.output.push({file:e.esm,format:"esm"}),e.umd&&l.output.push({file:e.umd,format:"umd"}),e.iife&&l.output.push({file:e.iife,format:"iife"}),l};Object.defineProperty(exports,"typescript",{enumerable:!0,get:function(){return o.typescript}}),exports.createRollupConfig=l,exports.createTypescriptRollupConfig=e=>l(e,[typescript({tsconfig:"./tsconfig.json"})]);
