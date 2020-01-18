import hbs from "htmlbars-inline-precompile";
import { boolean, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components|Layouts/Center"
};

export const component = () => {
  return {
    template: hbs`
      <Center @intrinsic={{this.intrinsic}} @text={{this.text}}>
        <p>Hello text</p>
      </Center>`,
    context: {
      get intrinsic() {
        return boolean("intrinsic", false);
      },

      get text() {
        return boolean("text", false);
      }
    }
  };
};

component.story = {
  decorators: [withKnobs]
};

export const css = () => {
  return {
    template: hbs`
      <div class="center {{if this.intrinsic 'center-intrinsic'}} {{if this.text 'center-text'}}">
        <p>Hello text</p>
      </div>`,
    context: {
      get intrinsic() {
        return boolean("intrinsic", false);
      },

      get text() {
        return boolean("text", false);
      }
    }
  };
};

css.story = {
  name: "CSS",
  decorators: [withKnobs]
};
