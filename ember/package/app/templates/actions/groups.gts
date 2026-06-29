import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { link } from 'ember-link';

import { Button, ButtonGroup, FocusPage, IconButton, RadioButtonGroup, Section } from '#src';
import TextAlignCenterIcon from '~icons/ph/text-align-center';
import TextAlignJustifyIcon from '~icons/ph/text-align-justify';
import TextAlignLeftIcon from '~icons/ph/text-align-left';
import TextAlignRightIcon from '~icons/ph/text-align-right';
import TextBBoldIcon from '~icons/ph/text-b-bold';
import TextItalicIcon from '~icons/ph/text-italic';
import TextStrikethroughIcon from '~icons/ph/text-strikethrough';
import TextUnderlineIcon from '~icons/ph/text-underline';

export default class ButtonGroupRoute extends Component {
  @tracked bold = false;
  @tracked italic = false;
  @tracked underline = false;
  @tracked strikethrough = false;

  toggleBold = () => (this.bold = !this.bold);
  toggleItalic = () => (this.italic = !this.italic);
  toggleUnderline = () => (this.underline = !this.underline);
  toggleStrikethrough = () => (this.strikethrough = !this.strikethrough);

  @tracked alignment = 'left';
  updateAlignment = (alignment: string) => (this.alignment = alignment);

  <template>
    <FocusPage @title="Actions">
      <Section @title="Button Group">
        <ButtonGroup>
          <Button @importance="subtle" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="highlight" @importance="subtle" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="danger" @importance="subtle" @push={{link "actions"}}>Supreme</Button>
          <Button
            @intent="alternative"
            @importance="subtle"
            @push={{link "actions"}}
          >Supreme</Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button @push={{link "actions"}}>Supreme</Button>
          <Button @intent="highlight" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="danger" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="alternative" @push={{link "actions"}}>Supreme</Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button @push={{this.toggleBold}} @pressed={{this.bold}}>Bold</Button>
          <Button @push={{this.toggleItalic}} @pressed={{this.italic}}>Italic</Button>
          <Button @push={{this.toggleUnderline}} @pressed={{this.underline}}>Underline</Button>
          <Button
            @push={{this.toggleStrikethrough}}
            @pressed={{this.strikethrough}}
          >Strikethrough</Button>
        </ButtonGroup>

        <ButtonGroup>
          <IconButton
            @push={{this.toggleBold}}
            @pressed={{this.bold}}
            @icon={{TextBBoldIcon}}
            @label="Bold"
          />
          <IconButton
            @push={{this.toggleItalic}}
            @pressed={{this.italic}}
            @icon={{TextItalicIcon}}
            @label="Italic"
          />
          <IconButton
            @push={{this.toggleUnderline}}
            @pressed={{this.underline}}
            @icon={{TextUnderlineIcon}}
            @label="Underline"
          />
          <IconButton
            @push={{this.toggleStrikethrough}}
            @pressed={{this.strikethrough}}
            @icon={{TextStrikethroughIcon}}
            @label="Strikethrough"
          />
        </ButtonGroup>
      </Section>

      <Section @title="Radio Button Group">
        <RadioButtonGroup @value={{this.alignment}} @update={{this.updateAlignment}} as |g|>
          <g.Button @value="left">Left</g.Button>
          <g.Button @value="center">Center</g.Button>
          <g.Button @value="right">Right</g.Button>
          <g.Button @value="justified">Justified</g.Button>
        </RadioButtonGroup>

        <RadioButtonGroup @value={{this.alignment}} @update={{this.updateAlignment}} as |g|>
          <g.IconButton @value="left" @icon={{TextAlignLeftIcon}} @label="Left" />
          <g.IconButton @value="center" @icon={{TextAlignCenterIcon}} @label="Center" />
          <g.IconButton @value="right" @icon={{TextAlignRightIcon}} @label="Right" />
          <g.IconButton @value="justified" @icon={{TextAlignJustifyIcon}} @label="Justified" />
        </RadioButtonGroup>
      </Section>

    </FocusPage>
  </template>
}
