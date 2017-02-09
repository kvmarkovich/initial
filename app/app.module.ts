import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent}   from './app.component';
import {NotesComponent, NotesFilterPipe} from './notes.component';
import {SectionsComponent, SectionFilterPipe} from "./sections.component";
import {DragulaModule} from "ng2-dragula/ng2-dragula";


@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, DragulaModule],
    declarations: [AppComponent, NotesComponent, SectionsComponent, SectionFilterPipe, NotesFilterPipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}