import { ContentItem } from "./ContentItem";
import { ClassicWidgetProps, CommonWidgetProps, GalleryWidgetProps, HotspotWidgetProps, MainAndDetailWidgetProps, MoodboardWidgetProps, WidgetHotspotOverlayOrderContent } from "./WidgetArgumentTypes";

export type GenericWidgetType = 
    'classic' |
    'hotspots' |
    'moodboard' |
    'gallery' |
    'mainAndDetail';

export interface GenericWidgetContentItem<StringType> extends ContentItem, CommonWidgetProps {
    view: GenericWidgetType,
    account: string,
    sku: string,
    mainAndDetail: MainAndDetailWidgetProps,
    classic: ClassicWidgetProps<StringType>,
    hotspots: HotspotWidgetProps<StringType, WidgetHotspotOverlayOrderContent>,
    moodboard: MoodboardWidgetProps<StringType>,
    gallery: GalleryWidgetProps<StringType>
}
