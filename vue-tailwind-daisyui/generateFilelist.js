// generateFilelist.js
// -------------------------
// Reads all files/folders in the current directory (except itself and filelist.txt)
// and writes their names (relative paths) into filelist.txt — one entry per line.
// -------------------------

import fs from 'fs';
import path from 'path';

(async () => {
    try {
        const rootDir = process.cwd();
        const listFilename = 'filelist.txt';
        const scriptFullPath = process.argv[1];
        const scriptName = path.basename(scriptFullPath);

        // 1. Read all entries in the current directory
        const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });

        // 2. Filter out this script file and the target output filelist.txt
        const toWrite = entries
                .map(dirent => dirent.name)
                .filter(name => name !== scriptName && name !== listFilename)
            // (Optional) you can also filter out hidden files/folders by uncommenting:
            // .filter(name => !name.startsWith('.'))
        ;

        // 3. Write them (one per line) into filelist.txt
        const content = toWrite.join('\n') + '\n';
        await fs.promises.writeFile(path.join(rootDir, listFilename), content, 'utf-8');

        console.log(`✅ Wrote ${toWrite.length} entries to "${listFilename}".`);
    } catch (err) {
        console.error('❌ Error generating filelist.txt:', err.message);
        process.exit(1);
    }
})();
