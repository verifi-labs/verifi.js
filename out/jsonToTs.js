const fs = require('fs');
const path = require('path');

const jsonDir = './'; // path to your JSON files directory
const tsDir = './'; // path to save TypeScript files

function stringifyObject(obj, indent = '  ') {
    let isArray = Array.isArray(obj);
    let entries = isArray ? obj : Object.entries(obj);
    let nextIndent = indent + '  ';
    let result = isArray ? '[' : '{\n';

    for (let i = 0; i < entries.length; i++) {
        let [key, value] = isArray ? [null, entries[i]] : entries[i];
        const end = i < entries.length - 1 ? ',' : '';

        if (value && typeof value === 'object') {
            value = stringifyObject(value, nextIndent);
        } else if (typeof value === 'string') {
            value = `'${value}'`;
        }

        result += isArray
            ? `${nextIndent}${value}${end}\n`
            : `${nextIndent}${key}: ${value}${end}\n`;
    }

    result += isArray ? ']' : `${indent}}`;

    return result;
}

function processFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Could not list the directory. ${err}`);
            process.exit(-1);
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stat) => {
                if (err) {
                    console.error(`Error stating file: ${err}`);
                    return;
                }

                if (stat.isDirectory()) {
                    // Recursively process subdirectories
                    processFiles(filePath);
                } else if (path.extname(file) === '.json') {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file from disk: ${err}`);
                            return;
                        }

                        let obj = eval('(' + data + ')');
                        let tsData = stringifyObject(obj);

                        const tsFileName = `${path.parse(file).name}.ts`;
                        const tsFilePath = path.join(tsDir, tsFileName);

                        fs.writeFile(tsFilePath, `export const ${path.parse(file).name} = ${tsData} as const;`, (err) => {
                            if (err) {
                                console.error(`Error writing file to disk: ${err}`);
                                return;
                            }
                            console.log(`File ${tsFileName} has been created.`);
                        });
                    });
                }
            });
        });
    });
}

// Start processing files from the root directory
processFiles(jsonDir);
