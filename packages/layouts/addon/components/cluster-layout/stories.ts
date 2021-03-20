import { hbs } from 'ember-cli-htmlbars';

// import ClusterLayoutComponent from './component';

export default {
  title: 'Components/Layouts/Cluster',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
  // component: ClusterLayoutComponent
};

export const Foo = () => ({
  template: hbs`
      <ClusterLayout>
        <BoxLayout>Tag 1</BoxLayout>
        <BoxLayout>Tag 2</BoxLayout>
        <BoxLayout>Tag 3</BoxLayout>
      </ClusterLayout>`
});

export const Centered = () => ({
  template: hbs`
      <ClusterLayout @justify="center">
        <BoxLayout>Tag 1</BoxLayout>
        <BoxLayout>Tag 2</BoxLayout>
        <BoxLayout>Tag 3</BoxLayout>
      </ClusterLayout>`
});

export const Navbar = () => ({
  template: hbs`
      <ClusterLayout @justify="space-between">
        <p>BRAND</p>
        <ClusterLayout>
          <BoxLayout>Idea</BoxLayout>
          <BoxLayout>Pricing</BoxLayout>
          <BoxLayout>About</BoxLayout>
        </ClusterLayout>
      </ClusterLayout>`
});

Navbar.story = {
  name: 'Example: Navbar'
};
