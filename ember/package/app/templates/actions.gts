import { SectionedPage } from '#src';

<template>
  <SectionedPage @title="Actions">
    <:nav as |Item|>
      <Item @href="/actions">Buttons</Item>
      <Item @href="/actions/groups">Button Groups</Item>
    </:nav>
    <:content>
      {{outlet}}
    </:content>
  </SectionedPage>
</template>
