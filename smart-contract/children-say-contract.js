"use strict";

// item of children-say

var ChildrenSayItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.date = obj.date;
        this.content = obj.content;
        this.author = obj.author;
    } else {
        this.date = "";
        this.content = "";
        this.author = "";
    }
};

ChildrenSayItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

// core actions of children-say

var ChildrenSay = function () {
    LocalContractStorage.defineProperty(this, "count");
    LocalContractStorage.defineMapProperty(this, "walletContents");
    LocalContractStorage.defineMapProperty(this, "essenceContents", {
        parse: function (text) {
            return new ChildrenSayItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

ChildrenSay.prototype = {

    init: function () {
        this.count = new BigNumber(0);
    },

    total: function() {
        return new BigNumber(this.count).toNumber();
    },

    add: function(author, date, content) {
        var from = author.trim() || Blockchain.transaction.from;
        if (!from) {
            throw new Error("Empty key when add children-say.");
        }
        date = date.trim();
        content = content.trim();
        if (!date || !content) {
            throw new Error("Empty date or content when add children-say");
        }

        var childrenSayItem = new ChildrenSayItem();
        childrenSayItem.date = date;
        childrenSayItem.content = content;
        childrenSayItem.author = from;

        var index = this.count;
        this.essenceContents.put(index, childrenSayItem);
        var walletContents = this.walletContents.get(from) || [];
        walletContents.put(index);
        this.walletContents.put(from, walletContents);

        this.count = new BigNumber(index).plus(1);
    },

    get: function(author) {
        var from = author.trim() || Blockchain.transaction.from;
        if (!from) {
            throw new Error("Empty key when get children-say.");
        }
        var walletContents = this.walletContents.get(from);
        if (!walletContents) {
            throw new Error("Failed to get contents from wallet = ${from}.");
        }
        var res = [];
        for (var i = 0; i < walletContents.length; i++) {
            var idx = walletContents[i];
            var content = this.essenceContents.get(idx);
            if (content) {
                res.push(content);
            }
        }
        return res;
    }

};

module.exports = ChildrenSay;
