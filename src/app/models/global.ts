import { LabelType, Options } from "@angular-slider/ngx-slider";

export var enlace_global = 'https://audiophistic1.web.app/';
export var cantidad_a_traer_global = 10;
export var precio_envio_global = 2500;
export var opciones_slider_global: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
        switch (label) {
            case LabelType.Low:
                return '<b>Mín.:</b> ₡' + value;
            case LabelType.High:
                return '<b>Máx.:</b> ₡' + value;
            default:
                return '₡' + value;
        }
    }
};