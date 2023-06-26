export function isNumber(value: unknown): value is number {
	return (typeof value === 'number') && (isFinite(value));
}

export function isInteger(value: unknown): boolean {
	return (typeof value === 'number') && ((value % 1) === 0);
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}