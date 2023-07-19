import { ContentItem } from "./model/ContentItem";
import { GenericWidgetContentItem, GenericWidgetType } from "./model/GenericWidgetContentItem";
import { SpecificWidgetContentItem } from "./model/SpecificWidgetContentItem";
import { WidgetArgs } from "./model/WidgetTypes";

type ArgumentContentType = GenericWidgetType | 'generic';

const typeMapping = new Map<string, ArgumentContentType>([
    ['https://demostore.amplience.com/content/stylitics/generic', 'generic'],
    ['https://demostore.amplience.com/content/stylitics/main-and-detail', 'mainAndDetail'],
    ['https://demostore.amplience.com/content/stylitics/classic', 'classic'],
    ['https://demostore.amplience.com/content/stylitics/hotspots', 'hotspots'],
    ['https://demostore.amplience.com/content/stylitics/moodboard', 'moodboard'],
    ['https://demostore.amplience.com/content/stylitics/gallery', 'gallery']
]);

function flattenGenericType(base, type): void {
    if (type.display) {
        base.display = {...base.display, ...type.display};
    }

    if (type.navigation) {
        base.navigation = {...base.navigation, ...type.navigation}
    }

    if (type.text) {
        base.text = {...base.text, ...type.text}
    }
}

function flattenCommon(result: any): void {
    result.api = {...result.api, item_number: result.sku};

    if (result.display && result.display.hotspotsOverlayOrder) {
        result.display.hotspotsOverlayOrder = result.display.hotspotsOverlayOrder.map(order => order.split(','));
    }
}

export function registerSchemaMappings(schemaPairs: [string, ArgumentContentType][]) {
    for (const pair of schemaPairs) {
        typeMapping.set(pair[0], pair[1]);
    }
}

export function fromGeneric(body: GenericWidgetContentItem<string>) : WidgetArgs {
    const result = {...body} as any;

    flattenGenericType(result, result[result.view]);

    flattenCommon(result);

    return result;
}

export function fromSpecific(body: SpecificWidgetContentItem<string>, type: GenericWidgetType) : WidgetArgs {
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

export function fromContentItem(body: GenericWidgetContentItem<string> | SpecificWidgetContentItem<string>) : WidgetArgs {
    const type = toArgumentContentType(body);

    if (type === 'generic') {
        return fromGeneric(body as GenericWidgetContentItem<string>);
    } else {
        return fromSpecific(body as SpecificWidgetContentItem<string>, type);
    }
}