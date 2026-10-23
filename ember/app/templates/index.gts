import { Page, SectionedPage } from '#src';

<template>
  <SectionedPage @title="Page" @description="a little explanation">
    <:nav as |Link|>
      <Link @href="/">Index</Link>
      <Link @href="/">A longer text within the link</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <Link @href="/">Index</Link>
      <span>nav</span>
      <span>nav</span>
    </:nav>
    <:content>
      <Page @title="Content Area" @description="a second explanation">
        A subpage

      </Page>
    </:content>
  </SectionedPage>
</template>
