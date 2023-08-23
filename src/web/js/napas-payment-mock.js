(function () {
    var orderId = document.getElementById("napas-widget-script").getAttribute("orderId");
    var urlCallback = document.getElementById("napas-widget-script").getAttribute("deviceId");
    var amount = document.getElementById("napas-widget-script").getAttribute("orderAmount");
    console.log(orderId, amount);
    window.location.href = urlCallback + "/napas/payment-gateway/callback/mock?id=" + orderId + "&amount=" + amount;

})();
