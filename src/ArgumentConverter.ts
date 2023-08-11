import { GenericWidgetContentItem, GenericWidgetType } from "./model/GenericWidgetContentItem";
import { WidgetArgs } from "./model/WidgetArgumentTypes";

export type ArgumentContentType = GenericWidgetType | 'generic';

/**
 * Extra arguments needed to initialize a widget that are extracted from a content item.
 */
export interface WidgetExtras {
    view: ArgumentContentType;
    account: string;
}

/**
 * Arguments required to initialize a widget.
 */
export type WidgetInitArgs = WidgetExtras & WidgetArgs

/**
 * Flattens view specific configuration into the base configuration.
 * @param base Base configuration object
 * @param type View specific configuration object
 * @param view View type name
 */
function flattenGenericType(base, type, view: ArgumentContentType): void {
    if (type) {
        if (type.display) {
            base.display = {...base.display, ...type.display};
        }

        if (type.navigation) {
            base.navigation = {...base.navigation, ...type.navigation}
        }

        if (type.text) {
            base.text = {...base.text, ...type.text}
        }

        if (type.api) {
            base.api = {...base.api, ...type.api}
        }

        if (type.responsive) {
            if (type.responsive.length === 0) {
                delete base.responsive;
            } else {
                base.responsive = type.responsive.map(entry => 
                    [entry.width, view === 'moodboard' ? { touchColumns: entry.columns } : { columns: entry.columns }]
                );

                if (view === 'gallery') {
                    base.responsiveMobile = base.responsive;
                }
            }
        }
    }
}

/**
 * Flatten common configuration from the content item into Stylitics widget configuration.
 * @param body The content item body containing the widget arguments
 * @param result Stylitics Widget arguments
 */
function flattenCommon(body: GenericWidgetContentItem<string>, result: any): void {
    result.api = {...result.api, item_number: body.sku};

    if (result.display && result.display.hotspotsOverlayOrder) {
        result.display.hotspotsOverlayOrder = result.display.hotspotsOverlayOrder.map(order => order.split(','));
    }
}

/**
 * Convert from a generic widget content item into a configuration object usable by the Stylitics widget,
 * as well as an account and view type string which can be used to select different types of widget.
 * @param body The content item body containing the widget arguments
 * @returns Stylitics Widget arguments
 */
export function fromGeneric(body: GenericWidgetContentItem<string>) : WidgetInitArgs {
    const result = {
        view: body.view,
        account: body.account,
        api: body.api,
        display: body.display,
        price: body.price,
    } as any;

    const type = body.hasOwnProperty(result.view) ? body[result.view] : undefined;

    flattenGenericType(result, type, result.view);

    flattenCommon(body, result);

    return result;
}

/**
 * Convert a content item containing stylitics widget arguments into an object usable by the Stylitics widget,
 * as well as an account and view type string which can be used to select different types of widget.
 * @param body The content item body containing the widget arguments
 * @returns Stylitics Widget arguments
 */
export function fromContentItem(body: GenericWidgetContentItem<string>) : WidgetInitArgs {
    return fromGeneric(body as GenericWidgetContentItem<string>);
}