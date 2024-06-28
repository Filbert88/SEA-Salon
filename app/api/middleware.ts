import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary environment variables are not set');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/api/signature") {
        if (req.method === 'GET') {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const params_to_sign = { timestamp };
        
            const signature = cloudinary.utils.api_sign_request(params_to_sign, apiSecret);
            return new Response(JSON.stringify({
                signature: signature,
                timestamp: timestamp
            }), {
                status: 200,
                headers: {"Content-Type": "application/json"}
            });
        } else {
            return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
                status: 405,
                headers: {"Content-Type": "application/json"}
            });
        }
    }
    return NextResponse.next();
}
