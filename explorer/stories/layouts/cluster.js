import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components|Layouts/Cluster'
};

export const normal = () => {
  return {
    template: hbs`
      <ClusterLayout>
        <BoxLayout>Tag 1</BoxLayout>
        <BoxLayout>Tag 2</BoxLayout>
        <BoxLayout>Tag 3</BoxLayout>
      </ClusterLayout>`
  };
};

export const centered = () => {
  return {
    template: hbs`
      <ClusterLayout @justify="center">
        <BoxLayout>Tag 1</BoxLayout>
        <BoxLayout>Tag 2</BoxLayout>
        <BoxLayout>Tag 3</BoxLayout>
      </ClusterLayout>`
  };
};

export const navbar = () => {
  return {
    template: hbs`
      <ClusterLayout @justify="space-between">
        <p>BRAND</p>
        <ClusterLayout>
          <BoxLayout>Idea</BoxLayout>
          <BoxLayout>Pricing</BoxLayout>
          <BoxLayout>About</BoxLayout>
        </ClusterLayout>
      </ClusterLayout>`
  };
};
