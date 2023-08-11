export type WidgetLinkType = 'new-tab' | 'same-tab';
export type WidgetRoundingStyle = 'none' | 'floor' | 'ceiling' | 'round';
export type WidgetPriceStyle = 'strikethrough' | 'sales-price-only';
export type WidgetBundleListType = 'slideout-on-click' | 'product-list-on-click' | 'product-list-on-hover';
export type WidgetLabelStyle = '1' | '2' | '3' | '4' | '5';
export type WidgetMoodboardImageType = 'editorial' | 'non-editorial';
export type WidgetAspectRatio = 'square';

export interface WidgetApiSection {
    min?: number;
    max?: number;
}

export interface WidgetCustomizedNavigation {
    clickItemLinkDesktop: WidgetLinkType,
    clickItemLinkMobile: WidgetLinkType
}

export interface CommonWidgetProps {
    api?: WidgetApiSection,
    display: {
        imglazyLoadNextScreen: boolean,
        bundleBackgroundColor?: string,
        disableMnM: boolean,
        swipeableCarouselNextItemPeek?: number,
        swipeableCarouselDots: boolean
    },
    price: {
        roundingStyle?: WidgetRoundingStyle,
        hideDoubleZeroCents: boolean,
        salesPriceStyle?: WidgetPriceStyle
    },
}

export type ResponsiveBreakpointsContent = {
    width: number,
    columns: number
}[]

export type ResponsiveBreakpoints = [
    { columns?: number, touchColumns?: number }
]

export interface WidgetTextExtras<StringType> {
    viewDetailsCTA?: StringType,
    itemLinkCTA?: StringType,
    itemDetailsModalHeader?: StringType
}

export interface WidgetTextMoodboardExtras<StringType> {
    itemLinkCTA?: StringType,
    itemDetailsModalHeader?: StringType,
    bundleCounterLabel?: StringType
}

export interface MainAndDetailDisplay {
    swipeableCarouselArrows: boolean
}

export interface MainAndDetailWidgetProps {
    display: MainAndDetailDisplay
}

export interface ClassicWidgetDisplay {
    hideAnchorItem: boolean,
    clickableImageMnM: boolean,
    bundleCounter: boolean,
    clickableModalDots: boolean,
    bundleProductList: WidgetBundleListType,
    clickableCarouselDots: boolean,
    clickableCarouselAdvancementRate?: number,
    clickableCarouselNextItemPeek?: number,
    clickableCarouselPreviousItemPeek?: number,
    clickableCarouselGutterWidth?: number,
    swipeableCarouselGutterWidth?: number,
    swipeableCarouselLeftPadding?: number,
    swipeableCarouselArrows: boolean,
    labelStyle?: WidgetLabelStyle,
    labelBorderColor?: string,
    dynamicLabelBackground: boolean
}

export interface ClassicWidgetProps<StringType, BreakpointType> {
    display: ClassicWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text?: WidgetTextExtras<StringType>,
    responsive?: BreakpointType
}

export type WidgetHotspotOverlayOrderContent = string[]; // As CSV
export type WidgetHotspotOverlayOrderArgs = string[][]; // As multi-dimensional array

export interface HotspotWidgetDisplay<OverlayOrderType> {
    hideAnchorItem: boolean,
    clickableImageMnM: boolean,
    bundleCounter: boolean,
    clickableModalDots: boolean,
    bundleProductList: WidgetBundleListType,
    clickableCarouselDots: boolean,
    clickableCarouselAdvancementRate?: number,
    clickableCarouselNextItemPeek?: number,
    clickableCarouselPreviousItemPeek?: number,
    hotspotsAppearOnLoad: boolean,
    individualHotspots: boolean,
    hotspotsOverlayOrder?: OverlayOrderType
}

export interface HotspotWidgetProps<StringType, OverlayOrderType, BreakpointType> {
    display: HotspotWidgetDisplay<OverlayOrderType>,
    text?: WidgetTextExtras<StringType>,
    responsive?: BreakpointType
}

export interface MoodboardWidgetDisplay {
    bundleCounter: boolean,
    swipeableCarouselLeftPadding?: number,
    swipeableCarouselArrows: boolean,
    labelStyle?: WidgetLabelStyle,
    labelBorderColor?: string,
    dynamicLabelBackground: boolean,
    showArrowsMnM: boolean,
    moodboardImageType: WidgetMoodboardImageType,
    coerceMoodboardImageAspectRatio?: WidgetAspectRatio,
    mobileCtaClickOnly: boolean,
    hideAnchorItemCard: boolean,
    maxGridSize?: number
}

export interface MoodboardWidgetProps<StringType, BreakpointType> {
    display: MoodboardWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text?: WidgetTextMoodboardExtras<StringType>,
    responsive?: BreakpointType
}

export interface GalleryWidgetApi {
    tags: string
}

export interface GalleryWidgetDisplay {
    hideAnchorItem: boolean,
    clickableImageMnM: boolean,
    bundleCounter: boolean,
    clickableModalDots: boolean,
    bundleProductList: WidgetBundleListType,
    swipeableCarouselGutterWidth?: number,
    swipeableCarouselLeftPadding?: number,
    swipeableCarouselArrows: boolean,
    mobileGalleryLayout: boolean
}

export interface GalleryWidgetProps<StringType, BreakpointType> {
    api?: GalleryWidgetApi,
    display: GalleryWidgetDisplay,
    navigation: WidgetCustomizedNavigation,
    text?: WidgetTextExtras<StringType>,
    responsive?: BreakpointType
}

export type WidgetArgs = 
    CommonWidgetProps & (
        MainAndDetailWidgetProps |
        ClassicWidgetProps<string, ResponsiveBreakpoints> |
        HotspotWidgetProps<string, WidgetHotspotOverlayOrderArgs, ResponsiveBreakpoints> |
        MoodboardWidgetProps<string, ResponsiveBreakpoints> |
        GalleryWidgetProps<string, ResponsiveBreakpoints>
    );