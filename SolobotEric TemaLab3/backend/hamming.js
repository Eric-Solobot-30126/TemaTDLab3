
function decode(bits) {
  parity = function (number) {
    return number % 2;
  };

  // Trebuie salvat valoarea din txtBox

  var numberOfBites = 4;

  // Decalrare valori blanao rau


  var numberOfLinesForH = Math.log(8) / Math.log(2);
  var changeRate;
  var numberFromHammingMatrix = 0;
  var counter = 0;
  var H;
  var Z;
  var errorPosition;
  var errorDetected = false;

  // Declarare functii logice

  function SAU(nmb1,nmb2){

    return !(nmb1 == 0 && nmb2 == 0)
    
  }

  function SI(nmb1,nmb2){

    return (nmb1 == 1 && nmb2 == 1)
    
  }

  // Generare mare matrice Hamming

  for(var i = 1  ; i <= numberOfBites; i++){

    changeRate = pow(2,numberOfLinesForH - i);
    numberFromHammingMatrix = 0;

    for(var j = 1 ; j <= numberOfLinesForH; j++){

      counter ++;

      if(counter > changeRate){
        counter = 0;
        if(numberFromHammingMatrix == 0)
          numberFromHammingMatrix = 1;
        else
          numberFromHammingMatrix = 0;
      }

      H[i][j] = numberFromHammingMatrix;

    }

  }

  // Initializare vector Z cu val 0

  for(var i = 1; i<=numberOfLinesForH ; i++)
    Z(i) = 0;

  // Calcul vectorului Z

  for(var i = 1; i<=numberOfLinesForH ; i++){

    for(var j = 2; j<=numberOfBites-1; j++){

      Z[i] = SAU(Z[i] , SI(H[i,j] , bits[j-2])) ; 

    }

  }

  // Detectarea erorii daca este

  for(var i = 1; i<=1; i++){

    errorPosition += Z(i) * pow(w,i-1);

  }

  // Verificam daca sunt erori

  if (errorPosition != 0) errorDetected = true;

  // Rezolvam eroarea gasita

  if (errorDetected) {
    bits[errorPosition - 1] = parity(bits[errorPosition - 1] + 1);
  }

  return {
    errorCorrected: errorDetected,
    errorPosition: errorPosition - 1,
    bits: bits,
  };
}
exports.decode = decode;
