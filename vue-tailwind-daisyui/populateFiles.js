// populateFiles.js
// -------------------------
// Node.js script to read "output.json" and write each "path" => "contents" back to disk.
// Usage: `node populateFiles.js` (run from the same folder where output.json lives).
// -------------------------

import fs from 'fs';
import path from 'path';

const OUTPUT_FILENAME = 'output.json';

(async () => {
    try {
        const rootDir = process.cwd();
        const jsonPath = path.join(rootDir, OUTPUT_FILENAME);

        // 1. Read and parse output.json
        const raw = await fs.promises.readFile(jsonPath, 'utf-8');
        let entries;
        try {
            entries = JSON.parse(raw);
            if (!Array.isArray(entries)) {
                throw new Error('output.json must be an array of { path, contents } objects.');
            }
        } catch (parseErr) {
            throw new Error(`Failed to parse "${OUTPUT_FILENAME}" as JSON: ${parseErr.message}`);
        }

        // 2. For each entry, write contents to the given relative path
        let count = 0;
        for (const item of entries) {
            if (
                typeof item !== 'object' ||
                typeof item.path !== 'string' ||
                typeof item.contents !== 'string'
            ) {
                console.warn(
                    `⚠️  Skipping invalid entry at index ${count}: must be { path: string, contents: string }`
                );
                continue;
            }

            const relPath = item.path.replace(/\\/g, '/'); // normalize backslashes just in case
            const fullPath = path.join(rootDir, relPath);
            const dir = path.dirname(fullPath);

            // 2a. Ensure parent directory exists
            await fs.promises.mkdir(dir, { recursive: true });

            // 2b. Write (or overwrite) the file
            await fs.promises.writeFile(fullPath, item.contents, 'utf-8');
            count++;
        }

        console.log(`✅ Wrote ${count} file${count === 1 ? '' : 's'} from "${OUTPUT_FILENAME}".`);
    } catch (err) {
        console.error('❌ An error occurred:', err.message);
        process.exit(1);
    }
})();
