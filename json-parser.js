const fs = require('node:fs')
const { argv } = require('node:process')

const SeparatorLexicalToken = {
    '{': 'LEFT_BRACE',
    '}': 'RIGHT_BRACE',
    ';': 'SEMI_COLON'
}

const WhiteSpaceToken = { 
    " ": 'BLANK_SPACE',
    "\t": 'TAB',
    "\n": 'NEW_LINE',
    "\r": 'CARRIAGE_RETURN'
}

const PunctuationTokens = {
    ':' : 'COLON',
    ',': 'COMMA'
}



const filePath = argv[2]
console.log('argv', argv[2])

if (!filePath) {
    console.error("No file path given! - Usage: node json.parser.js <path-to-json-file");
    process.exit(1);
}

const getTextFromFile = () => {
    try {
        const data = fs.readFileSync(`/Users/louwes000/Documents/Development/Personal/json-parser/${filePath}`, 'utf-8');
        return data;
    } catch (err) {
        console.error('Error reading file', err);
        return null;
    }
}

const data = getTextFromFile()

// step 1 we need the lexer to cehck for { } - an empty object in JSON notation, which is valid

const lexer = () => {
    if (data.length < 2) process.exit(1);
    let tokens = [];
    let insideString = false;
    let currentString = ''

    const split = data.split('');

    for (let i = 0; i <split.length; i++) {
        const char = split[i];

        if (insideString) {
            // collecting chars to form a string mode
            if (char === '"') {
                // found closing quote
                tokens.push({type: 'STRING', value: currentString});
                currentString = '';
                insideString = false;
            } else {
                // until final string char is reaxched we collect the chars to for currentString = 'key'
                currentString += char
            }
        } else {
            // regular token collection mode
            if (char === '"') {
                insideString = true;
                currentString = '';
            } else if (WhiteSpaceToken[char]) {
                continue
            } else if (char === '{' || char === '}') {
                tokens.push(SeparatorLexicalToken[char])
            } else if (char === ':' || char === ',') {
                tokens.push(PunctuationTokens[char])
            } else {
                console.error('Invalid JSON');
                process.exit(1);
            }
        }
    }
    
    return tokens;
}

const tokens = lexer();

const parser = () => {
    if (tokens[0] !== 'LEFT_BRACE' && tokens[tokens.length - 1] !== 'RIGHT_BRACE') {
        console.error('Invalid JSON');
        process.exit(1);
    } 

    if (tokens[0] === 'LEFT_BRACE' && tokens[tokens.length - 1] == 'RIGHT_BRACE') {
        console.log('Valid JSON');
        process.exit(0);
    }
}

parser()
