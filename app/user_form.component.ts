/**
 * Created by kmarkovych on 09.02.2017.
 */

import {Component} from "@angular/core";
import {User} from "./model/user";
@Component({
    selector: "user-form",
    templateUrl: "/app/user_form.component.html",
    styles: [`
    input.ng-touched.ng-invalid {
        background-color: #ffe8f1;
    }
`]

})

export class UserFormComponent {
    user: User = new User();
}
