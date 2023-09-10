import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DnaValidationService {
  validateDna(dnaArray: string[]): boolean {
    // Verificar si todas las cadenas tienen la misma longitud
    const firstLength = dnaArray[0].length;
    if (!dnaArray.every((dna) => dna.length === firstLength)) {
      return false;
    }

    // Verificar si solo contienen las letras A, G, T y C
    const regex = /^[AGTC]+$/;
    if (!dnaArray.every((dna) => regex.test(dna))) {
      return false;
    }

    return true;
  }
}






