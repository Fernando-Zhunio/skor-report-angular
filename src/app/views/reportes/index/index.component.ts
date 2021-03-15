import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandartService } from '../../../services/standart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarSearchComponent } from '../../../components/bar-search/bar-search.component';
import { MatTableDataSource } from '@angular/material/table';
import { SwalService } from '../../../services/swal.service';
import { Report } from '../../../class/Report';
import { Ipaginator } from '../../../interfaces/ipaginator';

declare let Swal: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private activated_route:ActivatedRoute, private s_standart:StandartService,private snack_bar:MatSnackBar) { }
  displayedColumns: string[] = [
    "id",
    "name",
    "fecha",
    "nivel",
    "description",
    "observacion",
  ];
  @ViewChild(BarSearchComponent) headerComponent:BarSearchComponent;
  ELEMENT_DATA: Report[] = [];
  // roles:{
  //   show:["super-admin", "admin.roles.index"],
  //   create:["super-admin", "admin.roles.create"],
  //   edit:["super-admin", "admin.roles.edit"],
  //   delete:["super-admin", "admin.roles.index"]
  // }
  // permissions:IpermissionStandart;

  dataSource = new MatTableDataSource<Report>(this.ELEMENT_DATA);
  paginator:Ipaginator<Report>;
  isload:boolean;

  ngOnInit(): void {
  //   this.activated_route.data.subscribe(data => {
  //     this.permissions=data.permissions;
  // })
  }

  refreshDataTable(data) {
    let row: Report[] = data as Report[];
    console.log(row);
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<Report>(this.ELEMENT_DATA);
  }

  loadData($event):void{
    this.paginator = $event.data;
    console.log(this.paginator);
    this.refreshDataTable(this.paginator.data);
  }

  deleteItem(id):void{
    SwalService.swalConfirmation("Eliminar","Esta seguro de eliminar este rol","warning").then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open("Eliminando rol espere ...")
        this.s_standart.destory("admin/roles/"+id).subscribe(res=>{
          if(res.hasOwnProperty("success") && res.success){
            this.snack_bar.open("Rol Eliminado con exito","OK",{duration:2000});
            this.removeItemTable(id);
          }
          else{
            this.snack_bar.open("No se a podido eliminar ","Error",{duration:2000})
          }
        },err=>{
          console.log(err);
          this.snack_bar.open("No se a podido eliminar ","Error",{duration:2000})
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

  removeItemTable(id):void{
    let index = this.ELEMENT_DATA.findIndex(x=>x.id == id);
    this.ELEMENT_DATA.splice(index,1);
    // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
    this.dataSource = new MatTableDataSource<Report>(this.ELEMENT_DATA);
}

changePaginator(event):void{
  this.headerComponent.searchBar(event);
  console.log(event);
}

}
