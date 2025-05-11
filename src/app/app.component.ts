import { Component, OnInit } from '@angular/core';
import { MobilesService } from './mobiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor( private ms:MobilesService){}
  title:any;
  mobiles:any=null;
  showform=false;
  formheader='';
  mobileName:any;
  price:any;
  ram:any;
  storage:any;
  id=null;


  ngOnInit(): void {
     this.getMobiles()
  }
  getMobiles(){
    this.ms.fetchMobile().subscribe(
      (data)=> {
        this.mobiles = data
      }
   )
  }
  // deleteMobile(id: any) {
  //   this.ms.deleteMobile(id).subscribe(
  //     (res: any) => {
  //     this.getMobiles();
  //   });
  // }

  deleteMobile(id: any) {
    console.log("Deleting ID:", id);
    this.ms.deleteMobile(id).subscribe((res: any) => {
      console.log("Deleted:", res);
      this.getMobiles();
    });
  }

  openform(data:any=null){
    this.showform = true;
    if(data){
      this.mobileName = data.name;
      this.price = data.price;
      this.ram = data.ram;
      this.storage = data.storage;
      this.id = data.id;
      this.formheader="Edit Mobile"
    }
    else {
      this.id = null;
      this.formheader = " Add Mobile"
    }
  }

  closeform(){
    this.showform=false
    this.clearform()
  }

  clearform(){
      this.mobileName = null;
      this.price = null;
      this.ram = null;
      this.storage = null;
  }

  saveMobile(){
      this.showform = false;

      let body:any = {
        name:this.mobileName,
        price: this.price,
        ram: this.ram,
        storage:this.storage
      }

      if(this.id){
        body['id'] = this.id ; 

        this.ms.putMobile(body).subscribe(
          (res:any) => {
              this.getMobiles()
          }
        )
      }
      else {
        this.ms.postMobile(body).subscribe(
          (res:any) => {
            this.getMobiles()
          }
        )
      }
  }
}
