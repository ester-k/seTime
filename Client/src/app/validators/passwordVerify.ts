import { ValidatorFn, FormGroup } from '@angular/forms';

export function PasswordVerify(password:string,verifyPassword:string):ValidatorFn{
    return(form:FormGroup):{[key:string]:any}|null=>
    {
        if(form.controls[password].value.trim()==form.controls[verifyPassword].value.trim())
        return null;
        return {passwordError:'הסיסמה שהזנת אינה תואמת'}
    }
}