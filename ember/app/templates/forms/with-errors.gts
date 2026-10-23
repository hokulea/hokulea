import { Form, Page, type SubmitHandler } from '#src';

const submit: SubmitHandler = (value) => {
  return {
    success: false,
    value,
    issues: [
      {
        message: 'Login Credentials are wrong'
      }
    ]
  };
};

<template>
  <Page @title="Form with Errors">
    <Form @submit={{submit}} as |f|>
      <f.Errors />

      <f.Text @name="email" @label="Email" autocomplete="email" required data-bwignore />

      <f.Password @name="password" @label="Password" required data-bwignore />

      <f.Submit>Login</f.Submit>
    </Form>
  </Page>
</template>
