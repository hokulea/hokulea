import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Documentation|Getting Started TS',
  parameters: {
    options: {
      showPanel: false,
      isToolshown: false
    },
    docs: {
      page: () => {
        return {
          template: hbs`
            <Page @title="Introduction">
              <p>
                Welcome to hokulea the design system for ember focussing on an interdisciplinary
                productive workflow and an enjoyable API. If you need to think, hokulea is
                wrong!
              </p>

              <p>Highlights</p>

              <ul>
                <li>HTML first, octane on top</li>
                <li>Accessibility built-in</li>
                <li>Themes - First class support for themes</li>
                <li>Responsive to the fullest - no breakpoints were harmed</li>
              </ul>
            </Page>
          `
        };
      }
    }
  },
  includeStories: ['__page']
};

export const __page = () => {
  throw new Error('Docs-only story');
  // return {
  //   template: hbs`
  //     <Page @title="Introduction">
  //       <p>
  //         Welcome to hokulea the design system for ember focussing on an interdisciplinary
  //         productive workflow and an enjoyable API. If you need to think, hokulea is
  //         wrong!
  //       </p>

  //       <p>Highlights</p>

  //       <ul>
  //         <li>HTML first, octane on top</li>
  //         <li>Accessibility built-in</li>
  //         <li>Themes - First class support for themes</li>
  //         <li>Responsive to the fullest - no breakpoints were harmed</li>
  //       </ul>
  //     </Page>
  //   `
  // };
};

__page.story = { parameters: { docsOnly: true } };

// export const intro = () => {
//   return {
//     template: hbs`
//       <Page @title="Introduction">
//         <p>
//           Welcome to hokulea the design system for ember focussing on an interdisciplinary
//           productive workflow and an enjoyable API. If you need to think, hokulea is
//           wrong!
//         </p>

//         <p>Highlights</p>

//         <ul>
//           <li>HTML first, octane on top</li>
//           <li>Accessibility built-in</li>
//           <li>Themes - First class support for themes</li>
//           <li>Responsive to the fullest - no breakpoints were harmed</li>
//         </ul>
//       </Page>
//     `
//   };
// };
