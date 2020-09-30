const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');
const usuario = require('../models/usuario');

//============================
//Mostrar todas los productos
//============================

app.get('/productos', verificaToken, (req, res) => {

    let limit = req.query.limit || 5

    Producto.find({})
        .limit(limit)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        });

});

//============================
//Mostrar un producto por ID
//============================

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
});
//============================
//Buscar productos
//============================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })
        });
});




//============================
//Crear nuevo producto
//============================

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return resstatus(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

//============================
//Actualizar productos
//============================

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let nuevoProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    }

    Producto.findByIdAndUpdate(id, nuevoProducto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return resstatus(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

//============================
//Desacticar producto
//============================

app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let nuevoEstado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, nuevoEstado, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Producto borrado'
        });
    });
});

module.exports = app;