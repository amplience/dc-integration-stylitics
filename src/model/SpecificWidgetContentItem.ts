import { ContentItem } from "./ContentItem";
import { ClassicWidgetDisplay, CommonWidgetProps, GalleryWidgetApi, GalleryWidgetDisplay, HotspotWidgetDisplay, MainAndDetailDisplay, MoodboardWidgetDisplay, WidgetCustomizedNavigation, WidgetHotspotOverlayOrderContent, WidgetTextExtras, WidgetTextMoodboardExtras } from "./WidgetTypes";

export interface SpecificWidgetContentItemFragment extends ContentItem, CommonWidgetProps {
    sku: string
}

export interface MainAndDetailWidgetContentItem extends SpecificWidgetContentItemFragment {
    display_extra: MainAndDetailDisplay
}

export interface ClassicWidgetContentItem<StringType> extends SpecificWidgetContentItemFragment {
    display_extra: ClassicWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text: WidgetTextExtras<StringType>
}

export interface HotspotWidgetContentItem<StringType> extends SpecificWidgetContentItemFragment {
    display_extra: HotspotWidgetDisplay<WidgetHotspotOverlayOrderContent>,
    text: WidgetTextExtras<StringType>
}

export interface MoodboardWidgetContentItem<StringType> extends SpecificWidgetContentItemFragment {
    display_extra: MoodboardWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text: WidgetTextMoodboardExtras<StringType>
}

export interface GalleryWidgetContentItem<StringType> extends SpecificWidgetContentItemFragment {
    api_extra: GalleryWidgetApi,
    display_extra: GalleryWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text: WidgetTextExtras<StringType>
}

export type SpecificWidgetContentItem<StringType> = 
    MainAndDetailWidgetContentItem |
    ClassicWidgetContentItem<StringType> |
    HotspotWidgetContentItem<StringType> |
    MoodboardWidgetContentItem<StringType> |
    GalleryWidgetContentItem<StringType>