export enum TokenType {
	Illegal = 'Illegal',
	Eof = 'Eof',

	Ident = 'Ident',
	Int = 'Int',

	Assign = 'Assign',
	Plus = 'Plus',
	Comma = 'Comma',
	Semicolon = 'Semicolon',
	LParen = 'LParen',
	RParen = 'RParen',
	LBrace = 'LBrace',
	RBrace = 'RBrace',
	Function = 'Function',
	Let = 'Let',
	True = 'True',
	False = 'False',
	If = 'If',
	Else = 'Else',
	Return = 'Return',
	Minus = 'Minus',
	Bang = 'Bang',
	Asterisk = 'Asterisk',
	Slash = 'Slash',
	Lt = 'Lt',
	Gt = 'Gt',

	Eq = 'Eq',
	NotEq = 'NotEq',
}

export interface Token {
	type: TokenType;
	value: string;
}

export function get_keyword_token(ident: string): Token | null {
	let identifier: string = ident;
	let matched_type: TokenType | null;
	switch (identifier) {
		case 'fn':
			matched_type = TokenType.Function;
			break;
		case 'let':
			matched_type = TokenType.Let;
			break;
		case 'true':
			matched_type = TokenType.True;
			break;
		case 'false':
			matched_type = TokenType.False;
			break;
		case 'if':
			matched_type = TokenType.If;
			break;
		case 'else':
			matched_type = TokenType.Else;
			break;
		case 'return':
			matched_type = TokenType.Return;
			break;
		default:
			matched_type = null;
	}
	if (matched_type == null) {
		return null;
	} else {
		return {
			type: matched_type,
			value: identifier,
		};
	}
}
