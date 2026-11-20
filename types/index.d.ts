export interface PasswordOptions {
  minLength?: number;
}

export function capitalize(value: string): string;
export function reverseString(value: string): string;
export function slugify(value: string): string;
export function truncate(value: string, length: number, suffix?: string): string;
export function countWords(value: string): number;
export function isPalindrome(value: string): boolean;

export function removeDuplicates<T>(value: T[]): T[];
export function chunkArray<T>(value: T[], size: number): T[][];
export function flattenArray<T>(value: T[]): T[];
export function findMax(value: number[]): number;
export function findMin(value: number[]): number;
export function shuffleArray<T>(value: T[]): T[];

export function isValidEmail(value: unknown): boolean;
export function isValidPhone(value: unknown): boolean;
export function isStrongPassword(value: unknown, options?: PasswordOptions): boolean;
export function isEmpty(value: unknown): boolean;
export function isValidURL(value: unknown): boolean;

export function deepClone<T>(value: T): T;
export function pick<T extends object, K extends keyof T>(value: T, keys: K[]): Pick<T, K>;
export function omit<T extends object, K extends keyof T>(value: T, keys: K[]): Omit<T, K>;
export function isEmptyObject(value: object): boolean;
export function mergeObjects(...objects: object[]): object;

export function clamp(value: number, min: number, max: number): number;
export function roundTo(value: number, places?: number): number;
export function randomNumber(min?: number, max?: number): number;
export function isEven(value: number): boolean;
export function isOdd(value: number): boolean;

export type DateInput = string | number | Date;
export function formatDate(value: DateInput, format?: string): string;
export function timeAgo(value: DateInput, now?: DateInput): string;
export function getDaysBetween(start: DateInput, end: DateInput): number;
export function isValidDate(value: unknown): boolean;
