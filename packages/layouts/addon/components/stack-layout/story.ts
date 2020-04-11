import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components|Layouts/Stack'
};

export const basic = () => {
  return {
    template: hbs`
      <StackLayout>
        <BoxLayout>Hello text</BoxLayout>
        <BoxLayout>Hello another</BoxLayout>
        <BoxLayout>Looks like a box?</BoxLayout>
        <BoxLayout>Yes indeed!</BoxLayout>
      </StackLayout>`
  };
};

export const recursive = () => {
  return {
    template: hbs`
      <StackLayout @recursive={{true}}>
        <BoxLayout>Hello text</BoxLayout>
        <BoxLayout>Hello another</BoxLayout>
        <BoxLayout {{style --stackSpace="0.5rem"}}>
          <BoxLayout>Guess what?</BoxLayout>
          <BoxLayout>This is nested in here</BoxLayout>
          <BoxLayout>Which is a recursive stack layout</BoxLayout>
        </BoxLayout>
        <BoxLayout>Yes indeed!</BoxLayout>
      </StackLayout>`
  };
};
