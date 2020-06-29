
export default class PhotoModel {

    constructor() {
        this.category_id="";
    this.category_name="";
    this.bussiness_name="";
    this.description="";
    this.logo="";
    this.banner="";
    this.number_of_embloyees="";
    this.HQ_governorate="";
    this.bussiness_activity="";
    this.enterprice_national_number="";
    this.commercial_register="";
    this.tax_card ="";
    this.operating_license="";

    }


    static fromDbrow(serverRow) {
        let model = new PhotoModel();
        model.category_id = serverRow.category_id;
        model.category_name = serverRow.category_name ;
        model.bussiness_name = serverRow.bussiness_name;
        model.description = serverRow.description;
        model.logo = serverRow.logo ;
        model.banner = serverRow.banner;
        model.number_of_embloyees = serverRow.number_of_embloyees;
        model.HQ_governorate = serverRow.HQ_governorate ;
        model.bussiness_activity = serverRow.bussiness_activity;
        model.enterprice_national_number = serverRow.enterprice_national_number;
        model.commercial_register = serverRow.commercial_register ;
        model.tax_card = serverRow.tax_card;
        model.operating_license = serverRow.operating_license;
        
        return model;
    }
    //==instance Method
    //====new PhotoModel
    toDbrow() {
        let serverRow = {};
        serverRow.category_id = this.category_id
        serverRow.category_name = this.category_name
        serverRow.bussiness_name = this.bussiness_name
        serverRow.description = this.description
        serverRow.logo = this.logo
        serverRow.banner = this.banner
        serverRow.number_of_embloyees = this.number_of_embloyees
        serverRow.HQ_governorate = this.HQ_governorate
        serverRow.bussiness_activity = this.bussiness_activity
        serverRow.enterprice_national_number = this.enterprice_national_number
        serverRow.commercial_register = this.commercial_register
        serverRow.tax_card = this.tax_card
        serverRow.operating_license = this.operating_license
        return serverRow;
    }

}

