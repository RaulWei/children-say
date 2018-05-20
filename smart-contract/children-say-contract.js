"use strict";

// item of children-say

var ChildrenSayItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        // todo
    } else {
        // todo
    }
};

ChildrenSayItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

// core actions of children-say

var ChildrenSay = function () {
    LocalContractStorage.defineMapProperty(this, "walletContents");
    LocalContractStorage.defineMapProperty(this, "essenceContents", {
        parse: function (text) {
            // todo
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

ChildrenSay.prototype = {

    init: function () {
        // todo
    }

    // todo

};

module.exports = ChildrenSay;
