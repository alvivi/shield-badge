declare module 'gh-badges' {
  export class BadgeFactory {
    create(format: BadgeFormat): string
  }

  export interface BadgeFormat {
    color?: string
    format?: Format
    labelColor?: string
    template?: string
    text: [string, string]
  }

  export type Format = 'svg' | 'json'
}
