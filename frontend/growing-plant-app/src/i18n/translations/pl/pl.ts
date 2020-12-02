const pl = {
    translations: {
        title: 'Plant app',
        pages: {
            home: 'strona główna',
            contact: 'kontakt',
            myAccount: 'moje konto',
            myDevices: 'moje urządzenia',
            shop: 'sklep',
            addDevice: 'dodaj urządzenie',
            adminPanel: 'panel admina',
            about: 'o nas',
            error404: 'strona nie znalezniona'
        },
        shop: {
            NewReleases: 'nowości',
            basket: 'koszyk',
            discounts: 'promocje'
        },
        contact: {
            faq: 'FaQ',
            helpline: 'infolinia',
            message: 'wiadomość'
        },
        action: {
            login: 'zaloguj się',
            logout: 'wyloguj się',
            add: 'dodaj',
            register: 'zarejestruj się',
            cancel: 'anuluj',
            ok: 'ok'
        },
        forms: {
            login: {
                title: 'zaloguj się',
                username: 'nazwa użytkownika',
                password: 'hasło',
                save: 'zapamiętaj',
                forgottenPassword: 'zapomiałeś hasła?',
            },
            register: {
                title: 'zarejestruj się',
                confirmPassword: 'potwierdz hasło',
                isAcceptedDocument: 'akceptuje regulamin',
                email: 'email',
                lastName: 'nazwisko',
                firstName: 'imię'
            },
            addDevice: {
                title: 'Dodaj urządzenie',
                text: 'Proszę podać kod aktywacyjny',
            },
            errors: {
                wrongLenghtUsername: 'niepoprawna długość nazwy użytkownika(8-20 znaków)',
                wrongLenghtPassword: 'niepoprawna długość hasła(8-20 znaków)',
                wrongLenghtEmail: 'niepoprawna długość emailu(5-50)',
                wrongLenghtFirstName: 'niepoprawna długość imienia(2-30)',
                wrongLenghtLastName: 'niepoprawna dłogość nazwiska(2-30)',
                isRequired: 'jest wymagane',
                noStartOrEndWithSpace: 'nie może zaczynać się lub kończyć spacją',
                matchPassword: 'hasła nie pasują do siebie',

            }
        },
        errors: {
            loginDefault: 'nie udało się zalogować spróbuj jeszcze raz',
            activeAccount: 'błedny token'
        },
        successes: {
            loginDefault: 'witamy!',
            registerText: 'Sprawdz email w celu potwierdzenia rejestracji',
            registerTitle: 'rejestracja przebiegła pomyślnie',
            activeAccount: 'Konto zostało aktywowane'
        },
        footer: 'stopka'
    }
};

export default pl;