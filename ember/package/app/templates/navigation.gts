import { NavigationList, Page } from '#src';
import PhAcorn from '~icons/ph/acorn';
import PhAppWindow from '~icons/ph/app-window';
import PhArrowFatLinesRight from '~icons/ph/arrow-fat-lines-right';
import PhBrowser from '~icons/ph/browser';
import PhClipboardText from '~icons/ph/clipboard-text';
import PhListBullets from '~icons/ph/list-bullets';
import PhRows from '~icons/ph/rows';
import PhStack from '~icons/ph/stack';
import PhTextAlignCenter from '~icons/ph/text-align-center';

<template>
  <style scoped>
    .navigation {
      display: grid;
      grid-template-columns: 30% auto;
      gap: var(--spacing-container0);
    }
  </style>
  <Page @title="Navigation">
    <div class="navigation">
      <NavigationList as |n|>
        <n.Item @href="/navigation" @icon={{PhListBullets}}>Nav List</n.Item>
        <n.Item @href="/navigation/app-header" @icon={{PhBrowser}}>App Header</n.Item>
        <n.Item @href="/navigation/pagination" @icon={{PhStack}}>Pagination</n.Item>
        <hr />
        <n.Title>Others</n.Title>
        <n.Item @href="/actions" @icon={{PhArrowFatLinesRight}}>Actions</n.Item>
        <n.Item @href="/content" @icon={{PhTextAlignCenter}}>Content</n.Item>
        <n.Item @href="/Controls" @icon={{PhRows}}>Controls</n.Item>
        <n.Item @href="/forms" @icon={{PhClipboardText}}>Form</n.Item>
        <n.Item @href="/icons" @icon={{PhAcorn}}>Icons</n.Item>
        <n.Item @href="/windows" @icon={{PhAppWindow}}>Windows</n.Item>
      </NavigationList>
      {{outlet}}
    </div>
  </Page>
</template>
