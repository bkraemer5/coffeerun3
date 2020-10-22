(function (window) {
    'use strict';
    var PAYMENT_FORM_SELECTOR = '[data-payment-form="payform"]';
    var App = window.App;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var paymentFormHandler = new FormHandler(PAYMENT_FORM_SELECTOR);
    var paymentStorage = new DataStore();

    paymentFormHandler.addSubmitHandler(function (data) {
        paymentStorage.add(data);
        //$($('[data-modal="#myModal"]').data('modal')).modal();
        $("#myModal").modal();
        var $description = $('[data-payment-form="submitText"]');
        $description[0].innerText = "Thank you for your payment, " + data.title + " " + data.name + ".";
    });
})(window);