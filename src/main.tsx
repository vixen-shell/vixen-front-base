import Root from '@vixen-front/root'

Root.create(document.getElementById('root')!).render({
    importCallback: (feature) => import(`./${feature}/index.tsx`),
})
