# AydverseDers — Proje Durumu

## Teknik Altyapı
- Domain: aydverseders.xyz
- Hosting: Vercel (GitHub otomatik deploy, region: iad1)
- Veritabanı: Neon DB (PostgreSQL, AWS US East 1 N. Virginia) ✅
- Supabase: Türkiye'den erişim engeli nedeniyle terk edildi
- Cloudflare: DNS + WAF koruması
- Formspree: aktif (xlgzwaaq) — email bildirimi için

## Dosyalar
- index.html — Ana sayfa
- admin.html — Admin paneli (şifre korumalı)
- chat.js — AI chat botu (Claude Haiku)
- randevu.js — Randevu API (Formspree + Neon DB)
- vercel.json — Region ayarı (iad1)
- package.json — ESM + Neon DB paketi

## Tamamlanan İşlemler
- Admin şifre koruması (brute-force kilidi dahil)
- Form validasyonu (ad, telefon format kontrolü)
- Rate limiting (10 dakikada max 3 gönderim)
- Chat botu Claude Haiku API ile çalışıyor
- Cloudflare WAF admin koruması
- Form → Vercel → Formspree + Neon DB akışı çalışıyor ✅
- Neon DB randevular tablosu oluşturuldu ✅
- Vercel region iad1 olarak ayarlandı ✅
- index.html temizden yeniden oluşturuldu ✅

## Bekleyen İşlemler
- Öğretmen verilerini Neon DB'den dinamik çekme
- Öğretmen kayıt ve onay sistemi
- Admin panelinde Neon DB randevularını görüntüleme
- WhatsApp bot entegrasyonu
- Logo ve favicon ekleme
- Eski Supabase NULL kayıtlarını temizleme (isteğe bağlı)

## Neon DB Tabloları
- randevular (id, ad, telefon, brans, sehir, not_alan, durum, olusturma_tarihi)

## Vercel Environment Variables
- DATABASE_URL (Neon DB connection string)
- ANTHROPIC_API_KEY
- SUPABASE_URL (artık kullanılmıyor)
- SUPABASE_ANON_KEY (artık kullanılmıyor)

## Öne Çıkan Özellik Fikirleri
- AI zayıf konu tespit botu
- WhatsApp bot entegrasyonu
- Anadolu odaklı konum filtresi
- Öğrenci gelişim takip raporu
- KPSS niş derinleşmesi

## Yeni Sohbette Kullanım
GitHub repomdaki PROJE.md dosyasını oku,
projeye kaldığımız yerden devam et.

## Son Durum
- Tarih: 09.05.2026
- Son tamamlanan: Neon DB entegrasyonu — form verileri başarıyla yazılıyor
- Sıradaki işlem: Öğretmen verilerini Neon DB'den dinamik çekme
- Uzun vadeli: Öğretmen kayıt sistemi, WhatsApp bot, logo/favicon
