import { get_keyword_token, Token, TokenType } from './token';

function is_letter(ch: string): boolean {
	return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_';
}

function is_digit(ch: string): boolean {
	return '0' <= ch && ch <= '9';
}

class Lexer {
	input: string = '';
	position: number = 0;
	read_position: number = 0;
	ch: string = '0';

	constructor(input: string) {
		this.input = input;
		this.read_char();
	}

	read_char() {
		if (this.read_position >= this.input.length) {
			this.ch = '0';
		} else {
			this.ch = this.input[this.read_position];
		}
		this.position = this.read_position;
		this.read_position = this.read_position + 1;
	}

	skip_whitespace() {
		let ch = this.ch;
		if (ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r') {
			this.read_char();
		}
	}

	peek_char(): string {
		if (this.read_position >= this.input.length) {
			return '0';
		} else {
			return this.input[this.read_position];
		}
	}

	next_token(): Token {
		const read_identifier = (l: Lexer): string => {
			let position = l.position;
			while (l.position < l.input.length && is_letter(l.ch)) {
				l.read_char();
			}
			return l.input.substring(position, l.position);
		};

		const read_number = (l: Lexer): string => {
			let position = l.position;
			while (l.position < l.input.length && is_digit(l.ch)) {
				l.read_char();
			}
			return l.input.substring(position, l.position);
		};

		let tok: TokenType;
		let value: string;
		this.skip_whitespace();
		switch (this.ch) {
			case '=':
				if (this.peek_char() == '=') {
					this.read_char();
					tok = TokenType.Eq;
					value = '==';
				} else {
					tok = TokenType.Assign;
					value = this.ch;
				}
				break;
			case '+':
				tok = TokenType.Plus;
				value = this.ch;
				break;
			case '-':
				tok = TokenType.Minus;
				value = this.ch;
				break;
			case '!':
				if (this.peek_char() == '=') {
					this.read_char();
					tok = TokenType.NotEq;
					value = '!=';
				} else {
					tok = TokenType.Bang;
					value = this.ch;
				}
				break;
			case '/':
				tok = TokenType.Slash;
				value = this.ch;
				break;
			case '*':
				tok = TokenType.Asterisk;
				value = this.ch;
				break;
			case '<':
				tok = TokenType.Lt;
				value = this.ch;
				break;
			case '>':
				tok = TokenType.Gt;
				value = this.ch;
				break;
			case ';':
				tok = TokenType.Semicolon;
				value = this.ch;
				break;
			case '(':
				tok = TokenType.LParen;
				value = this.ch;
				break;
			case ')':
				tok = TokenType.RParen;
				value = this.ch;
				break;
			case ',':
				tok = TokenType.Comma;
				value = this.ch;
				break;
			case '{':
				tok = TokenType.LBrace;
				value = this.ch;
				break;
			case '}':
				tok = TokenType.RBrace;
				value = this.ch;
				break;
			case '0':
				tok = TokenType.Eof;
				value = this.ch;
				break;
			default:
				if (is_letter(this.ch)) {
					let ident: string = read_identifier(this);
					let keyword_token = get_keyword_token(ident);
					if (keyword_token !== null) {
						return keyword_token;
					} else {
						return {
							type: TokenType.Ident,
							value: ident,
						};
					}
				} else if (is_digit(this.ch)) {
					let ident: string = read_number(this);
					return {
						type: TokenType.Int,
						value: ident,
					};
				} else {
					return {
						type: TokenType.Illegal,
						value: 'Illegal',
					};
				}
		}
		this.read_char();
		return {
			type: tok,
			value,
		};
	}
}

export default Lexer;
