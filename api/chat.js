export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST kabul edilir' })
  }

  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Gecersiz mesaj formati' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: 'Sen AydverseDers platformunun AI asistanisin. Ogrencilere en uygun ozel ders hocasini bulmalarinda yardim ediyorsun. Turkce cevap ver. Kisa ve net ol. Platformdaki hocalar: Matematik (Mehmet Yilmaz - Diyarbakir, YKS/LGS), Turkce (Ayse Kaya - Diyarbakir, LGS/KPSS), Ingilizce (Hasan Demir - Sanliurfa, YKS), Fen (Fatma Arslan - Diyarbakir, LGS), Tarih (Ali Celik - Istanbul, KPSS), KPSS (Zeynep Sahin - Ankara).',
        messages: messages
      })
    })

    const data = await response.json()
    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ error: 'Sunucu hatasi: ' + error.message })
  }
}
