import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteItemComponent } from './notes/notes-list/note-item/note-item.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import {MaterialModule} from "./material.module";
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteStartComponent } from './notes/note-start/note-start.component';
import {CommonModule} from "@angular/common";
import {ShortenPipe} from "./shared/shorten.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './navigation/footer/footer.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteItemComponent,
    HeaderComponent,
    NotesComponent,
    NoteDetailsComponent,
    NoteEditComponent,
    NoteStartComponent,
    ShortenPipe,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
