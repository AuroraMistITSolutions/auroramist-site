/* =====================================================================
   Farah Maternity & Infertility Centre — shared scripts
   Mobile nav · sticky-header shadow · FAQ accordion · form → WhatsApp
   ===================================================================== */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919226582992"; // international format, no '+'

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- Sticky header shadow on scroll ---- */
    var header = document.querySelector(".site-header");
    function onScroll() {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- Mobile nav ---- */
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    var overlay = document.querySelector(".nav-overlay");
    function closeNav() {
      if (toggle) toggle.classList.remove("open");
      if (links) links.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
    function openNav() {
      if (toggle) toggle.classList.add("open");
      if (links) links.classList.add("open");
      if (overlay) overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (links && links.classList.contains("open")) closeNav();
        else openNav();
      });
    }
    if (overlay) overlay.addEventListener("click", closeNav);
    if (links) {
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeNav);
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    /* ---- FAQ accordion ---- */
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        var ans = item.querySelector(".faq-a");
        var isOpen = item.classList.contains("open");
        // close all (single-open accordion)
        document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          ans.style.maxHeight = ans.scrollHeight + "px";
        }
      });
    });

    /* ---- Appointment form → WhatsApp ---- */
    var form = document.getElementById("appointment-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var name = (data.get("name") || "").toString().trim();
        var phone = (data.get("phone") || "").toString().trim();
        var email = (data.get("email") || "").toString().trim();
        var service = (data.get("service") || "").toString().trim();
        var date = (data.get("date") || "").toString().trim();
        var msg = (data.get("message") || "").toString().trim();

        var lines = [
          "Hello Farah Maternity & Infertility Centre,",
          "I would like to book an appointment.",
          "",
          "Name: " + (name || "-"),
          "Phone: " + (phone || "-"),
          "Email: " + (email || "-"),
          "Service: " + (service || "-"),
          "Preferred date: " + (date || "-")
        ];
        if (msg) { lines.push("", "Message: " + msg); }

        var text = encodeURIComponent(lines.join("\n"));
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
        window.open(url, "_blank", "noopener");

        var ok = document.getElementById("form-success");
        if (ok) { ok.style.display = "flex"; }
        form.reset();
      });
    }

    /* ---- Footer year ---- */
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
