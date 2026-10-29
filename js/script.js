/* Burkleigh House Bakery - Part 3 scripts (jQuery 3.7) */
(function ($) {
  "use strict";
  /* Image fallback chain: local photo (.jpg) -> Unsplash copy of the same photo -> local illustration (.svg) */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG") { return; }
    var remote = t.getAttribute("data-remote"), svg = t.getAttribute("data-svg");
    if (remote && !t.getAttribute("data-tried")) { t.setAttribute("data-tried", "1"); t.src = remote; }
    else if (svg && t.getAttribute("src") !== svg) { t.src = svg; }
  }, true);
  var UNS = "https://images.unsplash.com/photo-", UNSQ = "?auto=format&fit=crop&w=800&q=75";
  var HERO_REMOTE = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=75";
  var PRODUCTS = [
    {id:1,name:"Classic Chocolate Fudge Cake",cat:"cakes",price:380,lead:2,desc:"Rich dark chocolate sponge with ganache frosting.",img:"images/chocolate-fudge-cake.jpg",remote:UNS+"1578985545062-69928b1d9587"+UNSQ},
    {id:2,name:"Fresh Strawberry Cream Cake",cat:"cakes",price:350,lead:2,desc:"Vanilla sponge, whipped cream and fresh strawberries.",img:"images/strawberry-cream-cake.jpg",remote:UNS+"1565958011703-44f9829ba187"+UNSQ},
    {id:3,name:"Velvety Red Velvet Cake",cat:"cakes",price:420,lead:2,desc:"Red velvet layers with vanilla cream cheese icing.",img:"images/red-velvet-cake.jpg",remote:UNS+"1586788680434-30d324b2d46f"+UNSQ},
    {id:4,name:"Artisan Sourdough Loaf",cat:"breads",price:65,lead:1,desc:"Slow-fermented sourdough with a crisp crust.",img:"images/artisan-sourdough-loaf.jpg",remote:UNS+"1585478259715-876acc5be8eb"+UNSQ},
    {id:5,name:"Classic French Baguette",cat:"breads",price:35,lead:1,desc:"Crisp crust, light crumb, baked every morning.",img:"images/classic-french-baguette.jpg",remote:UNS+"1549931319-a545dcf3bc73"+UNSQ},
    {id:6,name:"Multigrain Seeded Loaf",cat:"breads",price:55,lead:1,desc:"Pumpkin, sunflower and flax seeds in every slice.",img:"images/multigrain-seeded-loaf.jpg",remote:UNS+"1509440159596-0249088772ff"+UNSQ}
  ];
  var cart = {};
  function photoAttrs(p, alt, extra) {
    return $.extend({src: p.img, alt: alt, "data-remote": p.remote, "data-svg": p.img.replace(/\.jpg$/, ".svg")}, extra);
  }
  var money = function (n) { return "R" + n.toFixed(2); };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === +id; })[0]; };

  /* ---------- Dynamic product listing: search, filter, sort ---------- */
  function renderProducts() {
    var q = $("#search").val().toLowerCase().trim(), cat = $("#category").val(), sort = $("#sort").val();
    var list = PRODUCTS.filter(function (p) {
      return (cat === "all" || p.cat === cat) && (p.name + " " + p.desc + " " + p.cat).toLowerCase().indexOf(q) > -1;
    });
    list.sort(function (a, b) {
      return sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.name.localeCompare(b.name);
    });
    var $g = $("#productGrid").empty();
    if (!list.length) { $g.append($("<p>").text("No products match your search. Try a different word or clear the filters.")); }
    list.forEach(function (p) {
      var $c = $('<article class="card">');
      $("<img>").attr(photoAttrs(p, p.name + " from Burkleigh House Bakery", {loading: "lazy", width: 600, height: 400, tabindex: 0})).data("id", p.id).addClass("open-modal").appendTo($c);
      var $b = $('<div class="body">').appendTo($c);
      $("<h3>").text(p.name).appendTo($b);
      $("<p>").text(p.desc).appendTo($b);
      var $r = $('<div class="row">').appendTo($b);
      $('<span class="price">').text(money(p.price)).appendTo($r);
      $('<button class="btn" type="button">').text("Add").data("id", p.id).addClass("add").appendTo($r);
      $g.append($c);
    });
  }
  function renderCart() {
    var $l = $("#cartItems").empty(), total = 0, ids = Object.keys(cart);
    if (!ids.length) { $l.append($("<li>").text("Your order is empty. Add a product to start.")); }
    ids.forEach(function (id) {
      var p = byId(id), n = cart[id]; total += p.price * n;
      var $li = $("<li>").append($("<span>").text(n + " x " + p.name),
        $("<span>").append($("<span>").text(money(p.price * n) + " "), $('<button class="link rm" type="button">').text("Remove").data("id", id)));
      $l.append($li);
    });
    $("#cartTotal").text(money(total));
  }
  function openModal(id) {
    var p = byId(id), d = document.getElementById("productModal");
    $("#mImg").removeAttr("data-tried").attr(photoAttrs(p, p.name));
    $("#mName").text(p.name); $("#mDesc").text(p.desc);
    $("#mInfo").text(money(p.price) + " | Order " + p.lead + (p.lead > 1 ? " days" : " day") + " ahead");
    $("#mEnq").attr("href", "enquiry.html?product=" + p.id);
    d.showModal();
  }
  function initHome() {
    $("#search, #category, #sort").on("input change", renderProducts);
    $(document).on("click", ".add", function () { var id = $(this).data("id"); cart[id] = (cart[id] || 0) + 1; renderCart(); });
    $(document).on("click", ".rm", function () { delete cart[$(this).data("id")]; renderCart(); });
    $(document).on("click keydown", ".open-modal", function (e) { if (e.type === "click" || e.key === "Enter") openModal($(this).data("id")); });
    $(".close-dlg").on("click", function () { this.closest("dialog").close(); });
    $("dialog").on("click", function (e) { if (e.target === this) this.close(); });
    /* Accordion (jQuery) */
    $(".acc-q").on("click", function () {
      var $a = $(this).next(".acc-a"), open = $a.is(":visible");
      $(".acc-a").slideUp(200); $(".acc-q").attr("aria-expanded", "false");
      if (!open) { $a.slideDown(200); $(this).attr("aria-expanded", "true"); }
    });
    /* Gallery + lightbox (DOM created on the fly) */
    var $gal = $("#gallery");
    PRODUCTS.forEach(function (p) {
      $("<img>").attr(photoAttrs(p, p.name + " - gallery photo", {loading: "lazy", width: 400, height: 400, tabindex: 0})).appendTo($gal);
    });
    var gi = 0, $lb = $("#lightbox");
    function showLb(i) {
      gi = (i + PRODUCTS.length) % PRODUCTS.length;
      var p = PRODUCTS[gi];
      $("#lbImg").removeAttr("data-tried").attr(photoAttrs(p, p.name + " - enlarged photo"));
      $("#lbCap").text(p.name + " (" + (gi + 1) + " of " + PRODUCTS.length + ")");
    }
    $gal.on("click keydown", "img", function (e) {
      if (e.type === "keydown" && e.key !== "Enter") return;
      showLb($(this).index()); $lb[0].showModal();
    });
    $("#lbPrev").on("click", function () { showLb(gi - 1); });
    $("#lbNext").on("click", function () { showLb(gi + 1); });
    $lb.on("keydown", function (e) { if (e.key === "ArrowLeft") showLb(gi - 1); if (e.key === "ArrowRight") showLb(gi + 1); });
    renderProducts(); renderCart();
    var probe = new Image();
    probe.onerror = function () {
      $(".hero").css("background-image", "linear-gradient(rgba(59,36,24,.55),rgba(59,36,24,.55)), url(" + HERO_REMOTE + "), url(images/bakery-counter-hero.svg)");
    };
    probe.src = "images/fresh-seeded-bread-hero.jpg";
  }

  /* ---------- Validation helpers ---------- */
  function fail($f, msg) { $f.addClass("bad").attr("aria-invalid", "true").next(".err").text(msg); return false; }
  function ok($f) { $f.removeClass("bad").removeAttr("aria-invalid").next(".err").text(""); return true; }
  function check($f, test, msg) { return test($.trim($f.val())) ? ok($f) : fail($f, msg); }
  var rules = {
    name: [function (v) { return /^[A-Za-z][A-Za-z' -]{1,59}$/.test(v); }, "Enter your name using letters only (2-60 characters)."],
    email: [function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, "Enter a valid email address, like name@example.com."],
    phone: [function (v) { return /^(\+27|0)\d{9}$/.test(v.replace(/[\s-]/g, "")); }, "Enter a South African number, like 082 123 4567."],
    message: [function (v) { return v.length >= 10 && v.length <= 1000; }, "Message must be 10 to 1000 characters."]
  };
  function validateFields($form) {
    var good = true;
    $form.find("[data-rule]").each(function () {
      var r = rules[$(this).data("rule")];
      if (!check($(this), r[0], r[1])) good = false;
    });
    $form.find("select[required]").each(function () { if (!$(this).val()) { fail($(this), "Please choose an option."); good = false; } else ok($(this)); });
    return good;
  }

  /* ---------- Enquiry page: validation, cost + availability response, AJAX ---------- */
  function initEnquiry() {
    var $sel = $("#product");
    PRODUCTS.forEach(function (p) { $("<option>").val(p.id).text(p.name + " (" + money(p.price) + ")").appendTo($sel); });
    var pre = new URLSearchParams(location.search).get("product");
    if (pre && byId(pre)) $sel.val(pre);
    var min = new Date(); min.setDate(min.getDate() + 1);
    var pad = function (n) { return ("0" + n).slice(-2); };
    $("#date").attr("min", min.getFullYear() + "-" + pad(min.getMonth() + 1) + "-" + pad(min.getDate()));

    $("#enquiryForm").on("submit", function (e) {
      e.preventDefault();
      var $f = $(this), good = validateFields($f);
      var qty = parseInt($("#qty").val(), 10);
      if (!(qty >= 1 && qty <= 20)) { fail($("#qty"), "Quantity must be between 1 and 20."); good = false; } else ok($("#qty"));
      var d = new Date($("#date").val() + "T00:00:00"), p = byId($sel.val());
      if (!$("#date").val() || isNaN(d)) { fail($("#date"), "Choose a collection or delivery date."); good = false; }
      else if (d.getDay() === 0) { fail($("#date"), "We are closed on Sundays. Choose Monday to Saturday."); good = false; }
      else ok($("#date"));
      if (!good) return;
      var days = Math.ceil((d - new Date()) / 864e5), delivery = $("#method").val() === "delivery" ? 60 : 0;
      var total = p.price * qty + delivery, can = days >= p.lead;
      var $r = $("#result").empty().prop("hidden", false).show();
      $("<h2>").text(can ? "Good news, we can bake this" : "That date is too soon").appendTo($r);
      $("<p>").text(qty + " x " + p.name + " = " + money(p.price * qty) + (delivery ? " + R60.00 delivery" : "") + ". Estimated total: " + money(total) + ".").appendTo($r);
      $("<p>").text(can ? "Availability: confirmed for " + $("#date").val() + " (Mon-Sat, 08:00-17:00)." : "Availability: " + p.name + " needs " + p.lead + " day(s) notice. Please pick a later date.").appendTo($r);
      if (can) {
        /* AJAX submission - replace the URL with your own Formspree/Netlify endpoint (see README) */
        $.ajax({url: $f.attr("action"), method: "POST", data: $f.serialize(), dataType: "json", headers: {Accept: "application/json"}})
          .done(function () { $("<p>").text("Your enquiry has been sent. We will confirm by email.").appendTo($r); })
          .fail(function () { $("<p>").text("We could not send this automatically. Please email or call us to confirm.").appendTo($r); });
      }
      $r[0].scrollIntoView({behavior: "smooth"});
    });
  }

  /* ---------- Contact page: validation, compiled email, Leaflet map ---------- */
  function initContact() {
    $("#message").on("input", function () { $("#count").text(this.value.length + " / 1000"); });
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      if (!validateFields($(this))) return;
      var body = "Name: " + $.trim($("#cname").val()) + "\nEmail: " + $.trim($("#cemail").val()) + "\nPhone: " + $.trim($("#cphone").val()) +
        "\nType: " + $("#ctype").val() + "\n\n" + $.trim($("#message").val());
      var href = "mailto:" + $("#recipient").val() + "?subject=" + encodeURIComponent($("#ctype").val() + " - Burkleigh House Bakery") + "&body=" + encodeURIComponent(body);
      $("#mailPreview").text(body);
      $("#mailBox").prop("hidden", false).show(); $("#sendMail").attr("href", href);
    });
    if (window.L && $("#map").length) {
      var pos = [-26.0897, 28.0053]; /* Ferndale, Randburg (approximate) */
      var map = L.map("map").setView(pos, 15);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, attribution: "&copy; OpenStreetMap contributors"}).addTo(map);
      L.marker(pos).addTo(map).bindPopup("<b>Burkleigh House Bakery</b><br>Ferndale, Randburg").openPopup();
    }
  }

  $(function () {
    var page = $("body").data("page");
    if (page === "home") initHome();
    if (page === "enquiry") initEnquiry();
    if (page === "contact") initContact();
  });
})(jQuery);
