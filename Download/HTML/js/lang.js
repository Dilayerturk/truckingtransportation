(function ($) {

    function loadLanguage(lang) {
        $.getJSON("lang/" + lang + ".json", function (data) {
            $.each(data, function (key, value) {
                var el = $("#" + key);
                if (el.length) {
                    el.html(value);
                }
            });
        });
    }

    // Aktif dili bayraklara yansıt
    function updateActiveLang(lang) {
        $(".language-options .lang, .dl-language .lang").removeClass("active");
        $(".language-options .lang-" + lang + ", .dl-language .lang-" + lang).addClass("active");
    }

    // Sayfa ilk açıldığında
    var savedLang = localStorage.getItem("lang") || "eng";
    loadLanguage(savedLang);
    updateActiveLang(savedLang); // <- aktif bayrağı işaretle

    // Menüdeki dil butonlarına tıklama
    $(".language-options .lang, .dl-language .lang").on("click", function (e) {
        e.preventDefault();

        var langClass = $(this).attr("class"); // örn: "lang lang-en"
        var lang = langClass.split(" ")[1].split("-")[1]; // "en"

        localStorage.setItem("lang", lang);
        loadLanguage(lang);
        updateActiveLang(lang); // <- seçilen bayrağı işaretle
    });

})(jQuery);


