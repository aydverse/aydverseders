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

    // 2) Supabase
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/randevular`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        notlar: `${ad} | ${telefon} | ${brans} | ${sehir} | ${not}`,
        durum: 'beklemede'
      })
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Randevu error:', error);
    res.status(500).json({ error: 'Sunucu hatası.', details: error.message });
  }
}
