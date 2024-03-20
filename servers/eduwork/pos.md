Sistem POS (point of sales) mendukung transaksi jual, beli, kelola produk dan laporan transaksi digital

USER STORY

1. [] customer bisa lihat (nama, harga) filter (kategori, tags) cari bersadar (nama)
2. [] customer bisa daftar masuk dan pesan makanan, masukkan ke keranjang lihat total belanja dan ubah jumlah pesanan lalu checkout
3. [] customer bisa menambah, mengubah dan memilih alamat pengiriman, lihat invoice dan riwayat pesanan;

DATABASE

1. User ({fullname: string, email: string, password: string, role: enum[user, admin], customer_id: integer})
2. DeliveryAddress ({nama:string, provinsi:string, kabupate:string, kecamatan:string, keluranan:string, detail:string, user_id:User})
3. Order ({status:enum[waiting_payment, processing, in_delivery, delivered], delivery_fee:integer, delivery_address:DeliveryAddress, user:User, order_items:OrderItem})
4. CartItem ({name:string, qty:integer, price:integer, image_url:string, user:user, product:product})
5. OrderItem ({name:string, price:integer, qty:integer, product:Product, order:Order})
6. Invoice ({sub_total:integer, delivery_fee:integer, delivery_address:DeliveryAddress, total:integer, payment_status:enum[waiting_payment, paid]})
7. Product ({name:string, description:string, price:integer, image_url:string, category:Category, tags:Tag})
8. Category ({name:string})
9. Tag ({name:string})

ENTITY: Product (ALL), category (All), tag (All), cart (All), order (GET, POST), cart (GET, PUT), invoice, delivery address

## Mulai Buat Backend dari sini

1. Pakai Express Generator `express --view=pug .` lalu install dependensi `npm install`
2. pada file package.json tambahkan berikut, agar dinggal dijalankan dengan `npm run dev`

```
"scripts": {
  "dev": "SET DEBUG=server:* && nodemon start"
},
```

3. jalankan server `localhost:3000`, matikan server dulu untuk instal dependensi berikut yang nantinya akan dibutuhkan:

```
npm i @casl/ability bcrypt cors dotenv jsonwebtoken mongoose mongoose-sequence multer passport passport-local
```

4. buat file .env yang nantinya akan dipanggil file config/constants.js

```
> jika menggunakan koneksi lokal
SECRET_KEY=
SERVICE_NAME=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
> jika menggukanakan koneksi online gunakanconnection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority
```

5. buat file .gitignore

```
node_modules
.env
```

6. Buat koneksinya di config/index.js lalu tambahkan berikut pada bin/www

```
db.on("open", function () {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
});
```

7. Selanjutnya tinggal mengikuti struktur filenya
