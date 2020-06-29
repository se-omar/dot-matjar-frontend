
export default class PhotoModel {

    constructor() {
    this.product_id="";
    this.category_id="";
    this.bussiness_id="";
    this.pending_status="";
    this.product_name="";
    this.product_code="";
    this.HS_code="";
    this.min_unit_per_order="";
    this.describtion="";
    this.unit_price="";
    this.size="";
    this.color ="";
    this.unit_weight="";
    this.main_picture="";
    this.extra_picture1="";
    this.extra_picture2="";
    this.availability="";
    this.product_rating="";

    }


    static fromDbrow(serverRow) {
        let model = new PhotoModel();
        model.product_id = serverRow.product_id;
        model.category_id = serverRow.category_id ;
        model.bussiness_id = serverRow.bussiness_id;
        model.pending_status = serverRow.pending_status;
        model.product_name = serverRow.product_name;
        model.product_code = serverRow.product_code;
        model.HS_code = serverRow.HS_code;
        model.min_unit_per_order = serverRow.min_unit_per_order;
        model.describtion = serverRow.describtion;
        model.unit_price = serverRow.unit_price;
        model.size = serverRow.size;
        model.color = serverRow.color;
        model.unit_weight = serverRow.unit_weight;
        model.main_picture = serverRow.main_picture;
        model.extra_picture1 = serverRow.extra_picture1;
        model.extra_picture2 = serverRow.extra_picture2;
        model.availability = serverRow.availability;
        model.product_rating = serverRow.product_rating;
        return model;
    }
    //==instance Method
    //====new PhotoModel
    toDbrow() {
        let serverRow = {};
        model.product_id = serverRow.product_id;
        model.category_id = serverRow.category_id;
        model.bussiness_id = serverRow.bussiness_id;
        model.pending_status = serverRow.pending_status;
        model.product_name = serverRow.product_name;
        model.product_code = serverRow.product_code;
        model.HS_code = serverRow.HS_code;
        model.min_unit_per_order = serverRow.min_unit_per_order;
        model.describtion = serverRow.describtion;
        model.unit_price = serverRow.unit_price;
        model.size = serverRow.size;
        model.color = serverRow.color;
        model.unit_weight = serverRow.unit_weight;
        model.main_picture = serverRow.main_picture;
        model.extra_picture1 = serverRow.extra_picture1;
        model.extra_picture2 = serverRow.extra_picture2;  
        model.availability = serverRow.availability;
        model.product_rating = serverRow.product_rating;
        
        return serverRow;
    }

}