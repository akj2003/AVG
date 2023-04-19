import { readFile } from 'fs';

function readMyFile(filePath) {

    readFile(filePath, (err, data) => {
        if (err) throw err;

        console.log(data.toString());
        return data.toJSON();
    })
}