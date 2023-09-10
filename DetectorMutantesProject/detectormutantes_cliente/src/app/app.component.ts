import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DnaValidationService } from './app.component.service';
import { ToastrService } from 'ngx-toastr'; 
import { ApiResponse } from './models/api-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cadenaADN: string = '';
  isValid: boolean = false;



  constructor(
    private dnaValidationService: DnaValidationService,
    private http: HttpClient,
    private toastr: ToastrService // Inyecta ToastrService
  ) {}



  validarInput(cadenaADN: string) {
   
    const dnaArray = JSON.parse(cadenaADN);
    // Utiliza el servicio para validar el ADN
    this.isValid = this.dnaValidationService.validateDna(dnaArray);

    //Si la cadena de ADN es valida realiza el envio
    if (this.isValid) {
      this.enviarADN(dnaArray);
    }
  }

  private enviarADN(dnaData: any) {

    const apiUrl = 'http://localhost:3000/api/isMutant';

    this.http.post<ApiResponse>(apiUrl, dnaData).subscribe(
      (response) => {
      
        console.log('Envío POST exitoso:', response);

       
        if (response && response.message === 'Es mutante') {
       
          this.toastr.warning('Su amigo es un mutante', 'Huya por su vida');
        }else{
          this.toastr.success('Su amigo NO es un mutante', 'Mantenga la calma');
        }
      },
      (error) => {
  
        console.error('Error en el envío POST:', error);

        this.toastr.error('Error en el servicio', 'Error');
      }
    );
  }
}
