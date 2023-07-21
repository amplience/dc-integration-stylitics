import { ContentItem } from "./model/ContentItem";
import { GenericWidgetContentItem, GenericWidgetType } from "./model/GenericWidgetContentItem";
import { SpecificWidgetContentItem } from "./model/SpecificWidgetContentItem";
import { WidgetArgs } from "./model/WidgetArgumentTypes";

export type ArgumentContentType = GenericWidgetType | 'generic';

export interface WidgetExtras {
    view: ArgumentContentType;
    account: string;
}

export type WidgetInitArgs = WidgetExtras & WidgetArgs

const typeMapping = new Map<string, ArgumentContentType>([
    ['https://demostore.amplience.com/content/stylitics/generic', 'generic'],
    ['https://demostore.amplience.com/content/stylitics/main-and-detail', 'mainAndDetail'],
    ['https://demostore.amplience.com/content/stylitics/classic', 'classic'],
    ['https://demostore.amplience.com/content/stylitics/hotspots', 'hotspots'],
    ['https://demostore.amplience.com/content/stylitics/moodboard', 'moodboard'],
    ['https://demostore.amplience.com/content/stylitics/gallery', 'gallery']
]);

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

function flattenCommon(result: any): void {
    result.api = {...result.api, item_number: result.sku};

    if (result.display && result.display.hotspotsOverlayOrder) {
        result.display.hotspotsOverlayOrder = result.display.hotspotsOverlayOrder.map(order => order.split(','));
    }
}

/**
 * Register content type schemas that map to given Stylitics Widget types, or the generic type.
 * Replaces existing mappings.
 * @param schemaPairs Pairs of schema ID and widget type to register
 */
export function registerSchemaMappings(schemaPairs: [string, ArgumentContentType][]) {
    for (const pair of schemaPairs) {
        typeMapping.set(pair[0], pair[1]);
    }
}

/**
 * Convert from a generic widget content item into an object usable by the Stylitics widget,
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
 * Convert from a specific widget content item into an object usable by the Stylitics widget,
 * as well as an account and view type string which can be used to select different types of widget.
 * @param body The content item body containing the widget arguments
 * @param type The identified type of the specific widget
 * @returns Stylitics Widget arguments
 */
export function fromSpecific(body: SpecificWidgetContentItem<string>, type: GenericWidgetType) : WidgetInitArgs {
    const keys = Object.keys(body);
    const result = {...body} as any;

    for (const key of keys) {
        if (key.endsWith('_extra')) {
            const baseKey = key.substring(0, key.length - 6);
            result[baseKey] = {...body[baseKey], ...body[key]};
        }
    }

    result.view = type;

    flattenCommon(result);

    return result;
}

function toArgumentContentType(body: ContentItem): ArgumentContentType {
    return typeMapping.get(body._meta.schema);
}

/**
 * Convert a content item containing stylitics widget arguments into an object usable by the Stylitics widget,
 * as well as an account and view type string which can be used to select different types of widget.
 * @param body The content item body containing the widget arguments
 * @returns Stylitics Widget arguments
 */
export function fromContentItem(body: GenericWidgetContentItem<string> | SpecificWidgetContentItem<string>) : WidgetInitArgs {
    const type = toArgumentContentType(body);

    if (type === 'generic' || 'type' in body) {
        return fromGeneric(body as GenericWidgetContentItem<string>);
    } else {
        return fromSpecific(body as SpecificWidgetContentItem<string>, type);
    }
}