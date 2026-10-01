const nomorWhatsApp = "085299661010";


/* =====================================================
   DATA MENU
===================================================== */

const dataMenu = {

    kukus: {
        nama: "Dimsum Kukus",

        varian: [
            "Ayam",
            "Nori",
            "CrabStick",
            "Gyoza",
            "Jamur",
            "Sosis",
            "Sayur"
        ],

        paket: [
            {
                nama: "6 pcs",
                harga: 15000
            },
            {
                nama: "8 pcs",
                harga: 20000
            },
            {
                nama: "12 pcs",
                harga: 30000
            }
        ]
    },


    premium: {
        nama: "Dimsum Kukus Premium",

        varian: [
            "Volcano",
            "Tuna",
            "Smoke Beef",
            "Hot Lava",
            "Mozarella",
            "Mentai"
        ],

        paket: [
            {
                nama: "6 pcs",
                harga: 18000
            },
            {
                nama: "8 pcs",
                harga: 24000
            },
            {
                nama: "12 pcs",
                harga: 36000
            }
        ]
    },


    goreng: {
        nama: "Dimsum Goreng",

        varian: [
            "Kulit Tahu",
            "Ekado",
            "Lumpia",
            "Udang Keju",
            "Lumpia Keju"
        ],

        paket: [
            {
                nama: "4 pcs",
                harga: 16000
            },
            {
                nama: "6 pcs",
                harga: 24000
            }
        ]
    }

};



/* =====================================================
   DATA PESANAN
===================================================== */

let pesanan = [];



/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);

}



/* =====================================================
   ELEMENT PESANAN
===================================================== */

const kategoriSelect =
    document.getElementById("kategori");

const varianSelect =
    document.getElementById("varian");

const paketSelect =
    document.getElementById("paket");

const btnTambah =
    document.getElementById("btnTambah");

const btnHapus =
    document.getElementById("btnHapus");

const btnPesan =
    document.getElementById("btnPesan");

const daftarPesanan =
    document.getElementById("daftarPesanan");

const totalHarga =
    document.getElementById("totalHarga");



/* =====================================================
   UPDATE VARIAN
===================================================== */

function updateVarian() {

    const kategori = kategoriSelect.value;

    const menu = dataMenu[kategori];

    varianSelect.innerHTML = "";

    menu.varian.forEach(function(varian) {

        const option =
            document.createElement("option");

        option.value = varian;

        option.textContent = varian;

        varianSelect.appendChild(option);

    });

    updatePaket();

}



/* =====================================================
   UPDATE PAKET
===================================================== */

function updatePaket() {

    const kategori = kategoriSelect.value;

    const menu = dataMenu[kategori];

    paketSelect.innerHTML = "";

    menu.paket.forEach(function(paket, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            paket.nama + " - " + formatRupiah(paket.harga);

        paketSelect.appendChild(option);

    });

}

function tambahPesanan() {

    const kategori =
        kategoriSelect.value;

    const varian =
        varianSelect.value;

    const paketIndex =
        Number(paketSelect.value);

    const menu =
        dataMenu[kategori];

    const paket =
        menu.paket[paketIndex];


    if (!paket) {

        return;

    }


    const pesananLama =
        pesanan.find(function(item) {

            return (
                item.kategori === kategori &&
                item.varian === varian &&
                item.paket === paket.nama
            );

        });


    if (pesananLama) {

        pesananLama.jumlah++;

    } else {

        pesanan.push({

            kategori: kategori,

            namaKategori: menu.nama,

            varian: varian,

            paket: paket.nama,

            harga: paket.harga,

            jumlah: 1

        });

    }


    tampilkanPesanan();

}



/* =====================================================
   TAMPILKAN PESANAN
===================================================== */

function tampilkanPesanan() {

    if (pesanan.length === 0) {

        daftarPesanan.innerHTML = `
            <p class="empty-order">
                Belum ada pesanan.
            </p>
        `;

        totalHarga.textContent = "Rp 0";

        return;

    }


    daftarPesanan.innerHTML = "";


    pesanan.forEach(function(item, index) {

        const div =
            document.createElement("div");

        div.className =
            "order-item";


        div.innerHTML = `

            <div class="order-item-info">

                <strong>
                    ${item.varian}
                </strong>

                <small>
                    ${item.namaKategori} • ${item.paket}
                </small>

            </div>


            <div class="order-item-bottom">

                <span class="order-item-price">
                    ${formatRupiah(item.harga * item.jumlah)}
                </span>


                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="ubahJumlah(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.jumlah}
                    </span>

                    <button
                        type="button"
                        onclick="ubahJumlah(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

        `;


        daftarPesanan.appendChild(div);

    });


    hitungTotal();

}



/* =====================================================
   UBAH JUMLAH PESANAN
===================================================== */

function ubahJumlah(index, perubahan) {

    if (!pesanan[index]) {

        return;

    }


    pesanan[index].jumlah += perubahan;


    if (pesanan[index].jumlah <= 0) {

        pesanan.splice(index, 1);

    }


    tampilkanPesanan();

}



/* =====================================================
   HITUNG TOTAL
===================================================== */

