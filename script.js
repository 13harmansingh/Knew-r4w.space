/* =========================================================
   knew — client script
   Purpose: interaction only, no render-side effects
   ========================================================= */

(function () {
    "use strict";

    /* -----------------------------
       DOM Ready Guard
    ----------------------------- */
    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    onReady(function () {

        /* -----------------------------
           Smooth Scroll
        ----------------------------- */
        window.scrollToSignup = function () {
            const target = document.getElementById("signup");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        };

        window.scrollToDemo = function () {
            const target = document.getElementById("how-it-works");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        };

        /* -----------------------------
           Depth Selector
        ----------------------------- */
        window.selectDepth = function (button) {
            if (!button || !button.parentElement) return;

            const buttons =
                button.parentElement.querySelectorAll(".depth-btn");

            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
        };

        /* -----------------------------
           Email Signup (Mock)
        ----------------------------- */
        window.handleSubmit = function (event) {
            event.preventDefault();

            const form = event.target;
            const success = document.getElementById("successMessage");

            if (!form || !success) return;

            form.style.display = "none";
            success.style.display = "block";
        };

        /* -----------------------------
           Safety Log (optional)
        ----------------------------- */
        if (window.console && console.info) {
            console.info("knew client script loaded");
        }
    });

})();