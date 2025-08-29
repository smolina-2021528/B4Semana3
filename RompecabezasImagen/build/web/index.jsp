<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Juego de Rompecabezas</title>
        <link rel="stylesheet" href="css/estilo.css">
    </head>
    <body>
        <div class="container">
            <h1>Rompecabezas 4x4</h1>
            <p>Haz clic en un número adyacente al espacio vacío para moverlo</p>

            <p id="timer">Tiempo restante: 00:10</p>
            
            <div class="juego">
                <div id="puzzle" class="puzzle"></div>
                <div class="referencia">
                    <img src="Image/imagencompleta.jpeg" alt="Imagen de referencia">
                </div>
            </div>

            <p id="mensaje"></p>
            <button onclick="reiniciar()">Reiniciar</button>
        </div>

        <div id="estado-emoji"></div>

        <script src="js/script.js"></script>
    </body>
</html>
