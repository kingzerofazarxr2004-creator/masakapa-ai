const request = require('supertest');
const baseUrl = 'http://localhost:3000';

describe('Pengujian Aplikasi Utama (App & Routes)', () => {

    it('1. Harus merespons status 404 (Not Found) untuk rute yang tidak pernah dibuat', async () => {
        const res = await request(baseUrl).get('/api/rute-ngawur-hacker-123');
        // Express otomatis mengembalikan 404 untuk rute yang tidak terdaftar
        expect(res.statusCode).toEqual(404);
    });

    it('2. Harus memastikan endpoint /api/auth/status terdaftar dengan benar', async () => {
        const res = await request(baseUrl).get('/api/auth/status');
        // Jika rute ini terdaftar tapi kita tidak bawa token, pasti mengembalikan 401
        // Jika rute ini TIDAK terdaftar, dia akan mengembalikan 404.
        // Kita harap 401, artinya rute berhasil ditemukan tapi kita dicegat satpam.
        expect(res.statusCode).toEqual(401);
    });

    it('3. Harus memastikan endpoint /api/ai/scan-kulkas terdaftar & menolak foto kosong', async () => {
        const res = await request(baseUrl)
            .post('/api/ai/scan-kulkas')
            .send({ imageBase64: "" }); // Kirim gambar kosong

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Gambar kulkas tidak ditemukan!');
    });
});