import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { BookInterface } from '../../../models/book';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface} from '../../../models/user';
import { auth } from 'firebase';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  private books: BookInterface[];
  private isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles);
          this.isAdmin = this.isAdmin.hasOwnProperty('admin');
        })
      }
    })
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books =>{
      this.books = books;
    });
  }

  onDeleteBook(idBook: string): void{
    console.log("Delete Book", idBook);
    const confirmacion = confirm("Are you sure?");
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }
    
  }

  onPreUpdateBook(book: BookInterface){
    console.log('BOOK', book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
