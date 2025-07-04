import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { EntryModalComponent } from '../entry-modal/entry-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EntryModalComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  stocks:any[]=[];
  currentPage=1;
  hasNextPage=false;
  showModal=false;
  constructor(private api:ApiService,private auth:AuthService,private socketService:SocketService){}
  ngOnInit(){
    if(!this.auth.isLoggedIn()){
      this.auth.logout();
      return;
    }
    this.fetchPage(this.currentPage);

    this.socketService.onNewStock().subscribe(()=>{
      this.fetchPage(this.currentPage);
    })
  }
  fetchPage(page:number){
    this.api.getSensexData(page).subscribe({
      next:(data)=>{
        this.stocks=data.stocks;
        this.hasNextPage=data.hasNextPage;
        this.currentPage=page;
      },
      error:(err)=>console.error(err)
    })
  }
  nextPage(){
    if(this.hasNextPage)this.fetchPage(this.currentPage+1);
  }
  prevPage(){
    if(this.currentPage>1)this.fetchPage(this.currentPage-1);
  }
  addNewEntry(entry:{Open:number;Close:number}){
    this.api.addSensexEntry(entry).subscribe({
      next: ()=>{
        this.showModal=false;
        this.fetchPage(1);
      },
      error:(err)=>console.error(err)
    })
  }
  logout(){
    this.auth.logout();
  }
}