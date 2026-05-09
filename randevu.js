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

    const formRes = await fetch('https://formspree.io/f/xlgzwaaq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ ad, telefon, brans, sehir, not })
    });

    if (!formRes.ok) {
      const err = await formRes.json().catch(() => ({}));
      res.status(500).json({ error: err.error || 'Form gönderilemedi.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Randevu error:', error);
    res.status(500).json({ error: 'Sunucu hatası.', details: error.message });
  }
}
