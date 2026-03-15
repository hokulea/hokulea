import { Page, TabNav } from '#src';

<template>
  <Page @title="Tab Nav">
    <TabNav as |n|>
      <n.Item @href="/actions">Actions</n.Item>
      <n.Item @href="/content">Content</n.Item>
      <n.Item>Nothing</n.Item>
      <n.Item @href="/data">Data</n.Item>
      <n.Item @href="/navigation">Navigation</n.Item>
      <n.Item @href="/navigation/tab-nav">Tab Nav</n.Item>
      <n.Item @href="/controls">Controls</n.Item>
      <n.Item @href="/forms">Forms</n.Item>
      <n.Item @href="/feedback">Feedback</n.Item>
      <n.Item @href="/graphics">Graphics</n.Item>
      <n.Item @href="/windows">Windows</n.Item>
    </TabNav>
  </Page>
</template>
