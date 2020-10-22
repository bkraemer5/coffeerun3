(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var firestore = App.firestore;
    var CheckList = App.CheckList;
    var checklist = new CheckList('[data-coffee-order="checklist"]');

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
    }

    RemoteDataStore.prototype.add = function (key, val) {
        var collection = firestore.collection('coffeeOrders');
        collection.add(val);
        console.log("successfully added data to firestore");
    };

    RemoteDataStore.prototype.getAll = function (cb) {
        var collection = firestore.collection('coffeeOrders');
        this.getResultsFromQuery(collection);
    };

    RemoteDataStore.prototype.getResultsFromQuery = function (query) {
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                checklist.addRow(doc.data());
                console.log(doc.data());
            });
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) { 
        // key = email address, cb = callback
        var collection = firestore.collection('coffeeOrders');
        var query = collection.where("emailAddress", "==", key);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
            });
        }).catch(function(error) {
            console.log("error retrieving order");
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        // key = email address
        console.log(key);
        var collection = firestore.collection('coffeeOrders');
        var query = collection.where("emailAddress", "==", key);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
                console.log("item delted");
            });
        }).catch(function(error) {
            console.log("error retrieving object");
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);