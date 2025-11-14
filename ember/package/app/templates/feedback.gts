import { Alert, Button, Page } from '#src';

<template>
  <Page @title="Feedback">
    <h1>Alerts</h1>
    <Alert>
      Some Information
    </Alert>

    <Alert>
      <:content>Some Information</:content>
      <:actions>
        <Button @spacing="-1">Hullo?</Button>
      </:actions>
    </Alert>

    <h2>Combinations</h2>

    {{! -- }}

    <Alert @title="Title" @importance="supreme">
      Some Information
    </Alert>

    <Alert @title="Title" @importance="subtle">
      Some Information
    </Alert>

    <Alert @title="Title" @importance="plain">
      Some Information
    </Alert>

    {{! -- }}

    <Alert @title="Title" @indicator="info" @importance="supreme">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="info" @importance="subtle">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="info" @importance="plain">
      Some Information
    </Alert>

    {{! -- }}

    <Alert @title="Title" @indicator="success" @importance="supreme">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="success" @importance="subtle">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="success" @importance="plain">
      Some Information
    </Alert>

    {{! -- }}

    <Alert @title="Title" @indicator="warning" @importance="supreme">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="warning" @importance="subtle">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="warning" @importance="plain">
      Some Information
    </Alert>

    {{! -- }}

    <Alert @title="Title" @indicator="error" @importance="supreme">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="error" @importance="subtle">
      Some Information
    </Alert>

    <Alert @title="Title" @indicator="error" @importance="plain">
      Some Information
    </Alert>
  </Page>
</template>
