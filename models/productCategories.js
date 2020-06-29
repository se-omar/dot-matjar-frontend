export default class productCategories {
    constructor() {
        this.category_id = '';
        this.category_name = '';
        this.description = '';
        this.picture = '';
        this.has_products = '';
    }

    static fromDbRow(serverRow) {
        let model = new productCategories;
        model.category_id = serverRow.category_id;
        model.category_name = serverRow.category_name;
        model.description = serverRow.description;
        model.picture = serverRow.picture;
        model.has_products = serverRow.has_products;
    }

    toDbRow() {
        let serverRow = {};
        serverRow.category_name = this.category_name;
        serverRow.description = this.description;
        serverRow.picture = this.picture;
        serverRow.has_products = this.has_products;

        return serverRow;
    }
}