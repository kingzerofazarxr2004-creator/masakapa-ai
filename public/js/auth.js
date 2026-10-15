import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Konfigurasi Firebase milikmu
const firebaseConfig = {
    apiKey: "AIzaSyDzLnMthTiiIpyoAN2DV8vsIUND9Hl1few",
    authDomain: "masakapa-ai-602c2.firebaseapp.com",
    projectId: "masakapa-ai-602c2",
    storageBucket: "masakapa-ai-602c2.firebasestorage.app",
    messagingSenderId: "667324831089",
    appId: "1:667324831089:web:ad32c570704089a8ca92d0",
    measurementId: "G-T51QPX33NN"
};

// Menyalakan Firebase & Fitur Login Google
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 👇 KODE SAKTI DITAMBAHKAN DI SINI 👇
// Memaksa Google selalu memunculkan pop-up pemilihan akun meskipun baru saja logout
provider.setCustomParameters({
    prompt: 'select_account'
});
// 👆 ------------------------------ 👆

// PENTING: Gunakan DOMContentLoaded agar script menunggu HTML selesai dimuat
document.addEventListener("DOMContentLoaded", () => {

    // HANYA ambil elemen yang benar-benar ada di login.html
    const btnLogin = document.getElementById("btn-login");

    // Bungkus dengan if, agar jika script ini dipanggil di halaman lain, tidak error
    if (btnLogin) {
        btnLogin.addEventListener("click", async () => {
            try {
                // Ubah tombol jadi efek loading
                btnLogin.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Menghubungkan Google...`;

                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // PENTING: Ambil Token Kunci Rahasia untuk Satpam Backend kita
                const token = await user.getIdToken();

                // Simpan token ke "memori browser" agar bisa dibawa ke halaman dashboard
                sessionStorage.setItem('firebaseToken', token);

                // Berhasil! Lempar user ke halaman utama (Kulkas)
                window.location.href = '/dashboard.html';

            } catch (error) {
                console.error("Gagal login:", error);
                alert("Gagal melakukan login dengan Google. Pastikan internet stabil.");
                // Kembalikan teks tombol jika gagal
                btnLogin.innerHTML = `<img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6" alt="Google"> Lanjutkan dengan Google`;
            }
        });
    }

    // Fitur Tambahan Cerdas: Jika user sebenarnya sudah login tapi iseng buka halaman login.html lagi,
    // otomatis usir mereka kembali ke dashboard.
    onAuthStateChanged(auth, async (user) => {
        if (user && window.location.pathname.includes('/login.html')) {
            const token = await user.getIdToken();
            sessionStorage.setItem('firebaseToken', token);
            window.location.href = '/dashboard.html';
        }
    });

});