module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, timestamp, device, ...rest } = req.body || {};
  const label = event || 'unknown_event';
  const when = timestamp || new Date().toISOString();
  const deviceInfo = device ? ` | ${device.type} ${device.os} ${device.screen} ${device.lang}` : '';
  const extras = Object.keys(rest).length ? ` | ${JSON.stringify(rest)}` : '';

  console.log(`[PROPOSAL] ${when} | ${label}${deviceInfo}${extras}`);

  return res.status(200).json({ ok: true });
};
