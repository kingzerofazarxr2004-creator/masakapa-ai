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

    // Muat Default Budget dari Pengaturan Dapur jika ada
    const inputBudget = document.getElementById('input-budget');
    const settingDefaultBudget = document.getElementById('setting-default-budget');
    const savedDefaultBudget = localStorage.getItem('defaultBudgetKos');
    if (savedDefaultBudget) {
        if (inputBudget) inputBudget.value = savedDefaultBudget;
        if (settingDefaultBudget) settingDefaultBudget.value = savedDefaultBudget;
    }

    // Fungsi Menyimpan Filter Alat & Budget ke SessionStorage (Sinkron untuk Semua Tab)
    function simpanFilterKosKeSession() {
        const alatTerpilih = Array.from(document.querySelectorAll('input[name="alat"]:checked')).map(cb => cb.value);
        const budget = inputBudget?.value;
        if (alatTerpilih.length > 0) sessionStorage.setItem('alatMasak', alatTerpilih.join(', '));
        else sessionStorage.removeItem('alatMasak');
        if (budget) sessionStorage.setItem('budgetMasak', budget);
        else sessionStorage.removeItem('budgetMasak');
    }

    // Render 300+ Bahan dengan Desain Chip Modern Seragam
    const wadahBahan = document.getElementById('kategori-bahan-container');
    const badgeCounter = document.getElementById('badge-counter-bahan');
    const btnResetBahan = document.getElementById('btn-reset-bahan');

    function updateCounterBahan() {
        const jumlah = document.querySelectorAll('input[name="bahan"]:checked').length;
        if (badgeCounter) {
            badgeCounter.innerText = `${jumlah} Bahan Dipilih`;
            badgeCounter.className = jumlah > 0
                ? "px-3.5 py-1.5 rounded-full bg-orange-500 text-white font-bold text-xs shadow-sm transition-all"
                : "px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs border border-orange-200 transition-all";
        }
        if (btnResetBahan) {
            btnResetBahan.classList.toggle('hidden', jumlah === 0);
        }
    }

    if (wadahBahan) {
        databaseBahan.forEach(grup => {
            const divKategori = document.createElement('div');
            divKategori.className = "kategori-grup";
            divKategori.innerHTML = `
                <h3 class="text-xs sm:text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <i class="fa-solid ${grup.icon} text-orange-500"></i>
                    <span>${grup.kategori}</span>
                </h3>
            `;
            const divChips = document.createElement('div');
            divChips.className = "chip-container mb-4 no-select";

            grup.item.forEach(namaBahan => {
                const label = document.createElement('label');
                label.className = "cursor-pointer block item-bahan-label";
                label.setAttribute('data-nama', namaBahan.toLowerCase());
                label.innerHTML = `
                    <input type="checkbox" name="bahan" value="${namaBahan}" class="hidden">
                    <div class="chip-item px-3 py-2.5 bg-slate-50/80 hover:bg-orange-50/60 border border-slate-200/90 hover:border-orange-300 text-slate-700 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center text-center h-full leading-snug">
                        <i class="fa-solid fa-check chip-check opacity-0 scale-0 w-0 transition-all text-[11px]"></i>
                        <span class="truncate">${namaBahan}</span>
                    </div>
                `;
                label.querySelector('input').addEventListener('change', updateCounterBahan);
                divChips.appendChild(label);
            });

            divKategori.appendChild(divChips);
            wadahBahan.appendChild(divKategori);
        });
    }

    // Tombol Reset Pilihan Bahan
    btnResetBahan?.addEventListener('click', () => {
        document.querySelectorAll('input[name="bahan"]:checked').forEach(cb => { cb.checked = false; });
        updateCounterBahan();
    });

    // Live Search 300+ Bahan Makanan
    const searchBahan = document.getElementById('search-bahan');
    const btnClearSearch = document.getElementById('btn-clear-search');
    const bahanKosongMsg = document.getElementById('bahan-kosong-msg');

    if (searchBahan) {
        searchBahan.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            btnClearSearch?.classList.toggle('hidden', keyword.length === 0);

            let totalTampil = 0;
            document.querySelectorAll('.kategori-grup').forEach(grupEl => {
                let adaYangCocok = false;
                grupEl.querySelectorAll('.item-bahan-label').forEach(labelEl => {
                    const nama = labelEl.getAttribute('data-nama');
                    if (nama.includes(keyword)) {
                        labelEl.classList.remove('hidden');
                        adaYangCocok = true;
                        totalTampil++;
                    } else {
                        labelEl.classList.add('hidden');
                    }
                });
                grupEl.classList.toggle('hidden', !adaYangCocok);
            });

            bahanKosongMsg?.classList.toggle('hidden', totalTampil > 0);
        });

        btnClearSearch?.addEventListener('click', () => {
            searchBahan.value = '';
            searchBahan.dispatchEvent(new Event('input'));
        });
    }

    // Render 50+ Menu Kost & Live Search Menu Kost
    const daftarMenuKost = document.getElementById('daftar-menu-kost');
    const searchMenuKost = document.getElementById('search-menu-kost');

    function renderMenuKost(filterTeks = '') {
        if (!daftarMenuKost) return;
        daftarMenuKost.innerHTML = '';
        const hasilFilter = menuItems.filter(m => m.nama.toLowerCase().includes(filterTeks.toLowerCase()));

        hasilFilter.forEach(menu => {
            const btnMenu = document.createElement('button');
            btnMenu.type = "button";
            btnMenu.className = "border border-slate-200/90 rounded-2xl p-4 text-left hover:border-orange-400 hover:bg-orange-50/50 hover:shadow-md transition-all active:scale-95 bg-white flex flex-col justify-between group";
            btnMenu.innerHTML = `
                <div class="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-white flex items-center justify-center text-2xl mb-3 no-select shadow-sm">${menu.icon}</div>
                <div class="font-bold text-slate-800 group-hover:text-orange-600 text-xs sm:text-sm leading-snug transition-colors">${menu.nama}</div>
            `;
            btnMenu.addEventListener('click', () => {
                simpanFilterKosKeSession();
                sessionStorage.setItem('menuPilihan', menu.nama);
                sessionStorage.removeItem('bahanDipakai');
                sessionStorage.removeItem('resepTerbaru');
                sessionStorage.removeItem('judulResepMasaLalu');
                window.location.href = '/resep.html';
            });
            daftarMenuKost.appendChild(btnMenu);
        });
    }
    renderMenuKost();

    searchMenuKost?.addEventListener('input', (e) => {
        renderMenuKost(e.target.value.trim());
    });

    // Cek Status Autentikasi Pengguna
    const token = sessionStorage.getItem('firebaseToken');
    const userAvatar = document.getElementById('user-avatar');
    const userNama = document.getElementById('user-nama');
    if (token && userAvatar) {
        fetch('/api/auth/status', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => { if (!res.ok) throw new Error("Token Basi"); return res.json(); })
            .then(data => {
                if (data.user) {
                    if (data.user.foto) userAvatar.src = data.user.foto;
                    if (data.user.nama && userNama) userNama.innerText = data.user.nama;
                }
            })
            .catch(() => { sessionStorage.removeItem('firebaseToken'); });
    }

    // Dropdown Profil
    const triggerProfil = document.getElementById('trigger-profil') || userAvatar;
    const dropdownProfil = document.getElementById('dropdown-profil');
    if (triggerProfil && dropdownProfil) {
        triggerProfil.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownProfil.classList.toggle('hidden');
            dropdownProfil.classList.toggle('flex');
        });
        document.addEventListener('click', (e) => {
            if (!dropdownProfil.contains(e.target) && !triggerProfil.contains(e.target)) {
                dropdownProfil.classList.add('hidden');
                dropdownProfil.classList.remove('flex');
            }
        });
    }

    // Logika Logout
    document.getElementById('btn-logout')?.addEventListener('click', async () => {
        const btnLogout = document.getElementById('btn-logout');
        btnLogout.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin w-4"></i> Keluar...`;
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

    // Logika Buku Resep Favorit (Firestore)
    const btnBukaFavorit = document.getElementById('btn-buka-favorit');
    const modalFavorit = document.getElementById('favorit-modal');
    const btnTutupFavorit = document.getElementById('btn-tutup-favorit');
    const wadahFavorit = document.getElementById('daftar-favorit');

    if (btnBukaFavorit) {
        btnBukaFavorit.addEventListener('click', async () => {
            bukaModal(modalFavorit);
            wadahFavorit.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm"><i class="fa-solid fa-circle-notch fa-spin text-orange-500 text-2xl mb-3"></i><br>Memuat koleksi buku resepmu...</div>`;

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
                    wadahFavorit.innerHTML = `<div class="text-center py-8 text-red-500 text-sm">Silakan login terlebih dahulu untuk melihat resep favorit.</div>`;
                    return;
                }

                const q = query(collection(db, "resep_favorit"), where("uid", "==", user.uid));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    wadahFavorit.innerHTML = `<div class="text-center py-8 text-slate-400 text-sm"><i class="fa-regular fa-folder-open text-3xl mb-2"></i><br>Buku resepmu masih kosong.<br>Mulai racik dan simpan resep pertamamu!</div>`;
                    return;
                }

                const resepArray = [];
                snapshot.forEach(doc => resepArray.push({ id: doc.id, ...doc.data() }));
                resepArray.sort((a, b) => b.createdAt - a.createdAt);

                wadahFavorit.innerHTML = '';
                resepArray.forEach(data => {
                    const btn = document.createElement('button');
                    btn.className = "w-full text-left bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-200 p-4 rounded-2xl transition-all flex items-center justify-between group focus:outline-none mb-2.5";
                    btn.innerHTML = `
                        <div>
                            <h4 class="font-bold text-slate-800 group-hover:text-orange-700 text-sm mb-1">${data.judul}</h4>
                            <p class="text-[11px] text-slate-400"><i class="fa-regular fa-calendar mr-1"></i>Disimpan: ${new Date(data.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                        <i class="fa-solid fa-chevron-right text-slate-300 group-hover:text-orange-500 transition-colors"></i>
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
                wadahFavorit.innerHTML = `<div class="text-center py-8 text-red-500 text-sm">Gagal memuat buku resep.<br>Pastikan koneksi internetmu stabil.</div>`;
            }
        });
    }

    if (btnTutupFavorit) btnTutupFavorit.addEventListener('click', () => tutupModal(modalFavorit));

    // Fungsi Utilitas Modal
    function bukaModal(elemen) {
        if (!elemen) return;
        elemen.classList.remove('hidden');
        setTimeout(() => {
            elemen.classList.remove('opacity-0');
            elemen.querySelector('div').classList.remove('scale-95');
        }, 10);
        if (dropdownProfil) {
            dropdownProfil.classList.add('hidden');
            dropdownProfil.classList.remove('flex');
        }
    }

    function tutupModal(elemen) {
        if (!elemen) return;
        elemen.classList.add('opacity-0');
        elemen.querySelector('div').classList.add('scale-95');
        setTimeout(() => { elemen.classList.add('hidden'); }, 300);
    }

    const panduanModal = document.getElementById('panduan-modal');
    const pengaturanModal = document.getElementById('pengaturan-modal');
    const errorModal = document.getElementById('error-modal');

    document.getElementById('btn-buka-panduan')?.addEventListener('click', () => bukaModal(panduanModal));
    document.getElementById('btn-tutup-panduan')?.addEventListener('click', () => tutupModal(panduanModal));
    document.getElementById('btn-buka-pengaturan')?.addEventListener('click', () => bukaModal(pengaturanModal));
    document.getElementById('btn-tutup-pengaturan')?.addEventListener('click', () => tutupModal(pengaturanModal));
    document.getElementById('btn-close-modal')?.addEventListener('click', () => tutupModal(errorModal));

    function showErrorModal(msg) {
        document.getElementById('error-message').innerText = msg;
        bukaModal(errorModal);
    }

    // Simpan Pengaturan Dapur
    document.getElementById('btn-simpan-pengaturan')?.addEventListener('click', () => {
        const nilaiBudget = settingDefaultBudget?.value || '';
        if (nilaiBudget) {
            localStorage.setItem('defaultBudgetKos', nilaiBudget);
            if (inputBudget) inputBudget.value = nilaiBudget;
        } else {
            localStorage.removeItem('defaultBudgetKos');
        }
        tutupModal(pengaturanModal);
    });

    document.getElementById('btn-clear-cache')?.addEventListener('click', () => {
        sessionStorage.removeItem('resepTerbaru');
        sessionStorage.removeItem('bahanDipakai');
        sessionStorage.removeItem('menuPilihan');
        tutupModal(pengaturanModal);
    });

    // Navigasi Antar Tab
    const tabManual = document.getElementById('tab-manual'), tabScan = document.getElementById('tab-scan'), tabMenu = document.getElementById('tab-menu');
    const secManual = document.getElementById('section-manual'), secScan = document.getElementById('section-scan'), secMenu = document.getElementById('section-menu');

    function switchTab(activeTab, activeSec) {
        [tabManual, tabScan, tabMenu].forEach(t => {
            t.className = "py-3 px-2 text-center rounded-xl text-slate-500 font-medium text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2";
        });
        [secManual, secScan, secMenu].forEach(s => {
            s.classList.add('hidden');
            s.classList.remove('block', 'fade-in-up');
        });
        activeTab.className = "py-3 px-2 text-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2";
        activeSec.classList.remove('hidden');
        activeSec.classList.add('block');
        void activeSec.offsetWidth;
        activeSec.classList.add('fade-in-up');
        if (activeSec !== secScan) matikanKamera();
    }

    tabManual?.addEventListener('click', () => switchTab(tabManual, secManual));
    tabScan?.addEventListener('click', () => switchTab(tabScan, secScan));
    tabMenu?.addEventListener('click', () => switchTab(tabMenu, secMenu));

    // Toggle Accordion Opsi Ekstra Anak Kos
    const btnToggleOpsi = document.getElementById('btn-toggle-opsi');
    const areaOpsiKos = document.getElementById('area-opsi-kos');
    const iconToggleOpsi = document.getElementById('icon-toggle-opsi');
    if (btnToggleOpsi) {
        btnToggleOpsi.addEventListener('click', () => {
            areaOpsiKos.classList.toggle('hidden');
            iconToggleOpsi.classList.toggle('rotate-180');
        });
    }

    // Submit Form Pilih Manual
    document.getElementById('form-masak')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const bahanTerpilih = Array.from(document.querySelectorAll('input[name="bahan"]:checked')).map(cb => cb.value);
        if (bahanTerpilih.length === 0) {
            return showErrorModal('Kulkas masih kosong! Silakan centang minimal 1 bahan makanan terlebih dahulu ya. 🥚');
        }

        simpanFilterKosKeSession();
        document.getElementById('btn-submit-manual').innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Menuju Dapur AI...`;

        sessionStorage.setItem('bahanDipakai', bahanTerpilih.join(', '));
        sessionStorage.removeItem('resepTerbaru');
        sessionStorage.removeItem('menuPilihan');
        sessionStorage.removeItem('judulResepMasaLalu');
        window.location.href = '/resep.html';
    });

    // Logika Kamera & Galeri (Scan Kulkas)
    const btnBukaKamera = document.getElementById('btn-buka-kamera'), btnTutupKamera = document.getElementById('btn-tutup-kamera'), btnJepretKamera = document.getElementById('btn-jepret-kamera'), btnSwitchKamera = document.getElementById('btn-switch-kamera');
    const kameraContainer = document.getElementById('kamera-container'), kameraVideo = document.getElementById('kamera-video'), kameraCanvas = document.getElementById('kamera-canvas'), areaPilihanScan = document.getElementById('area-pilihan-scan');
    const inputGaleri = document.getElementById('input-galeri'), previewContainer = document.getElementById('preview-container'), previewFoto = document.getElementById('preview-foto'), btnBatalFoto = document.getElementById('btn-batal-foto'), btnSubmitScan = document.getElementById('btn-submit-scan');

    let base64ImageString = "", streamKamera = null;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let modeKameraSaatIni = isMobile ? "environment" : "user";

    async function hidupkanKamera() {
        if (streamKamera) streamKamera.getTracks().forEach(track => track.stop());
        try {
            streamKamera = await navigator.mediaDevices.getUserMedia({ video: isMobile ? { facingMode: modeKameraSaatIni } : true });
            kameraVideo.srcObject = streamKamera;
            kameraVideo.style.transform = (modeKameraSaatIni === "user" || !isMobile) ? "scaleX(-1)" : "scaleX(1)";

            if (isMobile) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoCameras = devices.filter(device => device.kind === 'videoinput');
                if (btnSwitchKamera) {
                    btnSwitchKamera.classList.toggle('hidden', videoCameras.length <= 1);
                    btnSwitchKamera.classList.toggle('flex', videoCameras.length > 1);
                }
            } else if (btnSwitchKamera) {
                btnSwitchKamera.classList.add('hidden');
            }

            areaPilihanScan.classList.add('hidden');
            kameraContainer.classList.remove('hidden');
        } catch (error) {
            showErrorModal("Gagal mengakses kamera. Pastikan browser kamu telah diberikan izin akses kamera!");
        }
    }

    function matikanKamera() {
        if (streamKamera) {
            streamKamera.getTracks().forEach(track => track.stop());
            streamKamera = null;
        }
        kameraContainer.classList.add('hidden');
        areaPilihanScan.classList.remove('hidden');
    }

    btnBukaKamera?.addEventListener('click', hidupkanKamera);
    btnTutupKamera?.addEventListener('click', matikanKamera);
    btnSwitchKamera?.addEventListener('click', () => {
        if (isMobile) {
            modeKameraSaatIni = modeKameraSaatIni === "environment" ? "user" : "environment";
            hidupkanKamera();
        }
    });

    btnJepretKamera?.addEventListener('click', () => {
        kameraCanvas.width = kameraVideo.videoWidth;
        kameraCanvas.height = kameraVideo.videoHeight;
        const context = kameraCanvas.getContext('2d');
        if (modeKameraSaatIni === "user" || !isMobile) {
            context.translate(kameraCanvas.width, 0);
            context.scale(-1, 1);
        }
        context.drawImage(kameraVideo, 0, 0, kameraCanvas.width, kameraCanvas.height);
        base64ImageString = kameraCanvas.toDataURL('image/jpeg', 0.8).split(',')[1];
        matikanKamera();
        previewFoto.src = `data:image/jpeg;base64,${base64ImageString}`;
        previewContainer.classList.remove('hidden');
        btnSubmitScan.classList.remove('hidden');
        areaPilihanScan.classList.add('hidden');
    });

    inputGaleri?.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewFoto.src = e.target.result;
                previewContainer.classList.remove('hidden');
                btnSubmitScan.classList.remove('hidden');
                areaPilihanScan.classList.add('hidden');
                base64ImageString = e.target.result.split(',')[1];
            };
            reader.readAsDataURL(file);
        }
    });

    btnBatalFoto?.addEventListener('click', () => {
        previewContainer.classList.add('hidden');
        btnSubmitScan.classList.add('hidden');
        areaPilihanScan.classList.remove('hidden');
        if (inputGaleri) inputGaleri.value = "";
        base64ImageString = "";
    });

    const areaUpload = document.getElementById('area-upload-foto'), areaHasilScan = document.getElementById('area-hasil-scan'), daftarMenuScan = document.getElementById('daftar-menu-scan');
    btnSubmitScan?.addEventListener('click', async () => {
        const originalText = btnSubmitScan.innerHTML;
        btnSubmitScan.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Menganalisis Foto Bahan...`;
        btnSubmitScan.disabled = true;

        try {
            const response = await fetch('/api/ai/scan-kulkas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64ImageString })
            });
            const data = await response.json();

            if (response.ok) {
                areaUpload.classList.add('hidden');
                areaHasilScan.classList.remove('hidden');
                daftarMenuScan.innerHTML = '';

                data.daftarMenu.forEach(namaMenu => {
                    const btnResep = document.createElement('button');
                    btnResep.type = "button";
                    btnResep.className = "flex items-center justify-between w-full bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50/40 p-4 rounded-2xl text-left transition-all group shadow-sm";
                    btnResep.innerHTML = `
                        <span class="font-bold text-sm text-slate-800 group-hover:text-orange-600">${namaMenu}</span>
                        <i class="fa-solid fa-arrow-right text-xs text-slate-400 group-hover:text-orange-500"></i>
                    `;
                    btnResep.addEventListener('click', () => {
                        simpanFilterKosKeSession();
                        sessionStorage.setItem('menuPilihan', namaMenu);
                        sessionStorage.removeItem('bahanDipakai');
                        sessionStorage.removeItem('resepTerbaru');
                        sessionStorage.removeItem('judulResepMasaLalu');
                        window.location.href = '/resep.html';
                    });
                    daftarMenuScan.appendChild(btnResep);
                });
            } else {
                showErrorModal(`Gagal Scan: ${data.error}`);
            }
        } catch (error) {
            showErrorModal('Koneksi terputus! Gagal mengirim foto ke server.');
        } finally {
            btnSubmitScan.innerHTML = originalText;
            btnSubmitScan.disabled = false;
        }
    });

    document.getElementById('btn-scan-ulang')?.addEventListener('click', () => {
        areaHasilScan.classList.add('hidden');
        areaUpload.classList.remove('hidden');
        btnBatalFoto?.click();
    });
});