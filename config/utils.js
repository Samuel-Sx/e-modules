const fs = require('fs');
const path = require('path');
const {
    config
} = require('process');

function getEnters(rootAbsPath) {
    var result = []

    function setupEnter(parent, name) {
        const dirname = path.resolve(parent, name)
        const isDirectory = fs.lstatSync(dirname).isDirectory()
        if (name === 'index.js') {
            return ({
                path: parent + '/' + name,
                name: parent.split('/').slice(-1)[0]
            })
        }
        if (isDirectory) {
            const files = fs.readdirSync(dirname)
            files.forEach(file => {
                const enter = setupEnter(dirname, file)
                if (enter) result.push(enter)
            })
        }
    }

    setupEnter(__dirname, `../${rootAbsPath}`);
    return result
}

module.exports.getEntersInfo = getEnters
