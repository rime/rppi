# RIME Plum Package Index
![](https://img.shields.io/github/license/LibreService/rppi)

## Supported platforms
* [My RIME](https://github.com/LibreService/my_rime)

## Specification
```ts
type PARENT_INDEX = {
  categories: {
    key: string
    name: string
  }[]
}

type CHILD_INDEX = {
  repo: string // e.g. rime/rime-double-pinyin
  branch?: string // Omit if use default branch
  name: string
  labels?: ('chord' | 'lua')[]
  schemas: string[] // e.g. luna_pinyin
  dependencies?: string[] // Hard dependencies only. e.g. rime/rime-luna-pinyin
  license?: string // Omit if no OSI-approved license
}
```
