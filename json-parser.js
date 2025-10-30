const fs = require('node:fs')
/* 1.	Create a small script (say parser.js or main.py) that:
•	Takes input (either via CLI argument or reads from a test file).
•	Runs a lexer → gets tokens.
•	Runs a parser → checks if the token sequence matches {}.
•	Prints result and exits with the right code. */

const LexerTypes = {
    '{': 'LEFT_BRACE',
    '}': 'RIGHT_BRACE'
}


const getTextFromFile = () => {
    try {
        const data = fs.readFileSync('/Users/louwes000/Documents/Development/Personal/json-parser/tests/step1/invalid.json', 'utf-8');
        return data;
    } catch (err) {
        console.error('Error reading file', err);
        return null;
    }
}

const data = getTextFromFile()
console.log('data', data)

// step 1 we need the lexer to cehck for { } - an empty object in JSON notation, which is valid

const lexer = () => {
    if (data.length < 2) return 0;
    let tokens = []

    const split = data.split('');
    
    split.forEach((char) =>  {
      if (char === '{' || char === '}') {
        tokens.push(LexerTypes[char])
      }
    })
    console.log("tokens", tokens)
    return tokens;
}

const tokens = lexer();

// step 2 -parse then checks if index 0 = left brace and index LAST is right brace and for length of 2

const parser = () => {
 if (tokens[0] !== 'LEFT_BRACE' && tokens[tokens.length - 1] !== 'RIGHT_BRACE') {
     console.log(`Not valid JSON`, 1) 
 } 

if (tokens[0] === 'LEFT_BRACE' && tokens[tokens.length - 1] == 'RIGHT_BRACE') {
    console.log('VALID JSON', 0)
}
}

parser()
