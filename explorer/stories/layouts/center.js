import hbs from "htmlbars-inline-precompile";
import { boolean, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components|Layouts/Center"
};

export const basic = () => {
  return {
    template: hbs`
      <CenterLayout @intrinsic={{this.intrinsic}} @text={{this.text}}>
        <p>Hello text</p>
      </CenterLayout>`,
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

basic.story = {
  decorators: [withKnobs]
};
