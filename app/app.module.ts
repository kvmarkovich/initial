import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent}   from './app.component';
import {NotesComponent, NotesFilterPipe} from './notes.component';
import {SectionsComponent, SectionFilterPipe} from "./sections.component";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {Routes, RouterModule} from "@angular/router";
import {PageNotFoundComponent} from "./page_not_found.component";
import {NotesEditorComponent} from "./notes_editor.component";
import {ViewSectionComponent} from "./view_section.component";
import {NotesServerService} from "./services/notes_server.service";

const appRoutes: Routes = [
    { path: 'viewSection/:name', component: ViewSectionComponent },
    { path: ':name', component: NotesEditorComponent },
    {path: '', component: NotesEditorComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, DragulaModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, NotesComponent, SectionsComponent, SectionFilterPipe, NotesFilterPipe,
        NotesEditorComponent, PageNotFoundComponent, ViewSectionComponent],
    providers: [NotesServerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}