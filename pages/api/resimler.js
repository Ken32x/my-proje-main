
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch('http://localhost:3001/api/resimler');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('API hata:', error);
      res.status(500).json({ error: 'Veri alınamadı' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
