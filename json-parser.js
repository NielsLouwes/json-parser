const fs = require('node:fs')
const { argv } = require('node:process')

const SeparatorLexicalToken = {
    '{': 'LEFT_BRACE',
    '}': 'RIGHT_BRACE'
}

const WhiteSpaceToken = { 
    " ": 'BLANK_SPACE',
    "\t": 'TAB',
    "\n": 'NEW_LINE',
    "\r": 'CARRIAGE_RETURN'
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
    let tokens = []

    const split = data.split('');
    
    split.forEach((char) =>  {
      if (WhiteSpaceToken[char]) {
        return; 
      }
      if (char === '{' || char === '}') {
        tokens.push(SeparatorLexicalToken[char])
      } else {
        console.error('Invalid JSON');
        process.exit(1);
      }
    })
    console.log("tokens", tokens)
    if (tokens.length !== 2) {
        process.exit(1);
    }
    return tokens;
}

const tokens = lexer();

// step 2 -parse then checks if index 0 = left brace and index LAST is right brace and for length of 2

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
