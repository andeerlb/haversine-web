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
            this.requestSucess().then(() => {
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
            {
              swal(
                'Deletado!',
                'Seu registro foi excluido com sucesso!',
                'success'
              );
            }
          }
        ).catch(
          e => {
            swal.hideLoading();
            this.requestError('Não foi possível excluir o registro.');
          }
        )
    });
  }

  private requestSucess(): Promise<SweetAlertResult> {
    return swal({
      type: 'success',
      title: 'Sucesso...',
      text: 'Cadastro realizado com sucesso!',
    });
  }

  private requestError(msgError: string): Promise<SweetAlertResult> {
    return swal({
      type: 'error',
      title: 'Desculpe...',
      text: msgError
    });
  }
}