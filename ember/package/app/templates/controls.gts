import { SectionedPage } from '#src';

<template>
  <SectionedPage @title="Controls" @description="Simple Inputs and Complex Composites">
    <:nav as |Item|>
      <Item @href="/controls">Inputs</Item>
      <Item @href="/controls/composites">Composites</Item>
    </:nav>
    <:content>
      {{outlet}}
    </:content>
  </SectionedPage>
</template>
