// src/routes/api/file/[filename].ts
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const GET: RequestHandler = async ({ params }) => {
    const { fileName } = params;
    const filename = fileName;
    // Define the file path
    const filePath = path.resolve('./saved-files', filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return new Response('File not found', { status: 404 });
    }

    try {
        // Create a readable stream for the file
        const fileStream = fs.createReadStream(filePath);

        // Determine the content type based on the file extension
        const ext = path.extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';

        switch (ext) {
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.webp':
                contentType = 'image/webp';
                break;
            default:
                contentType = 'application/octet-stream';
        }

        // Return the response with the readable stream
        return new Response(fileStream as any, {
            headers: {
                'Content-Type': contentType
            }
        });
    } catch (err) {
        console.error('Error serving the file:', err);
        return new Response('Error serving the file', { status: 500 });
    }
};
