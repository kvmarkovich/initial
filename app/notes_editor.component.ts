import {Component} from "@angular/core";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Component({
    selector: 'notes-editor',
    templateUrl: '/app/notese_ditor.component.html'
})
export class NotesEditorComponent {
    section: string;

    setSection(section: string) {
        this.section = section;
    }

}