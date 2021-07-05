importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE_NAME = "NutriDay";

workbox.core.setCacheNameDetails({
    prefix: CACHE_NAME,
    precache: "cache",
    runtime: "cache",
})

workbox.precaching.precacheAndRoute([
    {url: "assets/css/add.css", revision: null},
    {url: "assets/css/assesment-result.css", revision: null},
    {url: "assets/css/assesment.css", revision: null},
    {url: "assets/css/bootstrap.min.css", revision: null},
    {url: "assets/css/color-scheme.css", revision: null},
    {url: "assets/css/fontawesome.min.css", revision: null},
    {url: "assets/css/home.css", revision: null},
    {url: "assets/css/materialDateTimePicker.css", revision: null},
    {url: "assets/css/register.css", revision: null},
    {url: "assets/css/styles.css", revision: null},

    {url: "assets/fonts/fontawesome-webfont.ttf", revision: null},
    {url: "assets/fonts/fonts.css", revision: null},
    {url: "assets/fonts/Rubik-Bold.ttf", revision: null},
    {url: "assets/fonts/Rubik-Medium.ttf", revision: null},
    {url: "assets/fonts/Rubik-Regular.ttf", revision: null},

    {url: "assets/images/assesment/images/man.png", revision: null},
    {url: "assets/images/assesment/images/women.png", revision: null},
    {url: "assets/images/assesment/images/jobs/1.png", revision: null},
    {url: "assets/images/assesment/images/jobs/2.png", revision: null},
    {url: "assets/images/assesment/images/jobs/3.png", revision: null},
    {url: "assets/images/logo.png", revision: null},

    {url: "assets/js/bootstrap.min.js", revision: null},
    {url: "assets/js/chart.min.js", revision: null},
    {url: "assets/js/firebase-analytics.js", revision: null},
    {url: "assets/js/firebase-app.js", revision: null},
    {url: "assets/js/firebase-auth.js", revision: null},
    {url: "assets/js/firebase-firestore.js", revision: null},
    {url: "assets/js/firebase-storage.js", revision: null},
    {url: "assets/js/jquery-3.2.1.slim.min.js", revision: null},
    {url: "assets/js/loader.js", revision: null},
    {url: "assets/js/materialDateTimePicker.js", revision: null},
    {url: "assets/js/moment-with-locales.min.js", revision: null},
    {url: "assets/js/popper.min.js", revision: null},
    {url: "assets/js/router.js", revision: null},
    {url: "assets/js/sweetalert.min.js", revision: null},

    {url: "assets/js/model/result.js", revision: null},
    {url: "assets/js/model/user.js", revision: null},

    {url: "assets/js/page/add.js", revision: null},
    {url: "assets/js/page/assesment-result.js", revision: null},
    {url: "assets/js/page/assesment.js", revision: null},
    {url: "assets/js/page/chart.js", revision: null},
    {url: "assets/js/page/home.js", revision: null},
    {url: "assets/js/page/login.js", revision: null},
    {url: "assets/js/page/register.js", revision: null},

    {url: "assets/js/page/add.html", revision: null},
    {url: "assets/js/page/assesment-result.html", revision: null},
    {url: "assets/js/page/assesment.html", revision: null},
    {url: "assets/js/page/chart.html", revision: null},
    {url: "assets/js/page/home.html", revision: null},
    {url: "assets/js/page/login.html", revision: null},
    {url: "assets/js/page/register.html", revision: null},

    {url: "index.html", revision: null},
    {url: "manifest.json", revision: null},
    {url: "sw.js", revision: null},

]);