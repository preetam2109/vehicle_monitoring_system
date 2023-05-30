import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from 'src/app/helper/base';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public output : any;
  base:any;
  UserDetail:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.base = Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
  }
  home(){
    this.router.navigateByUrl("home");
  }

  sms_send(){
    this.router.navigateByUrl("sms-send");
  }
  check_login() {
    if (localStorage.getItem("ltn")) {
      this.router.navigateByUrl("UserProfile");
    } else {
      Swal.fire({
        text: 'Not logged in? Go to login page.',
        // text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
        // cancelButtonText: 'No'
      }) 
      .then((ltn) => {
          if (ltn.isConfirmed == true) {
           this.router.navigateByUrl("login");
           
          }
        });
    }
   
  }

  whatsapp_send(){
    this.router.navigateByUrl("whatsapp-send");
  }
  
  addToCart() {
      // this.router.navigateByUrl("order");

    // if (localStorage.getItem("ltn")) {
    //   this.router.navigateByUrl("order");
    // } else if (localStorage.getItem("tbl_order_items")?.length != 0 || localStorage.getItem("tbl_order_items")?.length != null) {
    //   this.router.navigateByUrl("order");
    // } else {
    //   this.router.navigateByUrl("login");
    // }
  }

}
