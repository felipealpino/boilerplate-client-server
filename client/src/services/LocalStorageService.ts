import { ZodSchema } from 'zod'

export class LocalStorageService {
  static setItem<T>(key: string, value: T, schema: ZodSchema<T>): void {
    try {
      const parsedValue = schema.parse(value)
      localStorage.setItem(key, JSON.stringify(parsedValue))
    } catch (e: any) {
      console.error('Validation failed:', e.errors)
    }
  }

  static getItem<T>(key: string, schema: ZodSchema<T>): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null

    try {
      const parsedValue = JSON.parse(item)
      return schema.parse(parsedValue)
    } catch (e: any) {
      console.error('Validation or parsing failed:', e.errors)
      return null
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  static clear(): void {
    localStorage.clear()
  }
}
