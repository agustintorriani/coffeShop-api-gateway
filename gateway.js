const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 4003;

// Middleware de registro de solicitudes
const loggerMiddleware = (req, res, next) => {
    console.log(`Se solicitó la siguiente URL: ${req.url}`);
    next(); // Pasa el control al siguiente middleware
  };
  
// Uso del middleware en la aplicación
app.use(loggerMiddleware);

// Configuración del proxy para la API de usuarios
app.use('/api/usuarios', createProxyMiddleware({
  target: 'http://localhost:4001/api/usuarios',
  changeOrigin: true,
}));


//Otra forma de inicializar y usar el proxy
const proxyProductos = createProxyMiddleware({
    target: 'http://localhost:4002/api/productos',
    changeOrigin: true,
  });
  
app.use('/api/productos', proxyProductos);



app.listen(port, () => {
  console.log(`API Gateway corriendo en http://localhost:${port}`);
});
