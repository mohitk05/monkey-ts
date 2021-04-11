import * as readline from 'readline';
import Lexer from '../lexer';
import { Token, TokenType } from '../lexer/token';
const rdline = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const question_async = (ques: string) => {
	return new Promise<string>((res) => {
		rdline.question(ques, (ans: string) => {
			rdline.close();
			res(ans);
		});
	});
};

class Repl {
	static async start() {
		console.log(
			'Welcome to the Monkey Programming language implementation in TypeScript'
		);
		while (1) {
			let PROMPT = '>> ';
			let input = await question_async(PROMPT);
			input = input.trim();

			// Create Lexer
			let lexer = new Lexer(input);
			let token: Token;
			while ((token = lexer.next_token())) {
				if (token.type == TokenType.Illegal) {
					console.log(`Error! Illegal token '${lexer.ch}'`);
					break;
				} else if (token.type == TokenType.Eof) {
					break;
				} else {
					console.log(token);
				}
			}
		}
	}
}

export default Repl;
