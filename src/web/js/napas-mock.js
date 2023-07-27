(function () {
    var orderId = document.getElementById("napas-widget-script").getAttribute("orderId");
    var urlCallback = document.getElementById("napas-widget-script").getAttribute("environment");
    var amount = document.getElementById("napas-widget-script").getAttribute("orderAmount");
    console.log(orderId, amount);
    window.location.href = urlCallback + "/mock/emulator/napas?id=" + orderId + "&amount=" + amount;

})();