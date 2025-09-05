import { link } from 'ember-link';

import { AppHeader, Icon } from '#src';
import GearIcon from '~icons/ph/gear';
// import TIcon from '~icons/ph/text-t';

<template>
  <AppHeader @position="center" @home={{link "application"}}>
    <:brand>Hokulea</:brand>
    <:nav as |n|>
      <n.Item @href="/actions">Actions</n.Item>
      <n.Item @href="/content">Content</n.Item>
      <n.Item @href="/data">Data</n.Item>
      <n.Item @href="/navigation">Navigation</n.Item>
      <n.Item @href="/controls">Controls</n.Item>
      <n.Item @href="/forms">Forms</n.Item>
      <n.Item @href="/graphics">Graphics</n.Item>
      <n.Item @href="/windows">Windows</n.Item>
      <n.Item>
        <:label>Let's go down</:label>
        <:menu as |m|>
          <m.Item @href="/actions">Actions</m.Item>
          <m.Item @href="/content">Content</m.Item>
          <hr />
          <m.Item @href="/data">Data</m.Item>
          <m.Item @href="/navigation">Navigation</m.Item>
          <hr />
          <m.Item @href="/controls">Controls</m.Item>
          <m.Item @href="/forms">Forms</m.Item>
          <m.Item @href="/graphics">Graphics</m.Item>
          <m.Item @href="/windows">Windows</m.Item>
          <m.Item>
            <:label>Down down</:label>
            <:menu as |mm|>
              <mm.Item>2. One Larger text</mm.Item>
              <mm.Item>2. Two</mm.Item>
            </:menu>
          </m.Item>
        </:menu>
      </n.Item>
    </:nav>
    <:aux as |n|>
      <n.Item>
        <:label><Icon @icon={{GearIcon}} /></:label>
        <:menu>
          Theme Options will be here<br />needs ButtonGroup
        </:menu>
      </n.Item>
    </:aux>
  </AppHeader>

  {{outlet}}
</template>
