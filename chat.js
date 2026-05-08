export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST kabul edilir' })
  }

  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Geçersiz mesaj formatı' })
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
        system: `Sen AydverseDers platformunun AI asistanısın. Öğrencilere en uygun özel ders hocasını bulmalarında yardım ediyorsun. Türkçe cevap ver. Kısa ve net ol. Branş, şehir ve sınav türüne göre öneri yap. Platformdaki hocalar: Matematik (Mehmet Yılmaz - Diyarbakır, YKS/LGS), Türkçe (Ayşe Kaya - Diyarbakır, LGS/KPSS), İngilizce (Hasan Demir - Şanlıurfa, YKS), Fen (Fatma Arslan - Diyarbakır, LGS), Tarih (Ali Çelik - İstanbul, KPSS), KPSS (Zeynep Şahin - Ankara).`,
        messages: messages
      })
    })

    const data = await response.json()
    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ error: 'Sunucu hatası' })
  }
}
