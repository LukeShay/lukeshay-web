import o from"@rollup/plugin-auto-install";import p from"@rollup/plugin-commonjs";import i from"@rollup/plugin-node-resolve";import r from"@rollup/plugin-strip";import{terser as e}from"rollup-plugin-terser";import t from"rollup-plugin-typescript2";export{default as typescript}from"rollup-plugin-typescript2";const l=(t,l,u=[])=>{u=[o(),p(),i(),...u];const m=[];return t.debug||u.push(r(),e()),l.main&&m.push({file:l.main,format:"cjs"}),l.module&&m.push({file:l.module,format:"esm"}),l.umd&&m.push({file:l.umd,format:"umd"}),l.iife&&m.push({file:l.iife,format:"iife"}),delete t.debug,{input:l.input,output:m,external:[...Object.keys(l.dependencies||{})],plugins:u}},u=o=>l({},o,[t({tsconfig:"./tsconfig.json"})]);export{l as createRollupConfig,u as createTypescriptRollupConfig};
