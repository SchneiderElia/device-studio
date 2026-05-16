import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  const interfaces = os.networkInterfaces();
  let localIp = '127.0.0.1';

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];
    for (const details of networkInterface) {
      if (details.family === 'IPv4' && !details.internal) {
        // We prioritize 192.168 addresses as requested
        if (details.address.startsWith('192.168.')) {
          return NextResponse.json({ ip: details.address });
        }
        // Fallback to any other local IP
        localIp = details.address;
      }
    }
  }

  return NextResponse.json({ ip: localIp });
}
