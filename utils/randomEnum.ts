export function randomEnumValue<T>(e: T): T[keyof T] {
    const enumValues = Object.values(e as Record<string, T>) as T[keyof T][];
    const randIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randIndex];
}