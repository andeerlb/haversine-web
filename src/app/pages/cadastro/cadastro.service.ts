import { Injectable } from '@angular/core';
import swal, { SweetAlertResult } from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public alertRequest(req: Observable<any>, callBack: Function): void {
    swal({
      title: 'Cadastrando...',
      text: 'Por favor, aguarde... Estamos processando sua solicitação.',
      onOpen: () => {
        swal.showLoading();
        req.subscribe(
          c => {
            swal.hideLoading();
            this.requestSucess('Cadastro realizado com sucesso!').then(() => {
              callBack();
            });
          },
          e => {
            swal.hideLoading();
            this.requestError('Não foi possível finalizar o cadastro!');
            console.error(e);
          }
        )
      }
    });
  }

  deleteConfirm(req: Observable<any>): Promise<any> {
    return swal({
      title: 'Você tem certeza?',
      text: 'Essa ação não pode ser revertida!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete',
      cancelButtonText: 'Não, cancelar'
    }).then((result) => {
      if (!result.value) {
        return Promise.reject(result.dismiss);
      }

      return req.toPromise()
        .then(
          () => {
            return this.requestSucess('Seu registro foi excluido com sucesso!');
          }
        ).catch(
          e => {
            swal.hideLoading();
            return this.requestError('Não foi possível excluir o registro.');
          }
        )
    });
  }

  private requestSucess(msgSuccess: string): Promise<string> {
    return swal({
      type: 'success',
      title: 'Sucesso...',
      text: msgSuccess,
    }).then(() => Promise.resolve(msgSuccess));
  }

  private requestError(msgError: string): Promise<string> {
    return swal({
      type: 'error',
      title: 'Desculpe...',
      text: msgError
    }).then(() => Promise.reject(msgError));
  }
}