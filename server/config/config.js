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