const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express();
const port = 3000; 


app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());


app.post('/api/isMutant', (req, res) => {
 
  const dna = req.body; 
  const isMutantResult = isMutant(dna);


  console.log('Datos recibidos:', isMutantResult);

if(isMutantResult){
  res.status(200).json({ message: 'Es mutante' })
}else{
  res.status(200).json({ message: 'No es Mutante' });

  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

function isMutant(dna) {
  const n = dna.length;

  // Función para verificar secuencias horizontales
  function checkHorizontal() {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= n - 4; j++) {
        if (
          dna[i][j] === dna[i][j + 1] &&
          dna[i][j] === dna[i][j + 2] &&
          dna[i][j] === dna[i][j + 3]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Función para verificar secuencias verticales
  function checkVertical() {
    for (let i = 0; i <= n - 4; i++) {
      for (let j = 0; j < n; j++) {
        if (
          dna[i][j] === dna[i + 1][j] &&
          dna[i][j] === dna[i + 2][j] &&
          dna[i][j] === dna[i + 3][j]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Función para verificar secuencias diagonales
  function checkDiagonal() {
    for (let i = 0; i <= n - 4; i++) {
      for (let j = 0; j <= n - 4; j++) {
        if (
          dna[i][j] === dna[i + 1][j + 1] &&
          dna[i][j] === dna[i + 2][j + 2] &&
          dna[i][j] === dna[i + 3][j + 3]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Verificar todas las direcciones
  if (checkHorizontal() || checkVertical() || checkDiagonal()) {
    return true;
  }

  return false;
}
