import { AbstractControl, ValidationErrors } from '@angular/forms';

export class StringValidator {

    static noWhiteSpaces(control: AbstractControl): ValidationErrors | null {
        if(!control.value) {
            return null;
        }
        const regex = /^\S+$/;
        const noSpace = regex.test(control.value);
        return noSpace ? null : { containsspace: true };
    }
}
