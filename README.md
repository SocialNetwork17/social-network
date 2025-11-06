This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

#### Рекомендации к именам коммитов

-   Названия коммитов следует соблюдать согласно [гайдлайну](https://www.conventionalcommits.org/en/v1.0.0/)
-   Тип коммита может быть только в нижнием регистре (`feat`, `fix`, `refactor`, `docs` и т.д.)
-   (_) - Указывает область изменений.
    В данном случае _ означает, что изменения касаются всей кодовой базы или не относятся к одной конкретной области.
    Обычно вместо \* могут быть указаны конкретные модули, файлы или компоненты, например: feat(ui):, feat(api):, feat(auth):.
-   Может использоваться present tense ("add feature" not "added feature")
-   Может использоваться imperative mood ("move cursor to..." not "moves cursor to...")

#### Примеры имен коммитов

-   `init` - используется для начала проекта/таска. Примеры:

```
init(package): start sprint-1
init(*): start html-coding task
```

-   `feat` - это реализованная новая функциональность из технического задания (добавил поддержку зумирования, добавил footer, добавил карточку продукта). Примеры:

```
feat(*): add basic page layout
feat(search-input): implement search box
```

-   `fix` - исправил ошибку в ранее реализованной функциональности. Примеры:

```
fix(*): change layout for video items to fix bugs
fix(header): relayout header for firefox
```

-   `refactor` - новой функциональности не добавлял / поведения не менял. Файлы в другие места положил, удалил, добавил. Изменил форматирование кода (white-space, formatting, missing semi-colons, etc). Улучшил алгоритм, без изменения функциональности. Примеры:

```
refactor(*): change the structure of the project
refactor(constants): rename vars for better readability
```

-   `docs` - используется при работе с документацией/readme проекта. Примеры:

```
docs(*): update readme with additional information
docs(readme): update description of run() method
```

---
