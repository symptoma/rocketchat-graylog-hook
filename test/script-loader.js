const fs = require('fs');
const requireFromString = require('require-from-string');

const load = (scriptPath) => {
    const src = fs.readFileSync(scriptPath, 'utf8');
    return requireFromString(src + '\nmodule.exports = Script');
};

module.exports = load;
