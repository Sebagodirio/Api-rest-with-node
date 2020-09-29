/* 
 *
 *Puerto
 *
 */


/* Vencimineto del token */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* Seed */


process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/* Puerto */
process.env.PORT = process.env.PORT || 3000;

/* Google client */

process.env.CLIENT_ID = process.env.CLIENT_ID || '844490797071-92f1a7v67st26e3d3l4gr1lbeslst719.apps.googleusercontent.com';