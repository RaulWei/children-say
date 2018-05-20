(function () {
    let NebPay = require("nebpay");
    let nebPay = new NebPay();

    $(function () {
        if (typeof(webExtensionWallet) === "undefined") {
            $("noWebExtensionWallet").show();
        }
    });

    let dappAddress = "";

    // add
    function add() {
        let to = dappAddress;
        let value = "0";
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
        let to = dappAddress;
        let value = "0";
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