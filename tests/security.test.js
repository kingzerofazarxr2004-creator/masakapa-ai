const request = require('supertest');

// Kita akan menembak langsung ke server lokal yang sedang menyala
const baseUrl = 'http://localhost:3000';

describe('Pengujian Keamanan (Security, Limitasi & Manipulasi)', () => {

    it('1. Harus menolak akses ke /api/user/favorit jika tidak bawa token (401 Unauthorized)', async () => {
        const res = await request(baseUrl).get('/api/user/favorit');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Akses ditolak! Kamu belum login.');
    });

    it('2. Harus menolak request (400 Bad Request) jika data bahan dimanipulasi jadi kosong', async () => {
        const res = await request(baseUrl)
            .post('/api/ai/generate-resep')
            .send({ bahan: [] }); // Simulasi hacker mengirim array kosong

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Bahan makanan tidak boleh kosong!');
    });

    it('3. Harus memblokir request (429 Too Many Requests) jika melebihi limit harian', async () => {
        // Simulasi hit API lebih dari 5 kali (sesuai limitMiddleware)
        for (let i = 0; i < 5; i++) {
            await request(baseUrl)
                .post('/api/ai/generate-resep')
                .send({ bahan: ['Telur', 'Kecap'] });
        }

        // Hit ke-6 harusnya diblokir oleh Satpam Limit
        const res = await request(baseUrl)
            .post('/api/ai/generate-resep')
            .send({ bahan: ['Nasi'] });

        expect(res.statusCode).toEqual(429);
        expect(res.text).toContain('limit harianmu habis');
    });
});