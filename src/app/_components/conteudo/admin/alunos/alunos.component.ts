import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { AlunoNota } from '@app/_models/alunoNota';
import { Aluno } from '@app/_models/aluno';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '@app/_services/data.service';
import { ServidorService } from '@app/_services/servidor.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

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


  constructor(private router: Router, private modalService: BsModalService, private toastr: ToastrService,
          private data: DataService, private servidor: ServidorService) { }

  modalRef: BsModalRef;
  delete: any;
  public alunos: Aluno[] = [];


  ngOnInit() {
    this.servidor.get('Aluno').then(lista => {
        this.alunos = lista;
        console.log(lista);
      });
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  openModal(template: TemplateRef<any>, dele) {
    this.delete = dele;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {

    const numero = this.delete.nome;
    const index = this.alunos.map(x => {
      return x.nome;
    }).indexOf(numero);

    this.alunos.splice(index, 1);
    this.modalRef.hide();
    this.toastr.success('Removido com sucesso');
  }

  decline(): void {
    this.modalRef.hide();
  }

  editar(objeto: any) {
    this.data.objeto = objeto;

    this.router.navigate(['editar-aluno']);

  }

}
