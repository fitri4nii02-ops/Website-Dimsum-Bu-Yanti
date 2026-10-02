
/* =====================================================
   KONTAK WHATSAPP
===================================================== */

const nomorWhatsApp = "085299661010";


function hubungiWhatsApp() {

    const pesan =
        "Halo Dimsum Bu Yanti, saya ingin bertanya mengenai menu dan informasi Dimsum Bu Yanti.";


    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);


    window.open(url, "_blank");

}



/* =====================================================
   ANIMASI REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            function(entries) {

                entries.forEach(

                    function(entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                        }

                    }

                );

            },

            {
                threshold: 0.1
            }

        );


    revealElements.forEach(

        function(element) {

            observer.observe(element);

        }

    );


} else {

    revealElements.forEach(

        function(element) {

            element.classList.add("active");

        }

    );

}



/* =====================================================
   TOMBOL SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(

    function(link) {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId === "#" ||
                    !targetId
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    }

);
