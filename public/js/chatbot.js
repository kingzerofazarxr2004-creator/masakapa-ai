document.addEventListener("DOMContentLoaded", () => {
    // Kita asumsikan di HTML kamu nanti ada elemen dengan ID ini
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const btnSend = document.getElementById('btn-send');

    if (chatBox && chatInput && btnSend) {
        // Event Listener untuk Tombol Kirim
        btnSend.addEventListener('click', sendMessage);

        // Event Listener jika user menekan tombol 'Enter' di keyboard
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return; // Jangan kirim pesan kosong

        // 1. Tampilkan pesan user (Gelembung Kanan / Oranye)
        appendMessage('user', message);
        chatInput.value = ''; // Kosongkan input setelah dikirim

        // 2. Tampilkan indikator animasi Koki AI sedang mengetik (...)
        const typingId = appendTypingIndicator();

        try {
            // 3. Kirim ke backend (Nanti kita buat endpoint /api/ai/chat di backend)
            // Kode di bawah ini adalah persiapan untuk API tersebut
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pesan: message })
            });

            const data = await response.json();

            // 4. Hapus indikator mengetik
            removeElement(typingId);

            // 5. Tampilkan balasan AI (Gelembung Kiri / Putih)
            if (response.ok) {
                appendMessage('ai', data.balasan || "Maaf, koki sedang sibuk masak.");
            } else {
                appendMessage('ai', `Waduh: ${data.error}`);
            }
        } catch (error) {
            removeElement(typingId);
            appendMessage('ai', "Sinyal terputus! Koki AI tidak bisa membalas saat ini. 📡");
        }
    }

    // Fungsi untuk membuat Gelembung Chat (Chat Bubbles)
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        // Jika sender = user, gelembung di kanan. Jika ai, gelembung di kiri.
        msgDiv.className = `flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const bubble = document.createElement('div');
        bubble.className = `p-3 rounded-2xl max-w-[80%] text-sm md:text-base leading-relaxed ${sender === 'user'
            ? 'bg-orange-500 text-white rounded-tr-none shadow-md'
            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
            }`;

        // Render baris baru jika ada
        bubble.innerHTML = text.replace(/\n/g, '<br>');

        msgDiv.appendChild(bubble);
        chatBox.appendChild(msgDiv);

        // Otomatis scroll layar ke bawah tiap ada pesan baru
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fungsi membuat animasi titik 3 (mengetik)
    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = `flex mb-4 justify-start`;

        msgDiv.innerHTML = `
            <div class="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center h-10">
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.15s;"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.3s;"></div>
            </div>
        `;

        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return id;
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});