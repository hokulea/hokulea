import { Avatar, Icon, Page } from '#src';
import Unicycle from '~icons/custom/unicycle';
import Acorn from '~icons/ph/acorn';
import Pulse from '~icons/ph/pulse';

<template>
  <Page @title="Graphics">
    <h1>Icons</h1>
    <p>
      <Icon @icon={{Pulse}} />
      with some text
      <Icon @icon={{Acorn}} />
      and the best icon in the world:
      <Icon @icon={{Unicycle}} />
      A Unicycle
    </p>

    <h1>Avatar</h1>

    <p>
      <Avatar @src="https://avatars.githubusercontent.com/u/283700?v=4" @name="Thomas Gossmann" />
      <Avatar @name="Thomas Gossmann" />
      <Avatar />
    </p>
  </Page>
</template>
