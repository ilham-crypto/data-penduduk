const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 2000;

// vuew engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'ilham',
    password: '0000',
    database: 'DB_PENDUDUK'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('SELECT*FROM data_penduduk', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'DATA-PENDUDUK',
            data: hasil
        });
    });
});

index.post('/penduduk', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var ALAMAT = req.body.inputALAMAT;
    var TTL = req.body.inputTTL;
    var GOLONGAN_DARAH = req.body.inputGOLONGAN_DARAH;
    var TELEPON = req.body.inputTELEPON;
    koneksi.query('INSERT INTO data_penduduk(NAMA, ALAMAT, TTL, GOLONGAN_DARAH, TELEPON)values(?,?,?,?,?)',
    [NAMA, ALAMAT, TTL, GOLONGAN_DARAH, TELEPON],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

index.get('/hapus-NAMA/:NAMA', (req, res) => {
    var NAMA = req.params.NAMA;
    koneksi.query("DELETE FROM data_penduduk WHERE NAMA=?",
         [NAMA], (err, hasil) => {
             if(err) throw err;
             res.redirect('/');
         }
    )
});

index.listen(port, () => {
    console.log(`app DATA PENDUDUK berjalan pada port ${port}`);
});

