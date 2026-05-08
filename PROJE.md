# AydverseDers — Proje Durumu

## Teknik Altyapı
- Domain: aydverseders.xyz
- Hosting: Vercel (GitHub otomatik deploy)
- Veritabanı: Supabase
- Supabase URL: https://xkppmiwnrymyafvgkxlo.supabase.co
- Cloudflare: DNS + WAF koruması
- Formspree: entegre

## Dosyalar
- index.html — Ana sayfa
- admin.html — Admin paneli (şifre korumalı)
- api/chat.js — AI chat botu (Claude Haiku)
- api/randevu.js — Randevu API

## Tamamlanan İşlemler
- Admin şifre koruması (brute-force kilidi dahil)
- Form validasyonu (ad, telefon format kontrolü)
- Rate limiting (10 dakikada max 3 gönderim)
- Supabase randevular tablosuna sütunlar eklendi
- Chat botu Claude Haiku API ile çalışıyor
- Cloudflare WAF admin koruması
- Öğretmen listesi ilk yüklemede boş kalma hatası giderildi

## Bekleyen İşlemler
- Supabase RLS insert politikası eklenmesi
- Form verisi Supabase testi
- Öğretmen verilerini Supabase ogretmenler tablosundan dinamik çekme
- Öğretmen kayıt ve onay sistemi
- WhatsApp bot entegrasyonu
- Logo ve favicon ekleme
- Eski NULL randevu kayıtlarını temizleme

## Supabase Tabloları
- randevular (id, ogretmen_id, ogrenci_id, tarih, saat, durum, ad, telefon, brans, sehir, not_alan, olusturma_tarihi)
- ogretmenler
- ogrenciler
- yorumlar
- hocalar
- ogrenci_istekleri

## Vercel Environment Variables
- SUPABASE_URL
- SUPABASE_ANON_KEY
- ANTHROPIC_API_KEY

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
- Tarih: 08.05.2026
- Son tamamlanan: Chat botu (Claude Haiku) çalışır hale getirildi
- Bekleyen: Supabase teknik sorun nedeniyle RLS izni bekliyor
- Sıradaki işlem: Supabase düzelince RLS insert politikası ekle, form test et
- Uzun vadeli: Öğretmen verileri dinamik, WhatsApp bot, logo/favicon
