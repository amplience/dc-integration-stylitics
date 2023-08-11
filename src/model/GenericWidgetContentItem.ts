import { ContentItem } from "./ContentItem";
import { ClassicWidgetProps, CommonWidgetProps, GalleryWidgetProps, HotspotWidgetProps, MainAndDetailWidgetProps, MoodboardWidgetProps, ResponsiveBreakpointsContent, WidgetHotspotOverlayOrderContent } from "./WidgetArgumentTypes";

export type GenericWidgetType = 
    'classic' |
    'hotspots' |
    'moodboard' |
    'gallery' |
    'mainAndDetail';

export interface CommonWidgetContentItem extends ContentItem, CommonWidgetProps {
    view: GenericWidgetType,
    account: string,
    sku?: string,
}

export interface MainAndDetailWidgetContentItem extends CommonWidgetContentItem {
    mainAndDetail: MainAndDetailWidgetProps,
}

export interface ClassicWidgetContentItem<StringType> extends CommonWidgetContentItem {
    classic: ClassicWidgetProps<StringType, ResponsiveBreakpointsContent>,
}

export interface HotspotWidgetContentItem<StringType> extends CommonWidgetContentItem {
    hotspots: HotspotWidgetProps<StringType, WidgetHotspotOverlayOrderContent, ResponsiveBreakpointsContent>,
}

export interface MoodboardWidgetContentItem<StringType> extends CommonWidgetContentItem {
    moodboard: MoodboardWidgetProps<StringType, ResponsiveBreakpointsContent>,
}

export interface GalleryWidgetContentItem<StringType> extends CommonWidgetContentItem {
    gallery: GalleryWidgetProps<StringType, ResponsiveBreakpointsContent>,
}

export type GenericWidgetContentItem<StringType> =
    MainAndDetailWidgetContentItem |
    ClassicWidgetContentItem<StringType> |
    HotspotWidgetContentItem<StringType> |
    MoodboardWidgetContentItem<StringType> |
    GalleryWidgetContentItem<StringType>;
