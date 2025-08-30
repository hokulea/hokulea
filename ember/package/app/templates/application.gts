import { link } from 'ember-link';

import { AppHeader, Icon } from '#src';
import GearIcon from '~icons/ph/gear';
// import TIcon from '~icons/ph/text-t';

<template>
  <AppHeader @position="center" @home={{link "application"}}>
    <:brand>Hokulea</:brand>
    <:nav as |n|>
      <n.Item @push={{link "actions"}}>Actions</n.Item>
      <n.Item @push={{link "content"}}>Content</n.Item>
      <n.Item @push={{link "navigation"}}>Navigation</n.Item>
      <n.Item @push={{link "controls"}}>Controls</n.Item>
      <n.Item @push={{link "forms"}}>Forms</n.Item>
      <n.Item @push={{link "icons"}}>Icons</n.Item>
      <n.Item @push={{link "windows"}}>Windows</n.Item>
      <n.Item>
        <:label>Let's go down</:label>
        <:menu as |m|>
          <m.Item @push={{link "actions"}}>Actions</m.Item>
          <m.Item @push={{link "content"}}>Content</m.Item>
          <hr />
          <n.Item @push={{link "content"}}>Navigation</n.Item>
          <hr />
          <m.Item @push={{link "controls"}}>Controls</m.Item>
          <m.Item @push={{link "forms"}}>Forms</m.Item>
          <m.Item @push={{link "icons"}}>Icons</m.Item>
          <m.Item @push={{link "windows"}}>Windows</m.Item>
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
