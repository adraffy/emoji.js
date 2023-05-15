export const POSSIBLE_REGEX: RegExp;
export const RGI_REGEX: RegExp;

export const RGI_EMOJI: readonly string[];

export function qualifize(emoji: string): string?;

interface Token {
	index: number;
	text?: string:
	emoji?: string;
	RGI?: string;
}
export function tokenize(input: string): Token[];
