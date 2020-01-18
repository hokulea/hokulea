import hbs from "htmlbars-inline-precompile";

export default { title: "Demo" };

export const heading = () => hbs`<h1>Hello World</h1>`;

export const button = () => {
  return {
    template: hbs`<button {{action onClick}}>
      Hello Button
    </button>`,
    context: {
      onClick: e => console.log(e)
    }
  };
};

export const component = () => {
  return {
    template: hbs`<BaseButton>Hello</BaseButton>`,
    context: {}
  };
};
