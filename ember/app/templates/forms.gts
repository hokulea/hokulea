import { SectionedPage } from '#src';

<template>
  <SectionedPage @title="Forms">
    <:nav as |Item|>
      <Item @href="/forms">Profile Form</Item>
      <Item @href="/forms/with-errors">Form with Errors</Item>
    </:nav>
    <:content>
      {{outlet}}
    </:content>
  </SectionedPage>
</template>
