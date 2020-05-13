const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { dropDB, inicioBD } = require('./util/iniciobbdd');

// Importando rutas
const apiRoutes = require('./routes/api/');
const authRoutes = require('./routes/auth/index');

// Conexión a BBDD
mongoose.connect(
		'mongodb://admin123:admin123@ds147518.mlab.com:47518/nlobato?retryWrites=true&w=majority', 
		{
			useNewUrlParser: true,
      useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		},
		(err) => {
			if(err) {
				console.error(err);
			} else {
				console.log('Connection to database successfully!');
				dropDB();
				inicioBD();
			}
		}
	);

// Muestra en consola las peticiones http
app.use(morgan('dev'));

// Traduce cuerpo de peticiones http
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Permite pruebas locales
app.use(cors());

app.use('/api',cors(), apiRoutes);
app.use('/auth', cors(), authRoutes);

// Configura error para ruta no especificada
app.use((req, res, next) => {
	let err = new Error('Ruta no encontrada!');
	err.status = 404;
	
	next(err);
});

// Responde si hubo algun error durante peticiones
app.use((err, req, res, next) => {

	console.log(err);

	res.status(err.status || 500).json({
		error: {
			message: err.message
		}
	});

});

module.exports = app;