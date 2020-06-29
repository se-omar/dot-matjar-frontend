export default class usersModel {
    constructor() {
        this.user_id = '';
        this.user_type = '';
        this.email = '';
        this.national_number = '';
        this.full_arabic_name = '';
        this.password = '';
        this.mobile_number = '';
        this.gender = '';
        this.full_english_name = '';
        this.birthdate = '';
        this.qualification = '';
        this.job = '';
        this.governorate = '';
        this.village = '';
        this.center = '';
        this.phone_number = '';
        this.fax = '';
        this.facebook_account = '';
        this.linkedin = '';
        this.website = '';
        this.address = '';
    }

    static fromDbRow(serverRow) {
        let model = new usersModel();
        model.user_id = serverRow.user_id;
        model.user_type = serverRow.user_type;
        model.email = serverRow.email;
        model.national_number = serverRow.national_number
        model.full_arabic_name = serverRow.full_arabic_name;
        model.password = serverRow.password;
        model.mobile_number = serverRow.mobile_number;
        model.gender = serverRow.gender;
        model.full_english_name = serverRow.full_english_name;
        model.birthdate = serverRow.birthdate;
        model.qualification = serverRow.qualification;
        model.job = serverRow.job;
        model.governorate = serverRow.governorate;
        model.village = serverRow.village;
        model.center = serverRow.center;
        model.phone_number = serverRow.phone_number;
        model.fax = serverRow.fax;
        model.facebook_account = serverRow.facebook_account;
        model.linkedin = serverRow.linkedin;
        model.website = serverRow.website;
        model.address = serverRow.address;
    }

    toDbRow() {
        let serverRow = {}
        serverRow.user_type = this.user_type;
        serverRow.email = this.email;
        serverRow.national_number = this.national_number;
        serverRow.full_arabic_name = this.full_arabic_name;
        serverRow.password = this.password;
        serverRow.mobile_number = this.mobile_number;
        serverRow.gender = this.gender;
        serverRow.full_english_name = this.full_english_name;
        serverRow.birthdate = this.birthdate;
        serverRow.qualification = this.qualification;
        serverRow.job = this.job;
        serverRow.governorate = this.governorate;
        serverRow.village = this.village;
        serverRow.center = this.center;
        serverRow.phone_number = this.phone_number;
        serverRow.fax = this.fax;
        serverRow.facebook_account = this.facebook_account;
        serverRow.linkedin = this.linkedin;
        serverRow.website = this.website;
        serverRow.address = this.address;

        return serverRow;
    }
}