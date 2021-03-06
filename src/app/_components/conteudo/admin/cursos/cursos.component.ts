import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Curso } from '../../../../_models/curso';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '@app/_services/data.service';
import { ServidorService } from '@app/_services/servidor.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public filter = '';
  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próxima',
    screenReaderPaginationLabel: 'Paginação',
    screenReaderPageLabel: 'página',
    screenReaderCurrentLabel: 'Você está na página'
  };


  constructor(private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService, private data: DataService,
    private servidor: ServidorService) { }

  public curso: Curso[] = [];
  delete: any;
  modalRef: BsModalRef;

  ngOnInit() {
   this.servidor.get('Curso').then(lista => this.curso = lista);
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  openModal(template: TemplateRef<any>, dele) {
    this.delete = dele;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {

    const numero = this.delete.idCurso;
    const index = this.curso.map(x => {
      return x.idCurso;
    }).indexOf(numero);

    const excluir = this.curso[index];
    this.servidor.delete('Curso',  excluir.idCurso ).subscribe(data => {
      this.modalRef.hide();
      this.curso.splice(index, 1);
      this.toastr.success('Removido com sucesso');
      this.router.navigate(['departamentos']);

    }, erro => {
      this.modalRef.hide();
      this.toastr.error('Servidor indisponível no momento');
    });
  }

  decline(): void {

    this.modalRef.hide();
  }

  editar(objeto: any) {
      this.data.objeto = objeto;
      this.router.navigate(['editar-curso']);
  }


}
