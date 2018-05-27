(function () {
    "use strict";

    var NebPay = require("nebpay");
    var nebPay = new NebPay();

    var dappAddress = "n1ptLwCEn8Areh9c9m7nvx6Qqspxn63Q1dQ";
    var callbackUrl = NebPay.config.mainnetUrl;

    function showAlertModal(titleContent, bodyContent) {
        var alertModal = $('#alert-modal');
        var title = alertModal.find('.modal-title');
        title.empty();
        title.append(titleContent);
        var body = alertModal.find('.modal-body');
        body.empty();
        body.append(bodyContent);
        alertModal.modal('show');
    }

    // add
    var serialNumber;
    var interval;
    function add(author, dateTime, content) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "add";
        var callArgs = JSON.stringify([author, dateTime, content]);
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {
            listener: cbAdd,
            callback: callbackUrl
        });
    }
    function cbAdd(resp) {
        console.log("response from smart contract add method: " + resp);
        // clean input
        $("#form-address").val("");
        $("#form-content").val("");
        // handle result
        interval = setInterval(function() {
            fetchResult();
        }, 10000);
    }
    function fetchResult() {
        var options = {
            callback: callbackUrl
        };
        nebPay.queryPayInfo(serialNumber, options)
            .then(function(resp) {
                console.log("tx result: " + resp);
                var respObject = JSON.parse(resp);
                if (respObject.code === 0 && respObject.msg === "success") {
                    showAlertModal("<span class='glyphicon glyphicon-ok'></span> 成功", "已将记录写入！");
                    $("#submit-say").prop("disabled", false);
                    clearInterval(interval);
                }
            })
            .catch(function(err) {
                console.log(err);
                $("#submit-say").prop("disabled", false);
                clearInterval(interval);
            });
    }

    // get
    function get(author) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "get";
        var callArgs = "[\"" + author + "\"]";
        nebPay.simulateCall(to, value, callFunction, callArgs, {
            listener: cbGet
        });
    }
    function cbGet(resp) {
        // clean input
        $("#form-search").val("");
        var container = $("#items");
        container.empty();
        $("#submit-said").prop("disabled", false);

        // get fail
        if (resp.execute_err !== "") {
            showAlertModal("<span class='glyphicon glyphicon-remove'></span> 失败", "未能查询到相关结果！");
            return;
        }
        // get success
        var res = resp.result;
        console.log("result from smart contract get method: " + JSON.stringify(res));
        var items = JSON.parse(res);
        for (var i = 0; i < items.length; i++) {
            var author = items[i].author;
            var dateTime = items[i].date;
            var content = items[i].content;
            var media = $("<div class='media'><hr></div>");
            var mediaBody = $("<div class='media-body'><div class='media-heading'><span class='glyphicon glyphicon-time'></span> "
                + dateTime + "</div><pre>" + content + "</pre></div>");
            media.append(mediaBody);
            container.append(media);
        }
    }

    $(function() {
        // check whether to show alert
        var walletExtension = $(".noWebExtensionWallet");
        walletExtension.hide();
        if (typeof(webExtensionWallet) === "undefined") {
            walletExtension.show();
        }
        var noChrome = $(".noChrome");
        noChrome.hide();
        var isChrome = !!window.chrome;
        if (!isChrome) {
            noChrome.show();
        }

        // event listener
        $("#submit-say").off("click").on("click", function() {
            $("#submit-say").prop("disabled", true);
            var author = $("#form-address").val();
            var date = new Date();
            var dateTime = date.toUTCString();
            var content = $("#form-content").val();
            add(author, dateTime, content);
        });
        $("#submit-said").off("click").on("click", function() {
            $("#submit-said").prop("disabled", true);
            var author = $("#form-search").val();
            get(author);
        });
    });

})();