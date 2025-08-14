import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import { pick } from '#app/-utils.ts';
import { createForm } from '#src';

const handleSubmit = (data: unknown) => {
  console.log('submit', data);
};

<template>
  <h1>Form</h1>

  {{#let (createForm data=(hash givenName="") submit=handleSubmit) as |frm|}}
    <form {{frm.registerForm}} novalidate>

      {{#let (frm.createField name="givenName") as |f|}}
        <p>
          <label>
            Given Name
            <input {{f.registerField}} name={{f.name}} value={{f.value}} />
          </label>
        </p>
      {{/let}}

      {{#let (frm.createField name="familyName") as |f|}}
        <p>
          <label>
            Family Name
            <input
              {{f.registerField}}
              name={{f.name}}
              value={{f.value}}
              {{on "change" (pick "target.value" f.setValue)}}
              required
            />
            {{f.value}}
          </label>
          {{#if f.issues}}
            <ul>
              {{#each f.issues as |issue|}}
                <li>{{issue.message}}</li>
              {{/each}}
            </ul>
          {{/if}}
        </p>
      {{/let}}

      <p>
        <button type="submit">Let's go</button>
      </p>

    </form>
  {{/let}}
</template>
