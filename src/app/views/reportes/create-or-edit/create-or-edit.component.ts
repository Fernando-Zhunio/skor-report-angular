import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Report } from '../../../class/Report';
import { StandartService } from '../../../services/standart.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  form_report: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    fecha: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    observacion:new FormControl(),
  });
  constructor(
    private ngx_spinner: NgxSpinnerService,
    private activated_route: ActivatedRoute,
    private s_standart: StandartService,
    private location: Location,
    private router:Router,

  ) {}

  state: "create" | "edit" = "create";
  title: string = "Creando Report";
  // permissions: IpermissionSystem[] = [];
  // permission_otorgados:IpermissionSystem[]= [];
  // permission_filter: IpermissionSystem[] = [];
  search_permission: string = "";
  // role: IrolSystem = new IrolSystem();
  report:Report = new Report();
  // role.permission = []
  ngOnInit(): void {
    // this.role.permissions =[];

    this.ngx_spinner.show();
    this.activated_route.data.subscribe((data) => {
      if (data.isEdit) {
        this.title = "Editando Rol";
        this.state = "edit";
        const id = Number.parseInt(
          this.activated_route.snapshot.paramMap.get("id")
        );
        this.s_standart
          .show("admin/roles/" + id + "/edit")
          .subscribe(
            (res: {
              success: boolean;
              data:Report;
            }) => {
              // deber ir primero para quitarle los que ya estan
              this.report = res.data;
              // this.permission_filter = this.permissions;
              // this.role = res.data.role;
              const { name, fecha, description,observacion, nivel } = this.report;
              this.form_report.setValue({ name,fecha,description,observacion,nivel });

              // this.role.permissions.forEach((item) => {
              //   this.iniciatePermissions(item.id)
              // });

              // this.permission_otorgados = this.permissions;
              this.ngx_spinner.hide();
            }
          );
      }
      // else {
        // this.s_standart.show("admin/roles/create").subscribe((res) => {
        //   // this.permissions = res.data;
        //   // res.data.map((item) => {
        //   //   this.permissions.push({ ...item, active: false });
        //   // });
        //   // this.report = res.data;
        //   // console.log(this.report);
        //   // this.permission_filter = this.permissions;
        //   this.ngx_spinner.hide();
        // });
      // }
    });
  }

  // drop(event: CdkDragDrop<IpermissionSystem[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     // console.log('move');
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  returnItem(id): void {
    // const index = this.role.permissions.findIndex((x) => x.id == id);
    // if (index != -1) {
    //   this.permissions.push(this.role.permissions[index]);
    //   this.role.permissions.splice(index, 1);
    //   this.permissionsFilter();
    // }
  }

  permissionsFilter() {
    // if (this.search_permission.trim() != null)
    //   this.permission_filter = this.permissions.filter((x) =>
    //     x.title.toUpperCase().includes(this.search_permission.toUpperCase())
    //   );
    // else this.permission_filter = this.permissions;
    // console.log(this.permission_filter,search);

    // return permission_filter;
  }

  transferDataItem(id): void {
    // const index = this.permissions.findIndex((x) => x.id == id);
    // if (index != -1) {
    //   this.role.permissions.push(this.permissions[index]);
    //   this.permissions.splice(index, 1);
    //   this.permissionsFilter();
    // }
  }

  iniciatePermissions(id) {
    // const index = this.permissions.findIndex((x) => x.id == id);
    // if (index != -1) {
    //   // this.role.permissions.push(this.permissions[index]);
    //   this.permissions.splice(index, 1);
    // }
  }

  saveInServer(): void {
    if(this.state == "create"){
      let data = this.captureData()
      if(data){
        this.ngx_spinner.show();
        console.log(data);
        this.s_standart.store("admin/roles",data).subscribe(res=>{
          console.log(res);
          this.ngx_spinner.hide();
          this.router.navigate(['administracion-sistema/roles']);
        })
      }
    }
    else{
      if(this.state == "edit"){
        let data = this.captureData()
       if(data){
         console.log(data);
         this.s_standart.updatePut("admin/roles/"+this.report.id,data).subscribe(res=>{
           console.log(res);
           this.ngx_spinner.hide();
          this.router.navigate(['administracion-sistema/roles']);

         })
       }
      }
    }
  }

  captureData(){
    if(this.form_report.invalid){
      // this.form_user;
      this.form_report.markAllAsTouched();
      SwalService.swalToast("Tiene campos por llenar","warning");
      return false;
    }
    // let IdsRoles = this.roles.filter((x:any) => x.active == true).map((obj:any)=> obj.id)
    // console.log({roles:IdsRoles,companies:IdsCompany,...this.form_user.value});

    // if(this.role.permissions.length < 1){
    //   SwalService.swalToast("Asigne un rol al nuevo usuario","warning");
    //   return false;
    // }
    // let IdsCompany = this.companies.child.filter((x:any)=>x.active == true).map((obj:any)=>obj.id)
    // if(IdsCompany.length < 1){
    //   SwalService.swalToast("Asigne una compa??ia al nuevo usuario","warning");
    //   return false;
    // }
    // let permissionsIds;
    // if(this.role.permissions.length > 0){
    //    permissionsIds = this.role.permissions.map(item=>{
    //     return item.id;
    //   })

    // }

    return {...this.form_report.value}
    // console.log('roles', IdsRoles);
    // console.log('companies', IdsCompany);
    // console.log('form', this.form_user.value);
  }

  goBack(){
    this.location.back();
  }

}
