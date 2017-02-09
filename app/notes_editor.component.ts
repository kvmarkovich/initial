import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Component({
    selector: 'notes-editor',
    templateUrl: '/app/notes_editor.component.html'
})
export class NotesEditorComponent {
    section: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.params
            .map(params=>params["name"])
            .subscribe(section=>this.section=section);
    }

    setSection(section: string) {
        // this.section = section;
        this.router.navigate([section]);
    }

}