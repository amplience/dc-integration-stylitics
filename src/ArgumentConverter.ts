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
 */
function flattenGenericType(base, type): void {
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
    }
}

/**
 * Flatten common configuration from the content item into Stylitics widget configuration.
 * @param result 
 */
function flattenCommon(result: any): void {
    result.api = {...result.api, item_number: result.sku};

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
    const result = {...body} as any;

    flattenGenericType(result, result[result.view]);

    flattenCommon(result);

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