document.addEventListener("DOMContentLoaded", async () => {

    // Konfigurasi Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDzLnMthTiiIpyoAN2DV8vsIUND9Hl1few",
        authDomain: "masakapa-ai-602c2.firebaseapp.com",
        projectId: "masakapa-ai-602c2",
        appId: "1:667324831089:web:ad32c570704089a8ca92d0"
    };

    const kotakResep = document.getElementById('isi-resep');
    const judulResep = document.getElementById('judul-resep');
    const btnFavorit = document.getElementById('btn-simpan-favorit');

    // Menarik status dari memori
    const bahanBahan = sessionStorage.getItem('bahanDipakai');
    const menuPilihan = sessionStorage.getItem('menuPilihan');
    const resepTersimpan = sessionStorage.getItem('resepTerbaru');
    const judulBukuResep = sessionStorage.getItem('judulResepMasaLalu');

    const alatMasak = sessionStorage.getItem('alatMasak');
    const budgetMasak = sessionStorage.getItem('budgetMasak');

    // Fungsi Render Teks AI ke HTML
    const renderResep = (teks, judulUI) => {
        let formatHTML = teks
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-orange-600">$1</em>')
            .replace(/\n/g, '<br>');

        judulResep.innerText = judulUI;
        kotakResep.innerHTML = `<div class="fade-in-up">${formatHTML}</div>`;
    };

    const tampilkanError = (pesan) => {
        judulResep.innerText = "Gagal Meracik 😢";
        kotakResep.innerHTML = `<div class="text-center py-10 fade-in-up"><i class="fa-solid fa-triangle-exclamation text-5xl text-red-400 mb-4"></i><p class="text-slate-600 font-medium">${pesan}</p><a href="/dashboard.html" class="mt-6 inline-block bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition-all">Kembali ke Kulkas</a></div>`;
    };

    // LOGIKA UTAMA HALAMAN RESEP
    if (resepTersimpan) {
        let judul = judulBukuResep ? judulBukuResep : "Resep Ajaib 🍳";
        if (!judulBukuResep && menuPilihan) judul = `Resep ${menuPilihan} 🍽️`;
        else if (!judulBukuResep && bahanBahan) judul = `Kreasi ${bahanBahan.split(',')[0]} 🍳`;
        renderResep(resepTersimpan, judul);

    } else if (bahanBahan || menuPilihan) {
        judulResep.innerText = `Menyiapkan Resep...`;

        const payloadData = { alat: alatMasak, budget: budgetMasak };
        if (menuPilihan) { payloadData.menuPilihan = menuPilihan; }
        else if (bahanBahan) { payloadData.bahan = bahanBahan.split(', '); }

        try {
            const response = await fetch('/api/ai/generate-resep', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payloadData)
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('resepTerbaru', data.resep);
                let judul = "Resep Ajaib 🍳";
                if (menuPilihan) judul = `Resep ${menuPilihan} 🍽️`;
                else if (bahanBahan) judul = `Kreasi ${bahanBahan.split(',')[0]} 🍳`;
                renderResep(data.resep, judul);
            } else {
                tampilkanError(data.error);
            }
        } catch (error) {
            tampilkanError('Koneksi ke Dapur AI terputus! Pastikan internetmu stabil lalu coba lagi.');
        }
    } else {
        tampilkanError("Kamu belum memilih bahan atau menu apapun.");
    }

    // LOGIKA SIMPAN KE FIRESTORE
    if (btnFavorit) {
        btnFavorit.addEventListener('click', async () => {
            btnFavorit.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> Menyimpan...`;

            try {
                const { getApps, initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");

                const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
                const db = getFirestore(app);
                const auth = getAuth(app);

                const getUser = () => new Promise(resolve => {
                    const unsub = auth.onAuthStateChanged(user => { unsub(); resolve(user); });
                });

                const user = await getUser();
                if (!user) {
                    alert("Waduh! Kamu harus login menggunakan Google dulu untuk menyimpan resep.");
                    btnFavorit.innerHTML = `<i class="fa-regular fa-bookmark mr-1"></i> Simpan Favorit`;
                    return;
                }

                await addDoc(collection(db, "resep_favorit"), {
                    uid: user.uid,
                    judul: judulResep.innerText,
                    teks_resep: sessionStorage.getItem('resepTerbaru'),
                    createdAt: Date.now()
                });

                btnFavorit.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Tersimpan!`;
                btnFavorit.classList.remove('text-orange-500', 'border-orange-100', 'hover:bg-orange-50');
                btnFavorit.classList.add('text-emerald-500', 'border-emerald-100', 'bg-emerald-50');
                btnFavorit.disabled = true;

            } catch (error) {
                console.error("Gagal simpan ke Firestore:", error);
                alert("Gagal menyimpan resep ke Cloud. Coba lagi nanti ya.");
                btnFavorit.innerHTML = `<i class="fa-regular fa-bookmark mr-1"></i> Simpan Favorit`;
            }
        });
    }

    // LOGIKA SHARE WHATSAPP
    const btnShareWA = document.getElementById('btn-share-wa');
    if (btnShareWA) {
        btnShareWA.addEventListener('click', () => {
            const resepTeks = document.getElementById('resep-content').innerText;
            const pesan = `*Chef MasakApa.ai baru saja membuatkan resep khusus untukku!* 👨‍🍳🔥\n\n${resepTeks}\n\n_Cobain AI-nya di MasakAi.com_`;
            const urlWA = `https://api.whatsapp.com/send?text=${encodeURIComponent(pesan)}`;
            window.open(urlWA, '_blank');
        });
    }
});