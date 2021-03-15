import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarSearchComponent } from '../../components/bar-search/bar-search.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [BarSearchComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  exports:[BarSearchComponent]
})
export class BarSearchModule { }
