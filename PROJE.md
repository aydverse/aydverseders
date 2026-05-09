# AydverseDers — Proje Durumu

## Teknik Altyapı
- Domain: aydverseders.xyz
- Hosting: Vercel (GitHub otomatik deploy)
- Veritabanı: Supabase (Türkiye'den erişim engeli var, geçici bypass ile çalışıyor)
- Supabase URL: https://xkppmiwnrymyafvgkxlo.supabase.co
- Cloudflare: DNS + WAF koruması
- Formspree: aktif ve çalışıyor (xlgzwaaq)

## Dosyalar
- index.html — Ana sayfa
- admin.html — Admin paneli (şifre korumalı)
- chat.js — AI chat botu (Claude Haiku) — kök dizinde
- randevu.js — Randevu API — kök dizinde
- vercel.json — Region ayarı (iad1)

## Tamamlanan İşlemler
- Admin şifre koruması (brute-force kilidi dahil)
- Form validasyonu (ad, telefon format kontrolü)
- Rate limiting (10 dakikada max 3 gönderim)
- Supabase randevular tablosuna sütunlar eklendi
- Chat botu Claude Haiku API ile çalışıyor
- Cloudflare WAF admin koruması
- Öğretmen listesi ilk yüklemede boş kalma hatası giderildi
- Supabase RLS insert politikası eklendi
- Form → Vercel → Formspree akışı çalışıyor (200 OK)
- Vercel region iad1 (Washington DC) olarak ayarlandı
- index.html temizden yeniden oluşturuldu (sbFetch kaldırıldı)

## Bekleyen İşlemler
- Supabase erişim sorunu kalıcı çözümü (Türkiye engeli)
  - Seçenek 1: Alternatif DB (Neon, PlanetScale)
  - Seçenek 2: Formspree üzerinden veri yönetimi
- Öğretmen verilerini dinamik çekme
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
- SUPABASE_URL = https://xkppmiwnrymyafvgkxlo.supabase.co
- SUPABASE_ANON_KEY (anon public key)
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
- Tarih: 09.05.2026
- Son tamamlanan: Form → Vercel → Formspree akışı çalışır hale getirildi (200 OK)
- Sorun: Supabase Türkiye'den erişilemiyor, Vercel sunucusu da etkileniyor
- Geçici çözüm: Formspree ile form verileri alınıyor
- Sıradaki işlem: Supabase yerine alternatif DB veya kalıcı çözüm
- Uzun vadeli: Öğretmen verileri dinamik, WhatsApp bot, logo/favicon
