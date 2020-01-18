import hbs from "htmlbars-inline-precompile";

export default {
  title: "Components|Layouts/Cluster"
};

export const normal = () => {
  return {
    template: hbs`
      <Cluster>
        <Box>Tag 1</Box>
        <Box>Tag 2</Box>
        <Box>Tag 3</Box>
      </Cluster>`
  };
};

export const centered = () => {
  return {
    template: hbs`
      <Cluster @justify="center">
        <Box>Tag 1</Box>
        <Box>Tag 2</Box>
        <Box>Tag 3</Box>
      </Cluster>`
  };
};

export const navbar = () => {
  return {
    template: hbs`
      <Cluster @justify="space-between">
        <p>BRAND</p>
        <Cluster>
          <Box>Idea</Box>
          <Box>Pricing</Box>
          <Box>About</Box>
        </Cluster>
      </Cluster>`
  };
};
