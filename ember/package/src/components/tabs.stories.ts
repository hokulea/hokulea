import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Controls/Tabs',
  component: 'tabs',
  parameters: {
    options: {
      showPanel: false,
      showToolbar: true
    }
  }
};

function parseOptionalBooleanArg(arg) {
  return typeof arg === 'boolean' ? arg : typeof arg === 'string' ? JSON.parse(arg) : undefined;
}

function parseArgs(args) {
  return {
    ...args,
    behavior: {
      singleSelection: args.selection
    },
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

export const Showcase = {
  render: (args) => ({
    template: hbs`
      <h1>Unicycling Disciplines</h1>
      from: <a href="https://stichtingeenwieleren.nl/unicyclingdisciplines/" target="_blank" rel="noopener noreferrer">https://stichtingeenwieleren.nl/unicyclingdisciplines/</a>

      <Tabs @disabled={{this.disabled}} @orientation={{this.orientation}} @behavior={{this.behavior}} @update={{this.update}} as |t|>
        <t.Tab @label="Freestyle">
          Freestyle is one of the oldest disciplines within unicycling, competitions were organised from the 1960’s, although the competition form and rules have changed a lot since then. The name Freestyle refers to the fact that one is free in choosing the elements and tricks to present.
        </t.Tab>
        <t.Tab @label="Urban">
          Urban can literally be translated as "in the city", but you shouldn’t confuse it with just unicycling in the city.<br>
          Urban is a collective name for a number of outdoor-based unicycling disciplines. More so than in the other disciplines, the Urban riders form a kind of subculture, which does not mix so much with the rest of unicycling. Urban has a cool image, similar to skateboarding.<br>
          Trials and Jumps are the oldest branches of Urban. Flatland and especially Street did not develop until about 2000. In the beginning only boys (and men) participated, but in recent years girls/women are on the rise.
        </t.Tab>
        <t.Tab @label="Muni">
          The word Muni is an abbreviation of Mountain Unicycling. It is a collective name for all unicycle styles that are done off-road, such as on unpaved paths or across the terrain. You can compare it to mountain biking. Muni was ‘invented’ in the 1980’s, at that time it was called Rough Terrain Unicycling. The word Muni has been used from about 1995.
        </t.Tab>
        <t.Tab @label="Road">
          Road unicycling is riding on usually sealed roads and (bicycle) paths, where the main goal is covering a (short or long) distance. Road and Muni cannot be strictly separated: there is a gray area associated with riding on semi-paved or very easily rideable roads and paths.
        </t.Tab>

        <t.Tab @label="Track">
          Track is an extensive category of competitive disciplines traditionally performed on or around an athletics track. You can of course also do Track outside of competition, but then you are probably training with the ultimate goal of competing.<br>
          Track, or Track Racing in full, is one of the oldest discipline in unicycling. Competitions were already held in the 1970s. In most Track Racing disciplines, the wheel size must not exceed 618 mm (approximately 24 inches); often this is referred to as ‘standard class’.
        </t.Tab>

        <t.Tab @label="Team Sports">
          Team Sports are sports on the unicycle that you do as a team. All team sports on the unicycle, and the rules associated with it, are derived from regular team sports (on foot).
        </t.Tab>
      </Tabs>
    `,
    context: {
      ...parseArgs(args),
      update: action('update')
    }
  }),
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    },
    orientation: {
      name: 'Orientation',
      options: ['horizontal', 'vertical'],
      control: 'radio'
    },
    selection: {
      table: {
        category: 'Behavior'
      },
      name: 'Selection',
      options: ['automatic', 'manual'],
      control: 'radio'
    }
  }
};