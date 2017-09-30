import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Bank } from "../../models/bank";
import { Food } from "../../models/food";
import { FooditemService } from "../../services/fooditem";
import { Router } from "@angular/router";
import { LgaService } from "../../services/lga";
import * as Moment from 'moment';
import { DATEFORMAT } from "../../shared/format";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private supplier: any = {};
  private food$: Observable<Array<Food>>;
  private banks$: Observable<Array<Bank>>;
  dtOptions: any = {};

  constructor(
    private router: Router,
    private fooditemService: FooditemService,
    private lgaService: LgaService
  ) { }

  ngOnInit() {
    this.food$ = this.fooditemService.getAll();
    const that = this;
    this.dtOptions = {
      processing: true,
      serverSide: true,
      dom: '<f<t>p>',
      pagingType: 'simple',
      orderable: false,
      ajax: (data, callback, settings) => {
        this.fooditemService.datatable(data)
          .subscribe((response) => {
            callback(response);
          });
      },
      rowCallback: (row: Node, data: any[] | Object | any, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.router.navigate(['/caterer/view',data.id])
        });
        return row;
      },
      columns: [
        {
          data: 'firstname',
          width: '20%',
          orderable: true,
        },
        {
          data: 'lastname',
          width: '20%',
          orderable: true,
        },
        {
          data: 'phone',
          width: '20%',
          orderable: false,
        },
        {
          data: 'createdAt',
          width: '30%',
          orderable: true,
          render: function (data, type, row, meta: any) {
            return Moment(data).calendar(null, DATEFORMAT);
          }
        }
      ],
      order: [[3, 'desc']],
      lengthMenu: [20, 30, 50],
      pageLength: 20,
      autoWidth: false,
      deferRender: true,
      stateSave: true,
      scrollX: true,
      scrollY: 'auto'
    };
  }
  
  onSubmit() {
    console.log(this.supplier);
    this.fooditemService.createFood(this.supplier).subscribe((response) => {
      // this.router.navigate( ['/'] );
      console.info(response);
    }, (reason) => {
      console.warn(reason);
    })
  }
}
