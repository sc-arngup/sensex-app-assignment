import { Component,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-entry-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss']
})
export class EntryModalComponent {
  open=null;
  close=null;
  @Output() addEntry=new EventEmitter<{Open:number,Close:number}>();
  @Output() closeModal=new EventEmitter<void>();
  // submit(){
  //   if(this.open!=null && this.close!=null){
  //     this.addEntry.emit({Open:+this.open,Close:+this.close});
  //     this.open=null;
  //     this.close=null;
  //   }
  // }
  submit(form:NgForm){
    if(this.open!=null && this.close!=null){
      this.addEntry.emit({Open:+this.open,Close:+this.close});
      this.open=null;
      this.close=null;
      form.resetForm();
    }
  }
  cancel(){
    this.closeModal.emit();
  }
}
