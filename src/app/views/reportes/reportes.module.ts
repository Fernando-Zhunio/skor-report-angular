import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ReportRoutingModule } from './report-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BarSearchModule } from '../../modules/bar-search/bar-search.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BitacorasComponent } from './bitacoras/bitacoras.component';



@NgModule({
  declarations: [IndexComponent, CreateOrEditComponent, BitacorasComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    BarSearchModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ReportesModule { }
