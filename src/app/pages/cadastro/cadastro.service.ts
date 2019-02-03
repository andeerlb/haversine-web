import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    public alertRequest(req: Observable<any>): void {
        swal({
          title: 'Cadastrando...',
          text: 'Por favor, aguarde... Estamos processando sua solicitação.',
          onOpen: () => {
            swal.showLoading();
            req.subscribe(
              c => {
                swal.hideLoading();
                this.requestSucess();
              },
              e => {
                swal.hideLoading();
                this.requestError();
                console.error(e);
              }
            )
          }
        });
      }
    
    private requestSucess(): void {
        swal({
          type: 'success',
          title: 'Sucesso...',
          text: 'Cadastro realizado com sucesso!',
        });
      }
    
    private requestError(): void {
        swal({
          type: 'error',
          title: 'Desculpe...',
          text: 'Não foi possível finalizar o cadastro!',
        });
      }
}