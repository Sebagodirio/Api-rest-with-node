const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');
const usuario = require('../models/usuario');

//============================
//Mostrar todas las categorias
//============================

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            })
        });

});

//============================
//Mostrar una categoria por ID
//============================

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoria) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria
        })
    });
});

//============================
//Crear nueva categoria
//============================

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return resstatus(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//============================
//Actualizar categoria
//============================

app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let nuevaCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, nuevaCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return resstatus(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//============================
//Actualizar categoria
//============================

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    });
});

module.exports = app;