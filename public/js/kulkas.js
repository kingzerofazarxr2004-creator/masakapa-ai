document.addEventListener("DOMContentLoaded", () => {

    // Konfigurasi Global Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDzLnMthTiiIpyoAN2DV8vsIUND9Hl1few",
        authDomain: "masakapa-ai-602c2.firebaseapp.com",
        projectId: "masakapa-ai-602c2",
        appId: "1:667324831089:web:ad32c570704089a8ca92d0"
    };

    const databaseBahan = [
        { kategori: "🍚 Karbohidrat & Tepung (50)", icon: "fa-bowl-rice", item: ["Nasi Putih", "Nasi Merah", "Nasi Shirataki", "Nasi Sisa", "Mie Instan", "Mie Telur", "Mie Shirataki", "Bihun", "Soun", "Kwetiau", "Makaroni", "Spaghetti", "Fettuccine", "Fusilli", "Penne", "Roti Tawar", "Roti Gandum", "Roti Burger", "Tortilla / Kebab", "Tepung Terigu", "Tepung Beras", "Tepung Maizena", "Tepung Bumbu Serbaguna", "Tepung Bumbu Pedas", "Tepung Bakwan", "Tepung Pisang Goreng", "Tepung Tapioka", "Tepung Sagu", "Tepung Roti / Panir", "Tepung Ketan", "Beras Ketan", "Beras Porang", "Beras Basmati", "Oatmeal", "Cornflakes", "Granola", "Kentang", "Kentang Beku (Fries)", "Ubi Jalar", "Singkong", "Talas", "Kulit Pangsit", "Kulit Lumpia", "Kulit Dimsum", "Quinoa", "Couscous", "Biskuit Malkist", "Crackers", "Milo / Sereal"] },
        { kategori: "🍗 Protein Hewani (50)", icon: "fa-drumstick-bite", item: ["Telur Ayam", "Telur Puyuh", "Telur Bebek", "Telur Asin", "Telur Omega", "Daging Ayam", "Dada Ayam Fillet", "Paha Ayam", "Sayap Ayam", "Ceker Ayam", "Ati Ampela", "Daging Sapi", "Daging Cincang", "Iga Sapi", "Tetelan Sapi", "Slice Beef (Belly)", "Daging Kambing", "Ikan Lele", "Ikan Nila", "Ikan Gurame", "Ikan Tongkol", "Ikan Tuna", "Ikan Salmon", "Ikan Teri", "Ikan Asin", "Sarden Kaleng", "Tuna Kaleng", "Kornet Sapi", "Kornet Ayam", "Sosis Sapi", "Sosis Ayam", "Sosis Bakar", "Nugget Ayam", "Nugget Ikan", "Bakso Sapi", "Bakso Ikan", "Bakso Ayam", "Bakso Urat", "Udang", "Cumi", "Kerang", "Kepiting", "Teri Medan", "Ebi Kering", "Daging Asap (Smoked Beef)", "Beef Bacon", "Pepperoni", "Crab Stick", "Chikuwa", "Dumpling Keju"] },
        { kategori: "🧊 Protein Nabati & Dairy (40)", icon: "fa-cheese", item: ["Tahu Putih", "Tahu Kuning", "Tahu Sumedang", "Tahu Sutra (Silken)", "Tahu Pong", "Tahu Bulat", "Tahu Bakso", "Tempe", "Tempe Gembus", "Oncom", "Kacang Tanah", "Kacang Merah", "Kacang Hijau", "Kacang Kedelai", "Edamame", "Kacang Mede", "Kacang Almond", "Daging Nabati (Plant-based)", "Sosis Nabati", "Susu Full Cream", "Susu Low Fat", "Susu Kedelai", "Susu Almond", "Susu Oat (Oat Milk)", "Santan Kelapa", "Santan Instan", "Keju Cheddar", "Keju Mozzarella", "Keju Parmesan", "Keju Slice", "Mentega", "Margarin", "Butter", "Yoghurt Plain", "Greek Yoghurt", "Krimer Kental Manis", "Susu Kental Manis Coklat", "Whipping Cream", "Mayonaise", "Mayonaise Pedas"] },
        { kategori: "🥬 Sayuran & Jamur (60)", icon: "fa-leaf", item: ["Bayam", "Kangkung", "Sawi Hijau", "Sawi Putih", "Pakcoy", "Kailan", "Kol / Kubis", "Kol Ungu", "Wortel", "Buncis", "Kacang Panjang", "Brokoli", "Kembang Kol", "Terong Ungu", "Terong Hijau", "Pare", "Labu Siam", "Labu Kuning", "Daun Singkong", "Daun Pepaya", "Tomat Merah", "Tomat Hijau", "Tomat Ceri", "Timun", "Selada", "Selada Air", "Selada Keriting", "Kale", "Jamur Kancing", "Jamur Tiram", "Jamur Kuping", "Jamur Enoki", "Jamur Shimeji", "Jamur Merang", "Tauge", "Jagung Manis", "Baby Corn (Putren)", "Daun Bawang", "Bawang Prei", "Seledri", "Daun Kemangi", "Daun Mint", "Daun Ketumbar (Cilantro)", "Paprika Merah", "Paprika Hijau", "Paprika Kuning", "Lobak", "Bit (Beetroot)", "Zucchini", "Asparagus", "Rebung", "Jengkol", "Pete", "Nangka Muda", "Bunga Pepaya", "Daun Melinjo", "Buah Melinjo", "Oyong", "Belimbing Wuluh", "Kecombrang"] },
        { kategori: "🌶️ Bumbu, Saus & Ekstra (100)", icon: "fa-pepper-hot", item: ["Bawang Merah", "Bawang Putih", "Bawang Bombay", "Bawang Putih Bubuk", "Cabai Merah Besar", "Cabai Merah Keriting", "Cabai Rawit Merah", "Cabai Rawit Hijau", "Cabai Hijau Besar", "Cabai Kering", "Cabai Bubuk (Boncabe)", "Jahe", "Jahe Bubuk", "Lengkuas", "Kunyit", "Kunyit Bubuk", "Kencur", "Serai", "Daun Salam", "Daun Jeruk", "Ketumbar", "Ketumbar Bubuk", "Merica Putih", "Lada Hitam", "Kemiri", "Pala", "Asam Jawa", "Asam Kandis", "Kayu Manis", "Cengkeh", "Kapulaga", "Bunga Lawang", "Jinten", "Wijen", "Wijen Sangrai", "Garam", "Garam Himalaya", "Gula Pasir", "Gula Merah", "Gula Batu", "Gula Aren", "Kaldu Ayam", "Kaldu Sapi", "Kaldu Jamur", "Micin / MSG", "Terasi Bakar", "Kecap Manis", "Kecap Manis Pedas", "Kecap Asin", "Kecap Ikan", "Kecap Inggris", "Kecap Jamur", "Saus Tiram", "Saus Sambal", "Saus Ekstra Pedas", "Saus Tomat", "Saus Teriyaki", "Saus Bulgogi", "Saus Barbeque (BBQ)", "Saus Lada Hitam", "Saus Gochujang", "Saus Keju", "Saus Telur Asin (Salted Egg)", "Minyak Goreng", "Minyak Kelapa", "Minyak Wijen", "Minyak Zaitun (Olive Oil)", "Minyak Truffle", "Chili Oil", "Bumbu Nasi Goreng Instan", "Bumbu Rendang Instan", "Bumbu Soto Instan", "Bumbu Kari Instan", "Bumbu Tomyum", "Pasta Tomat", "Selai Kacang", "Selai Coklat", "Selai Strawberry", "Madu", "Sirup Maple", "Cuka Dapur", "Cuka Apel", "Baking Powder", "Baking Soda", "Ragi Instan (Fermipan)", "Ekstrak Vanili", "Pewarna Makanan", "Coklat Bubuk (Cocoa)", "Matcha Powder", "Kopi Bubuk", "Teh Celup", "Es Batu", "Nori (Rumput Laut)", "Bawang Goreng", "Abon Sapi", "Abon Ayam", "Kismis", "Chia Seeds", "Flaxseed"] }
    ];

    const menuItems = [
        { icon: '🍚', nama: 'Nasi Goreng Kampung' }, { icon: '🍚', nama: 'Nasi Gila Kosan' }, { icon: '🍚', nama: 'Nasi Sarden Mayo' }, { icon: '🍚', nama: 'Nasi Telur Pontianak' }, { icon: '🍚', nama: 'Nasi Goreng Gila' }, { icon: '🍚', nama: 'Nasi Goreng Mawut' }, { icon: '🍚', nama: 'Nasi Mentega Sosis' }, { icon: '🍚', nama: 'Nasi Kulit Ayam Krispi' },
        { icon: '🍜', nama: 'Mie Goreng Dok-Dok' }, { icon: '🍜', nama: 'Mie Nyemek Pedas' }, { icon: '🍜', nama: 'Mie Tek-Tek Kuah' }, { icon: '🍝', nama: 'Spaghetti Brulee' }, { icon: '🧀', nama: 'Mac & Cheese Rice Cooker' }, { icon: '🍜', nama: 'Bihun Goreng Spesial' }, { icon: '🍜', nama: 'Soun Goreng Cabe Ijo' }, { icon: '🍜', nama: 'Kwetiau Goreng' },
        { icon: '🍳', nama: 'Omelet Mie Instan' }, { icon: '🍘', nama: 'Telur Barendo (Padang)' }, { icon: '🍳', nama: 'Telur Ceplok Kecap' }, { icon: '🥚', nama: 'Telur Dadar Gulung' }, { icon: '🥚', nama: 'Telur Pindang' }, { icon: '🥚', nama: 'Telur Balado' }, { icon: '🥚', nama: 'Fuyunghai Sederhana' },
        { icon: '🍗', nama: 'Ayam Suwir Kemangi' }, { icon: '🍗', nama: 'Ayam Geprek Sambal Korek' }, { icon: '🍗', nama: 'Ayam Kecap Mentega' }, { icon: '🍗', nama: 'Ayam Goreng Lengkuas' }, { icon: '🥩', nama: 'Beef Teriyaki ala Kos' }, { icon: '🥩', nama: 'Tumis Kornet Bawang' }, { icon: '🥫', nama: 'Sarden Pedas Manis' }, { icon: '🐟', nama: 'Ikan Teri Kacang Balado' }, { icon: '🐟', nama: 'Lele Goreng Crispy' },
        { icon: '🌶️', nama: 'Tahu Cabai Garam' }, { icon: '🧊', nama: 'Tempe Orek Kering' }, { icon: '🧊', nama: 'Tempe Mendoan' }, { icon: '🧊', nama: 'Tahu Crispy Asam Manis' }, { icon: '🧊', nama: 'Nugget Tahu Sayur' }, { icon: '🧊', nama: 'Perkedel Tahu' }, { icon: '🧊', nama: 'Oseng Tahu Tempe Kecap' },
        { icon: '🥬', nama: 'Tumis Kangkung Terasi' }, { icon: '🥬', nama: 'Tumis Buncis Ebi' }, { icon: '🥣', nama: 'Sop Sosis Bening' }, { icon: '🥣', nama: 'Sayur Bayam Jagung' }, { icon: '🥣', nama: 'Sayur Sop Ayam Sayur' }, { icon: '🥬', nama: 'Capcay Sederhana' }, { icon: '🥬', nama: 'Tumis Sawi Putih Telur' },
        { icon: '🥘', nama: 'Seblak Kuah Pedas' }, { icon: '🥟', nama: 'Pangsit Chili Oil' }, { icon: '🍟', nama: 'Kentang Mustofa' }, { icon: '🍄', nama: 'Jamur Enoki Crispy' }
    ];

    const wadahBahan = document.getElementById('kategori-bahan-container');
    if (wadahBahan) {
        databaseBahan.forEach(grup => {
            const divKategori = document.createElement('div');
            divKategori.innerHTML = `<h3 class="text-sm font-bold text-slate-700 mb-3 border-b border-slate-100 pb-1"><i class="fa-solid ${grup.icon} mr-2 text-orange-400"></i>${grup.kategori}</h3>`;
            const divChips = document.createElement('div');
            divChips.className = "chip-container mb-4 no-select";
            grup.item.forEach(namaBahan => {
                const label = document.createElement('label');
                label.className = "cursor-pointer";
                label.innerHTML = `<input type="checkbox" name="bahan" value="${namaBahan}" class="hidden"><div class="px-4 py-2 border-2 border-slate-200 text-slate-600 rounded-full text-sm font-medium transition-all">${namaBahan}</div>`;
                divChips.appendChild(label);
            });
            divKategori.appendChild(divChips); wadahBahan.appendChild(divKategori);
        });
    }

    const daftarMenuKost = document.getElementById('daftar-menu-kost');
    if (daftarMenuKost) {
        menuItems.forEach(menu => {
            const btnMenu = document.createElement('button');
            btnMenu.className = "border-2 border-slate-200 rounded-xl p-4 text-left hover:border-orange-400 hover:bg-orange-50 hover:shadow-md transition-all active:scale-95 bg-white";
            btnMenu.innerHTML = `<div class="text-3xl mb-2 no-select">${menu.icon}</div><div class="font-bold text-slate-700 text-sm leading-tight">${menu.nama}</div>`;
            btnMenu.addEventListener('click', () => {
                sessionStorage.setItem('menuPilihan', menu.nama); sessionStorage.removeItem('bahanDipakai'); sessionStorage.removeItem('resepTerbaru');
                window.location.href = '/resep.html';
            });
            daftarMenuKost.appendChild(btnMenu);
        });
    }

    const token = sessionStorage.getItem('firebaseToken');
    const userAvatar = document.getElementById('user-avatar');
    if (token && userAvatar) {
        fetch('/api/auth/status', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => { if (!res.ok) throw new Error("Token Basi"); return res.json(); })
            .then(data => { if (data.user && data.user.foto) userAvatar.src = data.user.foto; })
            .catch(err => { sessionStorage.removeItem('firebaseToken'); });
    }

    const dropdownProfil = document.getElementById('dropdown-profil');
    if (userAvatar && dropdownProfil) {
        userAvatar.addEventListener('click', (e) => { e.stopPropagation(); dropdownProfil.classList.toggle('hidden'); dropdownProfil.classList.toggle('flex'); });
        document.addEventListener('click', (e) => { if (!dropdownProfil.contains(e.target) && !userAvatar.contains(e.target)) { dropdownProfil.classList.add('hidden'); dropdownProfil.classList.remove('flex'); } });
    }

    // LOGIKA LOGOUT
    document.getElementById('btn-logout')?.addEventListener('click', async () => {
        const btnLogout = document.getElementById('btn-logout');
        btnLogout.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2 w-4"></i> Keluar...`;
        try {
            const { getApps, initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
            const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
            const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
            const auth = getAuth(app);
            await signOut(auth);
        } catch (error) { console.error("Gagal logout:", error); }
        sessionStorage.clear();
        window.location.href = '/index.html';
    });

    // LOGIKA BUKU RESEP FAVORIT
    const btnBukaFavorit = document.getElementById('btn-buka-favorit');
    const modalFavorit = document.getElementById('favorit-modal');
    const btnTutupFavorit = document.getElementById('btn-tutup-favorit');
    const wadahFavorit = document.getElementById('daftar-favorit');

    if (btnBukaFavorit) {
        btnBukaFavorit.addEventListener('click', async () => {
            bukaModal(modalFavorit);
            wadahFavorit.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm"><i class="fa-solid fa-circle-notch fa-spin text-orange-400 text-2xl mb-3"></i><br>Mencari buku resep di server...</div>`;

            try {
                const { getApps, initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getFirestore, collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");

                const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
                const db = getFirestore(app);
                const auth = getAuth(app);

                const getUser = () => new Promise(resolve => {
                    const unsub = auth.onAuthStateChanged(user => { unsub(); resolve(user); });
                });

                const user = await getUser();
                if (!user) {
                    wadahFavorit.innerHTML = `<div class="text-center py-8 text-red-500 text-sm">Kamu harus login untuk melihat resep favorit.</div>`;
                    return;
                }

                const q = query(collection(db, "resep_favorit"), where("uid", "==", user.uid));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    wadahFavorit.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm">Buku resepmu masih kosong.<br>Mulai racik dan simpan resep pertamamu!</div>`;
                    return;
                }

                const resepArray = [];
                snapshot.forEach(doc => resepArray.push({ id: doc.id, ...doc.data() }));
                resepArray.sort((a, b) => b.createdAt - a.createdAt);

                wadahFavorit.innerHTML = '';
                resepArray.forEach(data => {
                    const btn = document.createElement('button');
                    btn.className = "w-full text-left bg-orange-50 hover:bg-orange-100 border border-orange-100 p-4 rounded-xl transition-all flex items-center justify-between group focus:outline-none mb-3";
                    btn.innerHTML = `
                        <div>
                            <h4 class="font-bold text-orange-800 text-sm mb-1">${data.judul}</h4>
                            <p class="text-xs text-orange-600/70">Disimpan pada: ${new Date(data.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                        <i class="fa-solid fa-chevron-right text-orange-300 group-hover:text-orange-500 transition-colors"></i>
                    `;
                    btn.addEventListener('click', () => {
                        sessionStorage.setItem('resepTerbaru', data.teks_resep);
                        sessionStorage.setItem('judulResepMasaLalu', data.judul);
                        sessionStorage.removeItem('bahanDipakai');
                        sessionStorage.removeItem('menuPilihan');
                        window.location.href = '/resep.html';
                    });
                    wadahFavorit.appendChild(btn);
                });

            } catch (error) {
                console.error(error);
                wadahFavorit.innerHTML = `<div class="text-center py-8 text-red-500 text-sm">Gagal memuat buku resep.<br>Pastikan koneksi internet stabil.</div>`;
            }
        });
    }

    if (btnTutupFavorit) { btnTutupFavorit.addEventListener('click', () => tutupModal(modalFavorit)); }

    function bukaModal(elemen) { elemen.classList.remove('hidden'); setTimeout(() => { elemen.classList.remove('opacity-0'); elemen.querySelector('div').classList.remove('scale-95'); }, 10); if (dropdownProfil) { dropdownProfil.classList.add('hidden'); dropdownProfil.classList.remove('flex'); } }
    function tutupModal(elemen) { elemen.classList.add('opacity-0'); elemen.querySelector('div').classList.add('scale-95'); setTimeout(() => { elemen.classList.add('hidden'); }, 300); }

    document.getElementById('btn-buka-panduan')?.addEventListener('click', () => bukaModal(document.getElementById('panduan-modal')));
    document.getElementById('btn-tutup-panduan')?.addEventListener('click', () => tutupModal(document.getElementById('panduan-modal')));
    document.getElementById('btn-buka-pengaturan')?.addEventListener('click', () => bukaModal(document.getElementById('pengaturan-modal')));
    document.getElementById('btn-tutup-pengaturan')?.addEventListener('click', () => tutupModal(document.getElementById('pengaturan-modal')));

    const errorModal = document.getElementById('error-modal');
    document.getElementById('btn-close-modal')?.addEventListener('click', () => tutupModal(errorModal));
    function showErrorModal(msg) { document.getElementById('error-message').innerText = msg; bukaModal(errorModal); }

    const tabManual = document.getElementById('tab-manual'), tabScan = document.getElementById('tab-scan'), tabMenu = document.getElementById('tab-menu');
    const secManual = document.getElementById('section-manual'), secScan = document.getElementById('section-scan'), secMenu = document.getElementById('section-menu');

    function switchTab(activeTab, activeSec) {
        [tabManual, tabScan, tabMenu].forEach(t => t.className = "flex-1 py-3 text-center rounded-xl text-slate-500 font-medium text-sm hover:bg-slate-50 transition-all");
        [secManual, secScan, secMenu].forEach(s => { s.classList.add('hidden'); s.classList.remove('block'); s.classList.remove('fade-in-up'); });
        activeTab.className = "flex-1 py-3 text-center rounded-xl bg-orange-100 text-orange-600 font-semibold text-sm transition-all";
        activeSec.classList.remove('hidden'); activeSec.classList.add('block');
        void activeSec.offsetWidth; activeSec.classList.add('fade-in-up');
        if (activeSec !== secScan) matikanKamera();
    }
    tabManual?.addEventListener('click', () => switchTab(tabManual, secManual));
    tabScan?.addEventListener('click', () => switchTab(tabScan, secScan));
    tabMenu?.addEventListener('click', () => switchTab(tabMenu, secMenu));

    const btnToggleOpsi = document.getElementById('btn-toggle-opsi');
    const areaOpsiKos = document.getElementById('area-opsi-kos');
    const iconToggleOpsi = document.getElementById('icon-toggle-opsi');
    if (btnToggleOpsi) {
        btnToggleOpsi.addEventListener('click', () => {
            areaOpsiKos.classList.toggle('hidden');
            iconToggleOpsi.classList.toggle('rotate-180');
        });
    }

    document.getElementById('form-masak')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const bahanTerpilih = Array.from(document.querySelectorAll('input[name="bahan"]:checked')).map(cb => cb.value);
        if (bahanTerpilih.length === 0) return showErrorModal('Kulkas kosong? Ceklis minimal 1 bahan dulu ya! 🥚');

        const alatTerpilih = Array.from(document.querySelectorAll('input[name="alat"]:checked')).map(cb => cb.value);
        const budget = document.getElementById('input-budget')?.value;

        document.getElementById('btn-submit-manual').innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Menuju Dapur...`;

        sessionStorage.setItem('bahanDipakai', bahanTerpilih.join(', '));
        if (alatTerpilih.length > 0) sessionStorage.setItem('alatMasak', alatTerpilih.join(', ')); else sessionStorage.removeItem('alatMasak');
        if (budget) sessionStorage.setItem('budgetMasak', budget); else sessionStorage.removeItem('budgetMasak');

        sessionStorage.removeItem('resepTerbaru'); sessionStorage.removeItem('menuPilihan'); sessionStorage.removeItem('judulResepMasaLalu');
        window.location.href = '/resep.html';
    });

    const btnBukaKamera = document.getElementById('btn-buka-kamera'), btnTutupKamera = document.getElementById('btn-tutup-kamera'), btnJepretKamera = document.getElementById('btn-jepret-kamera'), btnSwitchKamera = document.getElementById('btn-switch-kamera');
    const kameraContainer = document.getElementById('kamera-container'), kameraVideo = document.getElementById('kamera-video'), kameraCanvas = document.getElementById('kamera-canvas'), areaPilihanScan = document.getElementById('area-pilihan-scan');
    const inputGaleri = document.getElementById('input-galeri'), previewContainer = document.getElementById('preview-container'), previewFoto = document.getElementById('preview-foto'), btnBatalFoto = document.getElementById('btn-batal-foto'), btnSubmitScan = document.getElementById('btn-submit-scan');

    let base64ImageString = "", streamKamera = null;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let modeKameraSaatIni = isMobile ? "environment" : "user";

    async function hidupkanKamera() {
        if (streamKamera) { streamKamera.getTracks().forEach(track => track.stop()); }
        try {
            streamKamera = await navigator.mediaDevices.getUserMedia({ video: isMobile ? { facingMode: modeKameraSaatIni } : true });
            kameraVideo.srcObject = streamKamera;
            if (modeKameraSaatIni === "user" || !isMobile) { kameraVideo.style.transform = "scaleX(-1)"; } else { kameraVideo.style.transform = "scaleX(1)"; }

            if (isMobile) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoCameras = devices.filter(device => device.kind === 'videoinput');
                if (videoCameras.length > 1 && btnSwitchKamera) { btnSwitchKamera.classList.remove('hidden'); btnSwitchKamera.classList.add('flex'); }
                else if (btnSwitchKamera) { btnSwitchKamera.classList.add('hidden'); btnSwitchKamera.classList.remove('flex'); }
            } else if (btnSwitchKamera) { btnSwitchKamera.classList.add('hidden'); btnSwitchKamera.classList.remove('flex'); }

            areaPilihanScan.classList.add('hidden'); kameraContainer.classList.remove('hidden');
        } catch (error) { showErrorModal("Gagal membuka kamera. Pastikan browser atau perangkatmu memberikan izin akses kamera!"); }
    }

    function matikanKamera() {
        if (streamKamera) { streamKamera.getTracks().forEach(track => track.stop()); streamKamera = null; }
        kameraContainer.classList.add('hidden'); areaPilihanScan.classList.remove('hidden');
    }

    if (btnBukaKamera) btnBukaKamera.addEventListener('click', hidupkanKamera);
    if (btnTutupKamera) btnTutupKamera.addEventListener('click', matikanKamera);
    if (btnSwitchKamera) btnSwitchKamera.addEventListener('click', () => { if (isMobile) { modeKameraSaatIni = modeKameraSaatIni === "environment" ? "user" : "environment"; hidupkanKamera(); } });

    if (btnJepretKamera) {
        btnJepretKamera.addEventListener('click', () => {
            kameraCanvas.width = kameraVideo.videoWidth; kameraCanvas.height = kameraVideo.videoHeight;
            const context = kameraCanvas.getContext('2d');
            if (modeKameraSaatIni === "user" || !isMobile) { context.translate(kameraCanvas.width, 0); context.scale(-1, 1); }
            context.drawImage(kameraVideo, 0, 0, kameraCanvas.width, kameraCanvas.height);
            base64ImageString = kameraCanvas.toDataURL('image/jpeg', 0.8).split(',')[1];
            matikanKamera(); previewFoto.src = `data:image/jpeg;base64,${base64ImageString}`;
            previewContainer.classList.remove('hidden'); btnSubmitScan.classList.remove('hidden'); areaPilihanScan.classList.add('hidden');
        });
    }

    if (inputGaleri) {
        inputGaleri.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewFoto.src = e.target.result; previewContainer.classList.remove('hidden'); btnSubmitScan.classList.remove('hidden'); areaPilihanScan.classList.add('hidden');
                    base64ImageString = e.target.result.split(',')[1];
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnBatalFoto) {
        btnBatalFoto.addEventListener('click', () => {
            previewContainer.classList.add('hidden'); btnSubmitScan.classList.add('hidden'); areaPilihanScan.classList.remove('hidden'); inputGaleri.value = ""; base64ImageString = "";
        });
    }

    const areaUpload = document.getElementById('area-upload-foto'), areaHasilScan = document.getElementById('area-hasil-scan'), daftarMenuScan = document.getElementById('daftar-menu-scan');
    if (btnSubmitScan) {
        btnSubmitScan.addEventListener('click', async () => {
            const originalText = btnSubmitScan.innerHTML;
            btnSubmitScan.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Menganalisis Gambar...`; btnSubmitScan.disabled = true;
            try {
                const response = await fetch('/api/ai/scan-kulkas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageBase64: base64ImageString }) });
                const data = await response.json();
                if (response.ok) {
                    areaUpload.classList.add('hidden'); areaHasilScan.classList.remove('hidden'); daftarMenuScan.innerHTML = '';
                    data.daftarMenu.forEach(namaMenu => {
                        const btnResep = document.createElement('button');
                        btnResep.className = "flex items-center justify-between w-full bg-white border-2 border-slate-200 hover:border-orange-400 p-4 rounded-xl text-left transition-all group hover:shadow-md";
                        btnResep.innerHTML = `<span class="font-bold text-slate-700 group-hover:text-orange-600">${namaMenu}</span><i class="fa-solid fa-chevron-right text-slate-400 group-hover:text-orange-500"></i>`;
                        btnResep.addEventListener('click', () => { sessionStorage.setItem('menuPilihan', namaMenu); sessionStorage.removeItem('bahanDipakai'); sessionStorage.removeItem('resepTerbaru'); window.location.href = '/resep.html'; });
                        daftarMenuScan.appendChild(btnResep);
                    });
                } else { showErrorModal(`Gagal Scan: ${data.error}`); }
            } catch (error) { showErrorModal('Koneksi terputus! Gagal mengirim foto.'); }
            finally { btnSubmitScan.innerHTML = originalText; btnSubmitScan.disabled = false; }
        });
    }
    document.getElementById('btn-scan-ulang')?.addEventListener('click', () => { areaHasilScan.classList.add('hidden'); areaUpload.classList.remove('hidden'); btnBatalFoto.click(); });
});