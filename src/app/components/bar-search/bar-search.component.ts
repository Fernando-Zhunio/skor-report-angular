import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StandartService } from '../../services/standart.service';

@Component({
  selector: 'app-bar-search',
  templateUrl: './bar-search.component.html',
  styleUrls: ['./bar-search.component.css']
})
export class BarSearchComponent implements OnInit {

  @Input() with_filter:boolean;
  @Output() isload:EventEmitter<boolean> = new EventEmitter();
  @Output() products:EventEmitter<any> = new EventEmitter();
  productSearch:string="";
  constructor(private s_standart:StandartService) { }
  @Input() pageSize= 10;
  @Input() selected_state = "all";
  @Input() min=null;
  @Input() max=null;
  @Input() url="";
  @Input() placeholder = "Escriba el nombre del producto";
  @Input() onTabs:boolean = true;

  suscription:Subscription;
  ngOnInit(): void {

    this.searchBar()
  }

  searchBar($event={pageIndex: 0,pageSize: 15,previousPageIndex: 0}){
    this.isload.emit(true);

    // console.log(this.pageEvent);
    if(this.suscription){
      this.suscription.unsubscribe();
    }
    this.gotoTop();
    this.suscription = this.s_standart
      // .search(this.productSearch, this.pageSize, this.selected_state,this.min,this.max,this.url)
      .search2(this.url,{pageSize:$event.pageSize,search:this.productSearch,page:$event.pageIndex+1,min:this.min,max:this.max,state:this.selected_state})
      .subscribe((response: any) => {
        console.log(response);
        this.isload.emit(false);
        this.products.emit(response)
      },err=>{
        this.isload.emit(false);
      });
  }

  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }

}
