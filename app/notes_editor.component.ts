import {Component, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {NotesComponent} from "./notes.component";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Component({
    selector: 'notes-editor',
    templateUrl: '/app/notes_editor.component.html'
})
export class NotesEditorComponent {
    section: string;
    @ViewChild(NotesComponent) notesComponent:NotesComponent;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.params
            .map(params=>params["name"])
            .subscribe(section=>this.section=section);
    }

    setSection(section: string) {
        this.router.navigate([section]);
    }

}