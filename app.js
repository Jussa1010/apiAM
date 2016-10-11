var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = module.exports = express(),
    Noticias = require('./models/noticias');


//Conexao com o mongoDB
mongoose.connect('mongodb://localhost/api',function(err){
    if(err){
        console.log('Erro ao conectar ao mogodb: '+err);
    }
});

app.use(bodyParser.urlencoded({ extended:true }));
var port = '3000';


//Rotas
var router = express.Router();

router.get('/', function(req,res){
    res.json({message: 'API Lyra'})
});

router.route('/noticias')
    .get(function(req,res){
        Noticias.find(function(err, dados){
            if(err){
                res.send(err);
            }
            res.json(dados)
        })
    })

    .post(function(req,res){
        var noticias = new Noticias();
        noticias.titulo = req.body.titulo;
        noticias.corpo  = req.body.corpo;
        noticias.autor  = req.body.autor;
        noticias.data   = req.body.data;
        noticias.data   = req.body.imagem;
        noticias.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'Noticia cadastrada com suceso'});
        });
    });

app.use('/api', router);

app.listen(port, function(){
    console.log('Servidor rodando na porta: '+port);
});