function hitungTotal() {

    let total = 0;


    pesanan.forEach(function(item) {

        total += item.harga * item.jumlah;

    });


    totalHarga.textContent =
        formatRupiah(total);

}



/* =====================================================
   HAPUS SEMUA PESANAN
===================================================== */

function hapusSemuaPesanan() {

    pesanan = [];

    tampilkanPesanan();

}



/* =====================================================
   MODAL PESANAN
===================================================== */

const orderModal =
    document.getElementById("orderModal");

const closeOrderModal =
    document.getElementById("closeOrderModal");

const btnKirimWhatsApp =
    document.getElementById("btnKirimWhatsApp");



function bukaOrderModal() {

    if (pesanan.length === 0) {

        alert(
            "Silakan tambahkan pesanan terlebih dahulu."
        );

        return;

    }


    orderModal.classList.add("show");

}



function tutupOrderModal() {

    orderModal.classList.remove("show");

}



/* =====================================================
   KIRIM PESANAN KE WHATSAPP
===================================================== */

function kirimPesananWhatsApp() {

    if (pesanan.length === 0) {

        alert(
            "Belum ada pesanan."
        );

        return;

    }


    let pesan =
        "Halo Dimsum Bu Yanti,\n\n" +
        "Saya ingin memesan:\n\n";


    pesanan.forEach(function(item, index) {

        pesan +=
            (index + 1) +
            ". " +
            item.namaKategori +
            " - " +
            item.varian +
            "\n";

        pesan +=
            "   Paket: " +
            item.paket +
            "\n";

        pesan +=
            "   Jumlah: " +
            item.jumlah +
            "\n";

        pesan +=
            "   Harga: " +
            formatRupiah(
                item.harga * item.jumlah
            ) +
            "\n\n";

    });


    let total = 0;


    pesanan.forEach(function(item) {

        total +=
            item.harga * item.jumlah;

    });


    pesan +=
        "Total Pesanan: " +
        formatRupiah(total) +
        "\n\n";

    pesan +=
        "Terima kasih.";


    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);


    window.open(url, "_blank");

}



/* =====================================================
   KONTAK WHATSAPP
===================================================== */

function hubungiWhatsApp() {

    const pesan =
        "Halo Dimsum Bu Yanti, saya ingin bertanya mengenai menu dan pemesanan.";


    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);


    window.open(url, "_blank");

}



/* =====================================================
   MASUKAN PELANGGAN
===================================================== */

const feedbackForm =
    document.getElementById("feedbackForm");


/*
   Form Masukan langsung dikirim ke WhatsApp.
*/

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const namaInput =
                document.getElementById(
                    "namaPelanggan"
                );

            const masukanInput =
                document.getElementById(
                    "isiMasukan"
                );


            const nama =
                namaInput.value.trim();

            const masukan =
                masukanInput.value.trim();


            if (nama === "") {

                alert(
                    "Silakan masukkan nama terlebih dahulu."
                );

                namaInput.focus();

                return;

            }


            if (masukan === "") {

                alert(
                    "Silakan tulis masukan terlebih dahulu."
                );

                masukanInput.focus();

                return;

            }


            const pesan =
                "Halo Dimsum Bu Yanti,\n\n" +
                "Saya ingin memberikan masukan.\n\n" +
                "Nama: " +
                nama +
                "\n\n" +
                "Masukan:\n" +
                masukan +
                "\n\n" +
                "Terima kasih.";


            const url =
                "https://wa.me/" +
                nomorWhatsApp +
                "?text=" +
                encodeURIComponent(pesan);


            /*
               Membuka WhatsApp
            */

            window.open(
                url,
                "_blank"
            );


            /*
               Kosongkan form
               setelah tombol diklik
            */

            feedbackForm.reset();

        }
    );

}



/* =====================================================
   EVENT PESANAN
===================================================== */

if (kategoriSelect) {

    kategoriSelect.addEventListener(
        "change",
        updateVarian
    );

}


if (btnTambah) {

    btnTambah.addEventListener(
        "click",
        tambahPesanan
    );

}


if (btnHapus) {

    btnHapus.addEventListener(
        "click",
        hapusSemuaPesanan
    );

}


if (btnPesan) {

    btnPesan.addEventListener(
        "click",
        bukaOrderModal
    );

}


if (closeOrderModal) {

    closeOrderModal.addEventListener(
        "click",
        tutupOrderModal
    );

}


if (btnKirimWhatsApp) {

    btnKirimWhatsApp.addEventListener(
        "click",
        kirimPesananWhatsApp
    );

}



/* =====================================================
   KLIK DI LUAR MODAL PESANAN
===================================================== */

window.addEventListener(
    "click",
    function(event) {

        if (
            orderModal &&
            event.target === orderModal
        ) {

            tutupOrderModal();

        }

    }
);



/* =====================================================
   TOMBOL ESC
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            if (orderModal) {

                tutupOrderModal();

            }

        }

    }
);



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
   AWAL PROGRAM
===================================================== */

if (kategoriSelect) {

    updateVarian();

}


if (daftarPesanan) {

    tampilkanPesanan();

}

