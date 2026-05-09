import { neon } from '@neondatabase/serverless';

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
    try {
      await fetch('https://formspree.io/f/xlgzwaaq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ad, telefon, brans, sehir, not })
      });
    } catch(formErr) {
      console.error('Formspree hatası:', formErr.message);
    }

    // 2) Neon DB
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO randevular (ad, telefon, brans, sehir, not_alan, durum)
      VALUES (${ad}, ${telefon}, ${brans || null}, ${sehir || null}, ${not || null}, 'beklemede')
    `;

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Randevu error:', error);
    res.status(500).json({ error: 'Sunucu hatası.', details: error.message });
  }
}
