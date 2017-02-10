/**
 * Created by kmarkovych on 09.02.2017.
 */

import {Component, Directive, Attribute} from "@angular/core";
import {User} from "./model/user";
import {NG_VALIDATORS, AbstractControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
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


    constructor( private http:Http, private router:Router) {
    }

    onSubmit() {
        this.http.post("users", this.user).subscribe(res=>{
            this.router.navigateByUrl("");
        });
    }

}

@Directive({
    selector: '[validateEqual][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EqualToValidator, multi: true
    }]
})
export class EqualToValidator {
    constructor(@Attribute("validateEqual") public validateEqual: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        let v = c.value;
        let e = c.root.get(this.validateEqual);
        // subscribe to future changes in password
        e.valueChanges.subscribe((val: string) => {
                if (val != v) c.setErrors({validateEqual: false});
                else c.setErrors(null);
            }
        );
        if (e && v !== e.value) return {validateEqual: false};
        return null;
    }

}