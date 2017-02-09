import {Observable} from "rxjs";
import {RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate} from "@angular/router";
import {NotesEditorComponent} from "../notes_editor.component";
import {Injectable} from "@angular/core";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Injectable()
export class CanDeactivateNote implements CanDeactivate<NotesEditorComponent> {

    canDeactivate(notesEditorComponent: NotesEditorComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const note = notesEditorComponent.notesComponent.text;
        if (note && note.length > 0) {
            return window.confirm(
                `You have entered the note.
        Do you really want to change section?`);
        } else return true;
    }
}

