// api/chat.js - Ogrenci-Hoca eslestirme botu
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const sorular = [
  { id: 'isim', soru: 'Merhaba! Adiniz nedir?' },
  { id: 'ders', soru: 'Hangi ders icin ozel ders ariyorsunuz?' },
  { id: 'sehir', soru: 'Hangi sehirde yasiyorsunuz?' },
  { id: 'seviye', soru: 'Hangi seviye? (LGS, YKS, KPSS)' }
]

let kullaniciVerileri = {}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST istegi kabul edilir' })
  }

  const { mesaj, oturumId } = req.body
  let soruIndex = req.body.soruIndex || 0

  if (!mesaj) {
    return res.status(200).json({ 
      cevap: sorular[0].soru,
      soruIndex: 1,
      tamamlandi: false
    })
  }

  const oncekiSoru = sorular[soruIndex - 1]
  if (oncekiSoru) {
    if (!kullaniciVerileri[oturumId]) kullaniciVerileri[oturumId] = {}
    kullaniciVerileri[oturumId][oncekiSoru.id] = mesaj
  }

  if (soruIndex < sorular.length) {
    return res.status(200).json({ 
      cevap: sorular[soruIndex].soru,
      soruIndex: soruIndex + 1,
      tamamlandi: false
    })
  }

  const veri = kullaniciVerileri[oturumId]
  
  const { data: hocalar, error } = await supabase
    .from('hocalar')
    .select('*')
    .eq('branş', veri.ders)
    .eq('aktif', true)
    .order('puan', { ascending: false })
    .limit(3)

  if (error || !hocalar || hocalar.length === 0) {
    return res.status(200).json({
      cevap: 'Uygun hocamiz bulunamadi.',
      tamamlandi: true,
      hocalar: []
    })
  }

  let hocaMesaji = veri.isim + ', sana uygun hocalar:\n\n'
  for (let i = 0; i < hocalar.length; i++) {
    hocaMesaji += (i+1) + '. ' + hocalar[i].ad_soyad + ' - ' + hocalar[i].branş + '\n'
  }

  await supabase
    .from('ogrenci_istekleri')
    .insert([{
      ad_soyad: veri.isim,
      ders: veri.ders,
      sehir: veri.sehir,
      seviye: veri.seviye,
      durum: 'bot_eslestirdi'
    }])

  return res.status(200).json({
    cevap: hocaMesaji,
    tamamlandi: true,
    hocalar: hocalar
  })
}