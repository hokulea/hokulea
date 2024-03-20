import { getRootElement, triggerKeyEvent } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { testListboxForKeyboardSingleSelection, testListboxForKeyboardMultiSelection, testListboxKeyboardNavigation, testListboxMouseNavigation, testListboxForMouseSingleSelection, testListboxForMouseMultiSelection } from '@hokulea/ember-controls/test-support/a11y/-private/listbox';
const DEFAULT_SELECTORS = {
    trigger: 'button',
    list: '[role="listbox"]',
    option: '[role="option"]'
};
function setupSelectTest(assert, selectors) {
    const fullSelectors = { ...DEFAULT_SELECTORS, ...selectors };
    const list = getRootElement().querySelector(selectors.list);
    const trigger = getRootElement().querySelector(selectors.trigger);
    assert.dom(list).exists('list exists');
    assert.dom(trigger).exists('trigger exists');
    return {
        elements: {
            trigger: trigger,
            list: list
        },
        selectors: fullSelectors
    };
}
export async function testSelectKeyboardNavigation(assert, selectors = DEFAULT_SELECTORS) {
    const { elements, selectors: allSelectors } = setupSelectTest(assert, selectors);
    const { trigger, list } = elements;
    await triggerKeyEvent(trigger, 'keydown', 'Escape');
    await triggerKeyEvent(trigger, 'keydown', ' ');
    await testListboxKeyboardNavigation(assert, {
        target: trigger,
        list
    }, {
        option: allSelectors.option
    });
}
async function testSelectForKeyboardSingleSelection(assert, elements, selectors) {
    const { trigger, list } = elements;
    await triggerKeyEvent(trigger, 'keydown', 'Escape');
    await triggerKeyEvent(trigger, 'keydown', ' ');
    await testListboxForKeyboardSingleSelection(assert, {
        target: trigger,
        list
    }, {
        option: selectors.option
    });
}
async function testSelectForKeyboardMultiSelection(assert, elements, selectors) {
    const { trigger, list } = elements;
    await triggerKeyEvent(trigger, 'keydown', 'Escape');
    await triggerKeyEvent(trigger, 'keydown', ' ');
    await testListboxForKeyboardMultiSelection(assert, {
        target: trigger,
        list
    }, {
        option: selectors.option
    });
}
export async function testSelectKeyboardSelection(assert, selectors = DEFAULT_SELECTORS) {
    const { elements, selectors: allSelectors } = setupSelectTest(assert, selectors);
    const multi = elements.list.getAttribute('aria-multiselectable');
    await (multi
        ? testSelectForKeyboardMultiSelection(assert, elements, allSelectors)
        : testSelectForKeyboardSingleSelection(assert, elements, allSelectors));
}
export async function testSelectKeyboardOpenAndClose(assert, selectors = DEFAULT_SELECTORS) {
    const { elements } = setupSelectTest(assert, selectors);
    const { trigger } = elements;
    // open with enter
    await triggerKeyEvent(trigger, 'keydown', 'Enter');
    assert.dom(trigger).hasAria('expanded', 'true');
    // close with escape
    await triggerKeyEvent(trigger, 'keydown', 'Escape');
    assert.dom(trigger).hasAria('expanded', 'false');
    // open with space
    await triggerKeyEvent(trigger, 'keydown', ' ');
    assert.dom(trigger).hasAria('expanded', 'true');
    await triggerKeyEvent(trigger, 'keydown', 'Escape');
}
//
// MOUSE
//
export async function testSelectMouseNavigation(assert, selectors = DEFAULT_SELECTORS) {
    const { elements, selectors: allSelectors } = setupSelectTest(assert, selectors);
    const { trigger, list } = elements;
    await click(trigger);
    await testListboxMouseNavigation(assert, {
        list
    }, {
        option: allSelectors.option
    });
}
async function testSelectForMouseSingleSelection(assert, elements, selectors) {
    const { trigger, list } = elements;
    await click(trigger);
    await testListboxForMouseSingleSelection(assert, {
        target: trigger,
        list
    }, {
        option: selectors.option
    });
}
async function testSelectForMouseMultiSelection(assert, elements, selectors) {
    const { trigger, list } = elements;
    await click(trigger);
    await testListboxForMouseMultiSelection(assert, {
        target: trigger,
        list
    }, {
        option: selectors.option
    });
}
export async function testSelectMouseSelection(assert, selectors = DEFAULT_SELECTORS) {
    const { elements, selectors: allSelectors } = setupSelectTest(assert, selectors);
    const multi = elements.list.getAttribute('aria-multiselectable');
    await (multi
        ? testSelectForMouseMultiSelection(assert, elements, allSelectors)
        : testSelectForMouseSingleSelection(assert, elements, allSelectors));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxLQUFLLE1BQU0sK0JBQStCLENBQUM7QUFFbEQsT0FBTyxFQUNMLHFDQUFxQyxFQUNyQyxvQ0FBb0MsRUFDcEMsNkJBQTZCLEVBQzdCLDBCQUEwQixFQUMxQixrQ0FBa0MsRUFDbEMsaUNBQWlDLEVBQ2xDLE1BQU0sNERBQTRELENBQUM7QUFhcEUsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixPQUFPLEVBQUUsUUFBUTtJQUNqQixJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLE1BQU0sRUFBRSxpQkFBaUI7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsZUFBZSxDQUN0QixNQUFjLEVBQ2QsU0FBNkI7SUFFN0IsTUFBTSxhQUFhLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixFQUFFLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFDN0QsTUFBTSxJQUFJLEdBQUcsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFjLENBQUMsQ0FBQztJQUN0RSxNQUFNLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQWlCLENBQUMsQ0FBQztJQUU1RSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTdDLE9BQU87UUFDTCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsT0FBc0I7WUFDL0IsSUFBSSxFQUFFLElBQW1CO1NBQzFCO1FBQ0QsU0FBUyxFQUFFLGFBQWE7S0FDekIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMs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Q0FDdEMsTUFBTSxFQUNOO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixJQUFJO0tBQ0wsRUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtLQUN6QixDQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsS0FBSyxVQUFVLGdDQUFnQyxDQUM3QyxNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsU0FBb0I7SUFFcEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDbkMsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsTUFBTSxpQ0FBaUMsQ0FDckMsTUFBTSxFQUNOO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixJQUFJO0tBQ0wsRUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtLQUN6QixDQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSx3QkFBd0IsQ0FDNUMsTUFBYyxFQUNkLFlBQWdDLGlCQUFpQjtJQUVqRCxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsR0FBRyxlQUFlLENBQzNELE1BQU0sRUFDTixTQUFTLENBQ1YsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFakUsTUFBTSxDQUFDLEtBQUs7UUFDVixDQUFDLENBQUMsZ0NBQWdDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7UUFDbEUsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Um9vdEVsZW1lbnQsIHRyaWdnZXJLZXlFdmVudCB9IGZyb20gJ0BlbWJlci90ZXN0LWhlbHBlcnMnO1xuaW1wb3J0IGNsaWNrIGZyb20gJ0BlbWJlci90ZXN0LWhlbHBlcnMvZG9tL2NsaWNrJztcblxuaW1wb3J0IHtcbiAgdGVzdExpc3Rib3hGb3JLZXlib2FyZFNpbmdsZVNlbGVjdGlvbixcbiAgdGVzdExpc3Rib3hGb3JLZXlib2FyZE11bHRpU2VsZWN0aW9uLFxuICB0ZXN0TGlzdGJveEtleWJvYXJkTmF2aWdhdGlvbixcbiAgdGVzdExpc3Rib3hNb3VzZU5hdmlnYXRpb24sXG4gIHRlc3RMaXN0Ym94Rm9yTW91c2VTaW5nbGVTZWxlY3Rpb24sXG4gIHRlc3RMaXN0Ym94Rm9yTW91c2VNdWx0aVNlbGVjdGlvblxufSBmcm9tICdAaG9rdWxlYS9lbWJlci1jb250cm9scy90ZXN0LXN1cHBvcnQvYTExeS8tcHJpdmF0ZS9saXN0Ym94JztcblxudHlwZSBTZWxlY3RvcnMgPSB7XG4gIHRyaWdnZXI6IHN0cmluZztcbiAgbGlzdDogc3RyaW5nO1xuICBvcHRpb246IHN0cmluZztcbn07XG5cbnR5cGUgRWxlbWVudHMgPSB7XG4gIHRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICBsaXN0OiBIVE1MRWxlbWVudDtcbn07XG5cbmNvbnN0IERFRkFVTFRfU0VMRUNUT1JTID0ge1xuICB0cmlnZ2VyOiAnYnV0dG9uJyxcbiAgbGlzdDogJ1tyb2xlPVwibGlzdGJveFwiXScsXG4gIG9wdGlvbjogJ1tyb2xlPVwib3B0aW9uXCJdJ1xufTtcblxuZnVuY3Rpb24gc2V0dXBTZWxlY3RUZXN0KFxuICBhc3NlcnQ6IEFzc2VydCxcbiAgc2VsZWN0b3JzOiBQYXJ0aWFsPFNlbGVjdG9ycz5cbik6IHsgZWxlbWVudHM6IEVsZW1lbnRzOyBzZWxlY3RvcnM6IFNlbGVjdG9ycyB9IHtcbiAgY29uc3QgZnVsbFNlbGVjdG9ycyA9IHsgLi4uREVGQVVMVF9TRUxFQ1RPUlMsIC4uLnNlbGVjdG9ycyB9O1xuICBjb25zdCBsaXN0ID0gZ2V0Um9vdEVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5saXN0IGFzIHN0cmluZyk7XG4gIGNvbnN0IHRyaWdnZXIgPSBnZXRSb290RWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnRyaWdnZXIgYXMgc3RyaW5nKTtcblxuICBhc3NlcnQuZG9tKGxpc3QpLmV4aXN0cygnbGlzdCBleGlzdHMnKTtcbiAgYXNzZXJ0LmRvbSh0cmlnZ2VyKS5leGlzdHMoJ3RyaWdnZXIgZXhpc3RzJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbGVtZW50czoge1xuICAgICAgdHJpZ2dlcjogdHJpZ2dlciBhcyBIVE1MRWxlbWVudCxcbiAgICAgIGxpc3Q6IGxpc3QgYXMgSFRNTEVsZW1lbnRcbiAgICB9LFxuICAgIHNlbGVjdG9yczogZnVsbFNlbGVjdG9yc1xuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGVzdFNlbGVjdEtleWJvYXJkTmF2aWdhdGlvbihcbiAgYXNzZXJ0OiBBc3NlcnQsXG4gIHNlbGVjdG9yczogUGFydGlhbDxTZWxlY3RvcnM+ID0gREVGQVVMVF9TRUxFQ1RPUlNcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IGVsZW1lbnRzLCBzZWxlY3RvcnM6IGFsbFNlbGVjdG9ycyB9ID0gc2V0dXBTZWxlY3RUZXN0KFxuICAgIGFzc2VydCxcbiAgICBzZWxlY3RvcnNcbiAgKTtcblxuICBjb25zdCB7IHRyaWdnZXIsIGxpc3QgfSA9IGVsZW1lbnRzO1xuICBhd2FpdCB0cmlnZ2VyS2V5RXZlbnQodHJpZ2dlciwgJ2tleWRvd24nLCAnRXNjYXBlJyk7XG4gIGF3YWl0IHRyaWdnZXJLZXlFdmVudCh0cmlnZ2VyLCAna2V5ZG93bicsICcgJyk7XG4gIGF3YWl0IHRlc3RMaXN0Ym94S2V5Ym9hcmROYXZpZ2F0aW9uKFxuICAgIGFzc2VydCxcbiAgICB7XG4gICAgICB0YXJnZXQ6IHRyaWdnZXIsXG4gICAgICBsaXN0XG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IGFsbFNlbGVjdG9ycy5vcHRpb25cbiAgICB9XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RTZWxlY3RGb3JLZXlib2FyZFNpbmdsZVNlbGVjdGlvbihcbiAgYXNzZXJ0OiBBc3NlcnQsXG4gIGVsZW1lbnRzOiBFbGVtZW50cyxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcnNcbikge1xuICBjb25zdCB7IHRyaWdnZXIsIGxpc3QgfSA9IGVsZW1lbnRzO1xuICBhd2FpdCB0cmlnZ2VyS2V5RXZlbnQodHJpZ2dlciwgJ2tleWRvd24nLCAnRXNjYXBlJyk7XG4gIGF3YWl0IHRyaWdnZXJLZXlFdmVudCh0cmlnZ2VyLCAna2V5ZG93bicsICcgJyk7XG4gIGF3YWl0IHRlc3RMaXN0Ym94Rm9yS2V5Ym9hcmRTaW5nbGVTZWxlY3Rpb24oXG4gICAgYXNzZXJ0LFxuICAgIHtcbiAgICAgIHRhcmdldDogdHJpZ2dlcixcbiAgICAgIGxpc3RcbiAgICB9LFxuICAgIHtcbiAgICAgIG9wdGlvbjogc2VsZWN0b3JzLm9wdGlvblxuICAgIH1cbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdGVzdFNlbGVjdEZvcktleWJvYXJkTXVsdGlTZWxlY3Rpb24oXG4gIGFzc2VydDogQXNzZXJ0LFxuICBlbGVtZW50czogRWxlbWVudHMsXG4gIHNlbGVjdG9yczogU2VsZWN0b3JzXG4pIHtcbiAgY29uc3QgeyB0cmlnZ2VyLCBsaXN0IH0gPSBlbGVtZW50cztcblxuICBhd2FpdCB0cmlnZ2VyS2V5RXZlbnQodHJpZ2dlciwgJ2tleWRvd24nLCAnRXNjYXBlJyk7XG4gIGF3YWl0IHRyaWdnZXJLZXlFdmVudCh0cmlnZ2VyLCAna2V5ZG93bicsICcgJyk7XG5cbiAgYXdhaXQgdGVzdExpc3Rib3hGb3JLZXlib2FyZE11bHRpU2VsZWN0aW9uKFxuICAgIGFzc2VydCxcbiAgICB7XG4gICAgICB0YXJnZXQ6IHRyaWdnZXIsXG4gICAgICBsaXN0XG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHNlbGVjdG9ycy5vcHRpb25cbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0U2VsZWN0S2V5Ym9hcmRTZWxlY3Rpb24oXG4gIGFzc2VydDogQXNzZXJ0LFxuICBzZWxlY3RvcnM6IFBhcnRpYWw8U2VsZWN0b3JzPiA9IERFRkFVTFRfU0VMRUNUT1JTXG4pIHtcbiAgY29uc3QgeyBlbGVtZW50cywgc2VsZWN0b3JzOiBhbGxTZWxlY3RvcnMgfSA9IHNldHVwU2VsZWN0VGVzdChcbiAgICBhc3NlcnQsXG4gICAgc2VsZWN0b3JzXG4gICk7XG4gIGNvbnN0IG11bHRpID0gZWxlbWVudHMubGlzdC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJyk7XG5cbiAgYXdhaXQgKG11bHRpXG4gICAgPyB0ZXN0U2VsZWN0Rm9yS2V5Ym9hcmRNdWx0aVNlbGVjdGlvbihhc3NlcnQsIGVsZW1lbnRzLCBhbGxTZWxlY3RvcnMpXG4gICAgOiB0ZXN0U2VsZWN0Rm9yS2V5Ym9hcmRTaW5nbGVTZWxlY3Rpb24oYXNzZXJ0LCBlbGVtZW50cywgYWxsU2VsZWN0b3JzKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0U2VsZWN0S2V5Ym9hcmRPcGVuQW5kQ2xvc2UoXG4gIGFzc2VydDogQXNzZXJ0LFxuICBzZWxlY3RvcnM6IFBhcnRpYWw8U2VsZWN0b3JzPiA9IERFRkFVTFRfU0VMRUNUT1JTXG4pIHtcbiAgY29uc3QgeyBlbGVtZW50cyB9ID0gc2V0dXBTZWxlY3RUZXN0KGFzc2VydCwgc2VsZWN0b3JzKTtcbiAgY29uc3QgeyB0cmlnZ2VyIH0gPSBlbGVtZW50cztcblxuICAvLyBvcGVuIHdpdGggZW50ZXJcbiAgYXdhaXQgdHJpZ2dlcktleUV2ZW50KHRyaWdnZXIsICdrZXlkb3duJywgJ0VudGVyJyk7XG4gIGFzc2VydC5kb20odHJpZ2dlcikuaGFzQXJpYSgnZXhwYW5kZWQnLCAndHJ1ZScpO1xuXG4gIC8vIGNsb3NlIHdpdGggZXNjYXBlXG4gIGF3YWl0IHRyaWdnZXJLZXlFdmVudCh0cmlnZ2VyLCAna2V5ZG93bicsICdFc2NhcGUnKTtcbiAgYXNzZXJ0LmRvbSh0cmlnZ2VyKS5oYXNBcmlhKCdleHBhbmRlZCcsICdmYWxzZScpO1xuXG4gIC8vIG9wZW4gd2l0aCBzcGFjZVxuICBhd2FpdCB0cmlnZ2VyS2V5RXZlbnQodHJpZ2dlciwgJ2tleWRvd24nLCAnICcpO1xuICBhc3NlcnQuZG9tKHRyaWdnZXIpLmhhc0FyaWEoJ2V4cGFuZGVkJywgJ3RydWUnKTtcblxuICBhd2FpdCB0cmlnZ2VyS2V5RXZlbnQodHJpZ2dlciwgJ2tleWRvd24nLCAnRXNjYXBlJyk7XG59XG5cbi8vXG4vLyBNT1VTRVxuLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRlc3RTZWxlY3RNb3VzZU5hdmlnYXRpb24oXG4gIGFzc2VydDogQXNzZXJ0LFxuICBzZWxlY3RvcnM6IFBhcnRpYWw8U2VsZWN0b3JzPiA9IERFRkFVTFRfU0VMRUNUT1JTXG4pIHtcbiAgY29uc3QgeyBlbGVtZW50cywgc2VsZWN0b3JzOiBhbGxTZWxlY3RvcnMgfSA9IHNldHVwU2VsZWN0VGVzdChcbiAgICBhc3NlcnQsXG4gICAgc2VsZWN0b3JzXG4gICk7XG5cbiAgY29uc3QgeyB0cmlnZ2VyLCBsaXN0IH0gPSBlbGVtZW50cztcbiAgYXdhaXQgY2xpY2sodHJpZ2dlcik7XG4gIGF3YWl0IHRlc3RMaXN0Ym94TW91c2VOYXZpZ2F0aW9uKFxuICAgIGFzc2VydCxcbiAgICB7XG4gICAgICBsaXN0XG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IGFsbFNlbGVjdG9ycy5vcHRpb25cbiAgICB9XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RTZWxlY3RGb3JNb3VzZVNpbmdsZVNlbGVjdGlvbihcbiAgYXNzZXJ0OiBBc3NlcnQsXG4gIGVsZW1lbnRzOiBFbGVtZW50cyxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcnNcbikge1xuICBjb25zdCB7IHRyaWdnZXIsIGxpc3QgfSA9IGVsZW1lbnRzO1xuICBhd2FpdCBjbGljayh0cmlnZ2VyKTtcbiAgYXdhaXQgdGVzdExpc3Rib3hGb3JNb3VzZVNpbmdsZVNlbGVjdGlvbihcbiAgICBhc3NlcnQsXG4gICAge1xuICAgICAgdGFyZ2V0OiB0cmlnZ2VyLFxuICAgICAgbGlzdFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiBzZWxlY3RvcnMub3B0aW9uXG4gICAgfVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0U2VsZWN0Rm9yTW91c2VNdWx0aVNlbGVjdGlvbihcbiAgYXNzZXJ0OiBBc3NlcnQsXG4gIGVsZW1lbnRzOiBFbGVtZW50cyxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcnNcbikge1xuICBjb25zdCB7IHRyaWdnZXIsIGxpc3QgfSA9IGVsZW1lbnRzO1xuICBhd2FpdCBjbGljayh0cmlnZ2VyKTtcbiAgYXdhaXQgdGVzdExpc3Rib3hGb3JNb3VzZU11bHRpU2VsZWN0aW9uKFxuICAgIGFzc2VydCxcbiAgICB7XG4gICAgICB0YXJnZXQ6IHRyaWdnZXIsXG4gICAgICBsaXN0XG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHNlbGVjdG9ycy5vcHRpb25cbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0U2VsZWN0TW91c2VTZWxlY3Rpb24oXG4gIGFzc2VydDogQXNzZXJ0LFxuICBzZWxlY3RvcnM6IFBhcnRpYWw8U2VsZWN0b3JzPiA9IERFRkFVTFRfU0VMRUNUT1JTXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBlbGVtZW50cywgc2VsZWN0b3JzOiBhbGxTZWxlY3RvcnMgfSA9IHNldHVwU2VsZWN0VGVzdChcbiAgICBhc3NlcnQsXG4gICAgc2VsZWN0b3JzXG4gICk7XG4gIGNvbnN0IG11bHRpID0gZWxlbWVudHMubGlzdC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJyk7XG5cbiAgYXdhaXQgKG11bHRpXG4gICAgPyB0ZXN0U2VsZWN0Rm9yTW91c2VNdWx0aVNlbGVjdGlvbihhc3NlcnQsIGVsZW1lbnRzLCBhbGxTZWxlY3RvcnMpXG4gICAgOiB0ZXN0U2VsZWN0Rm9yTW91c2VTaW5nbGVTZWxlY3Rpb24oYXNzZXJ0LCBlbGVtZW50cywgYWxsU2VsZWN0b3JzKSk7XG59XG4iXX0=