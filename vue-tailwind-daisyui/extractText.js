// extractText.js
// -------------------------
// Node.js script to read a list of files/folders from "filelist.txt"
// and produce "output.json" containing an array of { path, contents }.
//
// Usage: `node extractText.js` (assumes you have filelist.txt in the same folder).
// -------------------------


import fs from 'fs';
import path from 'path';

// 1. CONFIGURATION: names of the input list and output file
const LIST_FILENAME   = 'filelist.txt';
const OUTPUT_FILENAME = 'output.json';

// 2. Helper: recursively walk through a directory and invoke 'callback' on each file
async function walkDir(dirPath, callback) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (let entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await walkDir(fullPath, callback);
        } else if (entry.isFile()) {
            await callback(fullPath);
        }
        // (Symbolic links, etc. are ignored in this simple version.)
    }
}

(async () => {
    try {
        const rootDir = process.cwd();
        const listFile = path.join(rootDir, LIST_FILENAME);

        // 3. Read the list of files and folders, line by line
        const rawList = await fs.promises.readFile(listFile, 'utf-8');
        const lines = rawList.split(/\r?\n/);

        // Array to accumulate { path: relativePath, contents: fileContents }
        const results = [];

        // 4. Process each non-empty, non-comment line
        for (let rawLine of lines) {
            const line = rawLine.trim();
            if (!line || line.startsWith('#')) {
                // skip blank lines or comments
                continue;
            }

            const targetPath = path.join(rootDir, line);
            let stat;
            try {
                stat = await fs.promises.stat(targetPath);
            } catch (err) {
                console.warn(`⚠️ Skipping "${line}" (does not exist or is inaccessible)`);
                continue;
            }

            if (stat.isFile()) {
                // Directly read this one file
                const absoluteFilePath = targetPath;
                const relPath = path.relative(rootDir, absoluteFilePath).replace(/\\/g, '/');
                const contents = await fs.promises.readFile(absoluteFilePath, 'utf-8');
                results.push({ path: relPath, contents });
            } else if (stat.isDirectory()) {
                // Recurse into directory
                await walkDir(targetPath, async (foundFilePath) => {
                    const relPath = path.relative(rootDir, foundFilePath).replace(/\\/g, '/');
                    const contents = await fs.promises.readFile(foundFilePath, 'utf-8');
                    results.push({ path: relPath, contents });
                });
            } else {
                console.warn(`⚠️ Skipping "${line}" (not a file or directory)`);
            }
        }

        // 5. Write results as JSON array to output file
        const jsonString = JSON.stringify(results, null, 2 /* pretty‐print */);
        await fs.promises.writeFile(path.join(rootDir, OUTPUT_FILENAME), jsonString, 'utf-8');
        console.log(`✅ Done. Wrote ${results.length} entries to "${OUTPUT_FILENAME}".`);
    } catch (error) {
        console.error('❌ An error occurred:', error);
        process.exit(1);
    }
})();
