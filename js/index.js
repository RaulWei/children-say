(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();

    $(function () {
        if (typeof(webExtensionWallet) === "undefined") {
            $("noWebExtensionWallet").show();
        }
    });

    var dappAddress = "";

    // add
    function add() {
        var to = dappAddress;
        var value = "0";
        // let callFunction = "";
        // let callArgs = "";
        nebPay.call(to, value, callFuntion, callArgs, {
            listener: cbAdd
        })
    }
    function cbAdd(resp) {
        console.log("response of add: " + resp);
        // todo
    }

    // get
    function get() {
        var to = dappAddress;
        var value = "0";
        // let callFunction = "";
        // let callArgs = "";
        nebPay.simulateCall(to, value, callFunction, callArgs, {
            listener: cbGet
        });
    }
    function cbGet(resp) {
        // todo
    }

})();