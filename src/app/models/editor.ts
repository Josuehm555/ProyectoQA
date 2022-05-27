import { AngularEditorConfig } from "@kolkov/angular-editor";

export var editor_config_global: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '5rem',
    placeholder: 'Ingrese el texto aquí...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
        {
            name: "quote",
            class: "quote",
        },
        {
            name: 'redText',
            class: 'redText'
        },
        {
            name: "titleText",
            class: "titleText",
            tag: "h1",
        },
    ]
};
