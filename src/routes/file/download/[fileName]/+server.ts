// src/routes/api/file/[filename].ts
import { error, type RequestHandler } from '@sveltejs/kit';
import { createReadStream, existsSync } from 'fs';
import { extname, resolve as resolvePath } from 'path';

export const GET: RequestHandler = async ({ params }) => {
    const { fileName } = params;
    const filename = fileName;
    // Define the file path
    const filePath = resolvePath('./saved-files', filename);

    // Check if the file exists
    if (!existsSync(filePath)) {
        return error(404,'File not found');
    }

    try {
        // Create a readable stream for the file
        const fileStream = createReadStream(filePath);

        // Determine the content type based on the file extension
        const ext = extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';
        // Return the response with the readable stream
        return new Response(fileStream as any, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': 'attachment; filename="'+fileName+'"'
            }
        });
    } catch (err) {
        return error(500,'Error serving the file');
    }
};
