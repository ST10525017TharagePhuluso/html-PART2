/* Burkleigh House Bakery — site interactions */
(function ($) {
  "use strict";

  var PRODUCTS = [
    {id:1,name:"Classic Chocolate Fudge Cake",cat:"cakes",price:380,lead:2,desc:"Rich dark chocolate sponge with ganache frosting.",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"},
    {id:2,name:"Fresh Strawberry Cream Cake",cat:"cakes",price:350,lead:2,desc:"Vanilla sponge, whipped cream and fresh strawberries.",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80"},
    {id:3,name:"Velvety Red Velvet Cake",cat:"cakes",price:420,lead:2,desc:"Red velvet layers with vanilla cream cheese icing.",img:"https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80"},
    {id:4,name:"Artisan Sourdough Loaf",cat:"breads",price:65,lead:1,desc:"Slow-fermented sourdough with a crisp crust.",img:"https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=800&q=80"},
    {id:5,name:"Classic French Baguette",cat:"breads",price:35,lead:1,desc:"Crisp crust, light crumb, baked every morning.",img:"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"},
    {id:6,name:"Multigrain Seeded Loaf",cat:"breads",price:55,lead:1,desc:"Pumpkin, sunflower and flax seeds in every slice.",img:"https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80"}
  ];

  /* IMPORTANT: Replace this with the real bakery email before publishing. */
  var BAKERY_EMAIL = "info@burkleighhousebakery.co.za";
  var money = function (n) { return "R" + Number(n).toFixed(2); };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === Number(id); })[0]; };

  function renderProducts() {
    var q = ($("#search").val() || "").toLowerCase().trim();
    var cat = $("#category").val() || "all";
    var sort = $("#sort").val() || "name";
    var list = PRODUCTS.filter(function (p) {
      return (cat === "all" || p.cat === cat) && (p.name + " " + p.desc).toLowerCase().indexOf(q) !== -1;
    });
    list.sort(function (a, b) {
      return sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.name.localeCompare(b.name);
    });
    var $grid = $("#productGrid").empty();
    if (!list.length) {
      $grid.append($("<p>").text("No products match your search. Try another word or clear the filters."));
      return;
    }
    list.forEach(function (p) {
      var $card = $('<article class="card">');
      $("<img>").attr({src:p.img,alt:p.name + " from Burkleigh House Bakery",loading:"lazy",tabindex:0}).data("id",p.id).addClass("open-modal").appendTo($card);
      var $body = $('<div class="body">').appendTo($card);
      $("<h3>").text(p.name).appendTo($body);
      $("<p>").text(p.desc).appendTo($body);
      var $row = $('<div class="row">').appendTo($body);
      $("<span>").addClass("price").text(money(p.price)).appendTo($row);
      $("<a>").addClass("btn").attr("href","enquiry.html?product=" + p.id).text("Enquire →").appendTo($row);
      $grid.append($card);
    });
  }

  function initHome() {
    $("#search, #category, #sort").on("input change", renderProducts);
    $(document).on("click keydown", ".open-modal", function (e) {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      if (e.type === "keydown") e.preventDefault();
      var p = byId($(this).data("id"));
      if (!p) return;
      $("#mImg").attr({src:p.img,alt:p.name});
      $("#mName").text(p.name);
      $("#mDesc").text(p.desc);
      $("#mInfo").text(money(p.price) + " · Please order " + p.lead + (p.lead > 1 ? " days" : " day") + " ahead.");
      $("#mEnq").attr("href","enquiry.html?product=" + p.id);
      var dlg = document.getElementById("productModal");
      if (dlg && dlg.showModal) dlg.showModal();
    });
    $(".close-dlg").on("click", function () { this.closest("dialog").close(); });
    $("dialog").on("click", function (e) { if (e.target === this) this.close(); });
    renderProducts();
  }

  var rules = {
    name: [function (v) { return /^[A-Za-z][A-Za-z' -]{1,59}$/.test(v); }, "Enter a name using at least 2 letters."],
    email: [function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, "Enter a valid email address."],
    phone: [function (v) { return /^(\+27|0)\d{9}$/.test(v.replace(/[\s()-]/g, "")); }, "Enter a South African number, e.g. 082 123 4567."],
    message: [function (v) { return v.length >= 10 && v.length <= 1000; }, "Message must be 10–1000 characters."]
  };
  function fail($field, msg) {
    $field.addClass("bad").attr("aria-invalid","true").closest(".f").find(".err").first().text(msg);
    return false;
  }
  function okay($field) {
    $field.removeClass("bad").removeAttr("aria-invalid").closest(".f").find(".err").first().text("");
    return true;
  }
  function validateFields($form) {
    var good = true;
    $form.find("[data-rule]").each(function () {
      var $field = $(this), rule = rules[$field.data("rule")], value = $.trim($field.val() || "");
      if (!rule || !rule[0](value)) { fail($field, rule ? rule[1] : "Please check this field."); good = false; }
      else okay($field);
    });
    $form.find("select[required]").each(function () {
      var $field = $(this);
      if (!$field.val()) { fail($field,"Please choose an option."); good = false; }
      else okay($field);
    });
    return good;
  }
  function initEnquiry() {
    var $product = $("#product");
    PRODUCTS.forEach(function (p) {
      $("<option>").val(p.id).text(p.name + " (" + money(p.price) + ")").appendTo($product);
    });
    var requested = new URLSearchParams(window.location.search).get("product");
    if (requested && byId(requested)) $product.val(requested);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $("#date").attr("min", tomorrow.getFullYear() + "-" + String(tomorrow.getMonth()+1).padStart(2,"0") + "-" + String(tomorrow.getDate()).padStart(2,"0"));

    $("#enquiryForm").on("submit", function (e) {
      e.preventDefault();
      var $form = $(this), valid = validateFields($form);
      var qty = parseInt($("#qty").val(),10);
      if (!(qty >= 1 && qty <= 20)) { fail($("#qty"),"Quantity must be between 1 and 20."); valid = false; }
      else okay($("#qty"));
      var dateValue = $("#date").val(), date = new Date(dateValue + "T12:00:00"), product = byId($product.val());
      if (!dateValue || isNaN(date.getTime())) { fail($("#date"),"Choose a collection or delivery date."); valid = false; }
      else if (date.getDay() === 0) { fail($("#date"),"We are closed on Sundays. Choose Monday to Saturday."); valid = false; }
      else okay($("#date"));
      if (!product) { fail($product,"Please choose a product."); valid = false; }
      if (!valid) return;

      var today = new Date(); today.setHours(0,0,0,0);
      var chosen = new Date(dateValue + "T00:00:00");
      var days = Math.round((chosen - today) / 86400000);
      var delivery = $("#method").val() === "delivery" ? 60 : 0;
      var subtotal = product.price * qty, total = subtotal + delivery;
      var can = days >= product.lead;
      var $result = $("#result").empty().prop("hidden",false).show();
      $("<h2>").text(can ? "Your estimate is ready" : "Please choose a later date").appendTo($result);
      $("<p>").text(qty + " × " + product.name + " = " + money(subtotal) + (delivery ? " + R60.00 estimated delivery" : "") + ". Estimated total: " + money(total) + ".").appendTo($result);
      $("<p>").text(can ? "Your selected date meets our usual notice period. The bakery must still confirm availability." : product.name + " needs at least " + product.lead + (product.lead > 1 ? " days" : " day") + " notice. Please select a later date.").appendTo($result);
      if (can) {
        var body = "BAKERY ENQUIRY\n\nName: " + $("#ename").val().trim() +
          "\nEmail: " + $("#eemail").val().trim() + "\nPhone: " + $("#ephone").val().trim() +
          "\nProduct: " + product.name + "\nQuantity: " + qty + "\nPreferred date: " + dateValue +
          "\nMethod: " + $("#method option:selected").text() + "\nExtra details: " + ($("#details").val().trim() || "None") +
          "\nEstimated total: " + money(total) + "\n\nPlease confirm availability and final pricing.";
        var subject = "Bakery enquiry - " + product.name;
        $("<a>").addClass("btn").attr("href","mailto:" + BAKERY_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)).text("Send this enquiry by email →").appendTo($result);
      }
      $result[0].scrollIntoView({behavior:"smooth",block:"nearest"});
    });
  }

  function initContact() {
    $("#message").on("input",function () { $("#count").text(this.value.length + " / 1000"); });
    $("#contactForm").on("submit",function (e) {
      e.preventDefault();
      if (!validateFields($(this))) return;
      var body = "Name: " + $("#cname").val().trim() + "\nEmail: " + $("#cemail").val().trim() +
        "\nPhone: " + $("#cphone").val().trim() + "\nType: " + $("#ctype").val() +
        "\n\nMessage:\n" + $("#message").val().trim();
      var href = "mailto:" + BAKERY_EMAIL + "?subject=" + encodeURIComponent($("#ctype").val() + " - Burkleigh House Bakery") + "&body=" + encodeURIComponent(body);
      $("#mailPreview").text(body);
      $("#mailBox").prop("hidden",false).show();
      $("#sendMail").attr("href",href);
      $("#mailBox")[0].scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    if (window.L && document.getElementById("map")) {
      var pos = [-26.0897,28.0053]; // Approximate Ferndale area; replace with exact bakery coordinates.
      var map = L.map("map").setView(pos,14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
        maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(pos).addTo(map).bindPopup("<strong>Burkleigh House Bakery</strong><br>Ferndale, Randburg").openPopup();
    }
  }

  $(function () {
    var page = $("body").data("page");
    if (page === "home") initHome();
    if (page === "enquiry") initEnquiry();
    if (page === "contact") initContact();
  });
})(jQuery);
