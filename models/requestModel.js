export default class requestModel {
    constructor() {
        this.requests_id = '';
        this.request_number = '';
        this.request_status = '';
        this.request_details = '';
        this.request_date = '';
    }

    static fromDbRow(serverRow) {
        let model = new requestModel();
        model.request_number = serverRow.request_number;
        model.request_status = serverRow.request_status;
        model.request_details = serverRow.request_details;
        model.request_date = serverRow.request_date;
    }

    toDbRow() {
        let serverRow = {}
        serverRow.request_number = this.request_number;
        serverRow.request_status = this.request_status;
        serverRow.request_details = this.request_details;
        serverRow.request_date = this.request_date;

        return serverRow;
    }
}