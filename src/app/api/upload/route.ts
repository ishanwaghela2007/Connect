import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { IncomingMessage } from "http";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params:async(req)=>({
    folder: "profile_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

// ✅ Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpg, png, webp)"));
    }
  },
}).single("image");

// ✅ Helper to convert NextRequest to Node IncomingMessage
async function toNodeReadable(req: NextRequest): Promise<IncomingMessage> {
  const body = await req.body?.getReader().read();
  const stream = new Readable({
    read() {
      if (body?.value) this.push(Buffer.from(body.value));
      this.push(null);
    },
  });

  const incoming = Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
  });

  return incoming as IncomingMessage;
}

// ✅ Named POST export for App Router
export async function POST(req: NextRequest) {
  try {
    const nodeReq = await toNodeReadable(req);
    const nodeRes = new Response();

    const file: any = await new Promise((resolve, reject) => {
      upload(nodeReq as any, nodeRes as any, (err) => {
        if (err) return reject(err);
        const file = (nodeReq as any).file;
        if (!file) return reject(new Error("No file uploaded"));
        resolve(file);
      });
    });

    return NextResponse.json({
      message: "Upload successful",
      imageUrl: file.path, // Cloudinary secure URL
      public_id: file.filename,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
