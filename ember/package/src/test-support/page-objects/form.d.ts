import { PageObject } from 'fractal-page-object';
import type { GenericPageObject } from 'fractal-page-object/dist/-private/types';
export declare class FormPageObject extends PageObject<HTMLFormElement> {
    static SELECTOR: string;
    constructor(selector?: string, parent?: GenericPageObject | Element | null, index?: number | null);
    $submit: any;
    $reset: any;
    $fields: any;
    field(name: string): any;
    submit(): Promise<any>;
    reset(): Promise<any>;
}
//# sourceMappingURL=form.d.ts.map