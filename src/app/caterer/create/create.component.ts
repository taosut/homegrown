import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Bank } from "../../models/bank";
import { Lga } from "../../models/lga";
import { CatererService } from "../../services/caterer";
import { Router } from "@angular/router";
import { LgaService } from "../../services/lga";
import { BankService } from "../../services/bank";
import { SchoolService } from "../../services/school";
import { HttpErrorResponse } from "@angular/common/http";
import { School } from "../../models/school";
import { Caterer } from '../../models/caterer';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public caterer: any = new Caterer();
  public lgas$: Observable<Array<Lga>>;
  public banks$: Observable<Array<Bank>>;
  public schools$: Observable<Array<School>>;
  public progressLoading = false;
  public alert = {
    visible: false,
    status: null,
    message: ''
  }

  constructor(
    private router: Router,
    private catererService: CatererService,
    private lgaService: LgaService,
    private schoolService: SchoolService,
    private bankService: BankService
  ) { }

  ngOnInit() {
    this.lgas$ = this.lgaService.getAll();
    this.banks$ = this.bankService.getAll();
    this.schools$ = null; 
    this.schoolService.getAll();
  }
  
  selectSchools(lga){
    this.schools$ = this.schoolService.getLga(lga);
  }
  onSubmit() {
    let that = this;
    this.progressLoading = true;
    that.alert = {
      visible: false,
      status: null,
      message: ''
    };
    this.catererService.createCaterer(this.caterer)
    .subscribe((data) => {
      that.caterer = new Caterer();
      that.alert = {
        visible: true,
        status: 200,
        message: ''.concat('A new caterer has been created.')
      };
      that.progressLoading = false;
      console.info(data);
    }, (error: HttpErrorResponse) => {
      that.progressLoading = false;
      if (error.error instanceof Error) {
        that.alert = {
          visible: true,
          status: error.status,
          message: ''.concat('An error occurred:', error.error.message)
        };
      } else {
        that.alert = {
          visible: true,
          status: error.status,
          message: ''.concat('An error occurred:', error.error.data.invalidAttributes[Object.keys(error.error.data.invalidAttributes)[0]][0].message)
        };
      }
    }, () => {
      that.progressLoading = false;
    });
    
  }
}
