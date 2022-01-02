export class Auth
{
    /**
     * @type {[string:key]:[Function,string]}
     */
    static RegisterFields = {
        "name": [
            form => /[A-ZŞşİiÇçÖöÜüĞğİı\. ]{2,64}/i.test(form.name),
            "İsim formatı uygun değil"
        ],
        "surname": [
            form => /[A-ZŞşİiÇçÖöÜüĞğİı\. ]{2,64}/i.test(form.surname),
            "Soyisim formatı uygun değil"
        ],
        "email": [
            form => /^.*?@.*?\..*?$/i.test(form.email),
            "Mail formatı uygun değil"
        ],
        "password": [
            form => /^.{6,24}$/i.test(form.password),
            "Şifrenin karakter sayısı 6 ila 24 arasında olmalıdır"
        ],
        "passwordVerif": [
            form => form.password === form.passwordVerif,
            "Şifreler birbiriyle uyuşmuyor"
        ]
    };
    static RegisterValidation(form){
        let mapping = Object.entries(Auth.RegisterFields) as Array<string>[];
        for(let name in Auth.RegisterFields)
        {
            let priv = Auth.RegisterFields[name];
            if(!priv[0](form))
            {
                return priv[1];
            }
        };
        return false;
    }
}