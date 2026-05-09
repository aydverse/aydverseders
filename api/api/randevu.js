export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { ad, telefon, brans, sehir, not } = req.body;
    if (!ad || !telefon) {
      res.status(400).json({ error: 'Ad ve telefon zorunlu.' });
      return;
    }

    // 1) Formspree
    const formRes = await fetch('https://formspree.io/f/xlgzwaaq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ ad, telefon, brans, sehir, not })
    });
    const formData = await formRes.json();
    if (!formRes.ok) {
      res.status(500).json({ error: formData.error || 'Formspree hatası.' });
      return;
    }

    // 2) Supabase — ayrı sütunlara yaz + response kontrol et
    const sbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/randevular`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        ad,
        telefon,
        brans:    brans || null,
        sehir:    sehir || null,
        not_alan: not   || null,
        durum:    'beklemede'
      })
    });

    if (!sbRes.ok) {
      const sbErr = await sbRes.json();
      console.error('Supabase insert hatası:', sbErr);
      // Formspree başarılı ama Supabase başarısız — yine de kullanıcıya bildir
      res.status(500).json({ error: 'Veritabanına kayıt edilemedi.', details: sbErr });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Randevu error:', error);
    res.status(500).json({ error: 'Sunucu hatası.', details: error.message });
  }
}
