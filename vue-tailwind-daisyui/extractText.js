// extractText.js
// -------------------------
// Node.js script to read a list of files/folders from "textExtractInclude.txt"
// (and an optional "textExtractExclude.txt") and produce "textExtractOutput.json" containing
// an array of { path, contents }.
//
// Usage: `node extractText.js` (assumes you have textExtractInclude.txt - and optionally textExtractExclude.txt -
// in the same folder).
// -------------------------

import fs from 'fs';
import path from 'path';

// 1. CONFIGURATION: names of the input lists and output file
const LIST_FILENAME     = 'textExtractInclude.txt';
const EXCLUDE_FILENAME  = 'textExtractExclude.txt';
const OUTPUT_FILENAME   = 'textExtractOutput.json';

// 2. Helper: recursively walk through a directory, skipping excluded paths,
//    and invoke 'callback' on each non-excluded file.
async function walkDir(dirPath, callback, rootDir, excludeList) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (let entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        // Compute a normalized relative path (forward-slashes) from rootDir
        const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');

        // Check if this path is excluded (exact match or sub-path of an excluded directory)
        let isExcluded = false;
        for (let exc of excludeList) {
            if (relPath === exc || relPath.startsWith(exc + '/')) {
                isExcluded = true;
                break;
            }
        }
        if (isExcluded) {
            // Skip this file or entire directory subtree
            continue;
        }

        if (entry.isDirectory()) {
            await walkDir(fullPath, callback, rootDir, excludeList);
        } else if (entry.isFile()) {
            await callback(fullPath);
        }
        // (Symbolic links and other types are ignored in this simple version)
    }
}

(async () => {
    try {
        const rootDir = process.cwd();
        const listPath    = path.join(rootDir, LIST_FILENAME);
        const excludePath = path.join(rootDir, EXCLUDE_FILENAME);

        // 3. Read exclude.txt (if it exists), otherwise treat as empty
        let excludeList = [];
        try {
            const rawExclude = await fs.promises.readFile(excludePath, 'utf-8');
            excludeList = rawExclude
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'))
                // Normalize to forward-slash relative paths
                .map(line => line.replace(/\\/g, '/'));
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err; // real error reading exclude.txt
            }
            // else exclude.txt not found → empty excludeList
        }

        // 4. Read the list of files and folders to include, line by line
        const rawList = await fs.promises.readFile(listPath, 'utf-8');
        const includeLines = rawList
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#'))
            .map(line => line.replace(/\\/g, '/')); // normalize separators

        // 5. Array to accumulate { path: relativePath, contents: fileContents }
        const results = [];

        // 6. Process each include-line unless it’s explicitly excluded
        for (let line of includeLines) {
            // If the include path is exactly in excludeList, skip entirely
            if (excludeList.includes(line)) {
                console.warn(`⚠️ Skipping "${line}" (explicitly excluded)`);
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
                // Read this single file (already checked not in excludeList)
                const relPath = line; // normalized relative path
                const contents = await fs.promises.readFile(targetPath, 'utf-8');
                results.push({ path: relPath, contents });
            }
            else if (stat.isDirectory()) {
                // Recurse into directory, skipping any sub-paths in excludeList
                await walkDir(
                    targetPath,
                    async (foundFilePath) => {
                        const relFound = path
                            .relative(rootDir, foundFilePath)
                            .replace(/\\/g, '/');
                        const contents = await fs.promises.readFile(foundFilePath, 'utf-8');
                        results.push({ path: relFound, contents });
                    },
                    rootDir,
                    excludeList
                );
            }
            else {
                console.warn(`⚠️ Skipping "${line}" (not a file or directory)`);
            }
        }

        // 7. Write results as JSON array to output json file
        const jsonString = JSON.stringify(results, null, 2 /* pretty-print */);
        await fs.promises.writeFile(path.join(rootDir, OUTPUT_FILENAME), jsonString, 'utf-8');
        console.log(`✅ Done. Wrote ${results.length} entries to "${OUTPUT_FILENAME}".`);
    } catch (error) {
        console.error('❌ An error occurred:', error);
        process.exit(1);
    }
})();
