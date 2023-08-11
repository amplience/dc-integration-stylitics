import { GenericWidgetContentItem } from "./model/GenericWidgetContentItem";
import { WidgetInitArgs, fromContentItem } from './ArgumentConverter';

describe('fromGeneric', function() {
    test('Convert a minimal content item', () => {
        const item: GenericWidgetContentItem<string> & {unusedField: string} = {
            _meta: {
                schema: 'https://demostore.amplience.com/content/stylitics/classic'
            },
            view: 'classic',
            account: 'account',
            sku: 'AN_SKU_1',
            api: {},
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: false,
                swipeableCarouselDots: false
            },
            price: {
                hideDoubleZeroCents: false
            },
            classic: {
                display: {
                    hideAnchorItem: false,
                    clickableImageMnM: false,
                    bundleCounter: true,
                    clickableModalDots: false,
                    bundleProductList: 'slideout-on-click',
                    clickableCarouselDots: false,
                    swipeableCarouselArrows: false,
                    dynamicLabelBackground: false
                },
                navigation: {
                    clickItemLinkDesktop: 'new-tab',
                    clickItemLinkMobile: 'same-tab'
                }
            },
            unusedField: 'willBeRemoved'
        }

        expect(fromContentItem(item)).toEqual({
            account: 'account',
            api: {
                item_number: 'AN_SKU_1',
            },
            display: {
                bundleCounter: true,
                bundleProductList: 'slideout-on-click',
                clickableCarouselDots: false,
                clickableImageMnM: false,
                clickableModalDots: false,
                disableMnM: false,
                dynamicLabelBackground: false,
                hideAnchorItem: false,
                imglazyLoadNextScreen: true,
                swipeableCarouselArrows: false,
                swipeableCarouselDots: false,
            },
            navigation: {
                clickItemLinkDesktop: 'new-tab',
                clickItemLinkMobile: 'same-tab',
            },
            price: {
                hideDoubleZeroCents: false,
            },
            view: 'classic',
        } as WidgetInitArgs);
    });

    test('Convert all fields for classic', () => {
        const item: GenericWidgetContentItem<string> = {
            view: 'classic',
            account: 'demo-womens',
            sku: 'BP508_NA6445',
            api: {
                min: 3,
                max: 6
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: false,
                swipeableCarouselNextItemPeek: 0.3
            },
            price: {
                hideDoubleZeroCents: true,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            classic: {
                display: {
                    hideAnchorItem: false,
                    clickableImageMnM: false,
                    bundleCounter: true,
                    clickableModalDots: true,
                    bundleProductList: 'product-list-on-click',
                    clickableCarouselDots: true,
                    clickableCarouselAdvancementRate: 1,
                    clickableCarouselNextItemPeek: 0,
                    clickableCarouselPreviousItemPeek: 0,
                    clickableCarouselGutterWidth: 16,
                    swipeableCarouselLeftPadding: 0,
                    swipeableCarouselArrows: true,
                    dynamicLabelBackground: true,
                    swipeableCarouselGutterWidth: 8,
                    labelStyle: '2',
                    labelBorderColor: '#333333'
                },
                navigation: {
                    clickItemLinkDesktop: 'new-tab',
                    clickItemLinkMobile: 'same-tab'
                },
                text: {
                    viewDetailsCTA: 'More Details...',
                    itemLinkCTA: 'Shop!',
                    itemDetailsModalHeader: 'Details'
                },
                responsive: [
                    { width: 0, columns: 1 },
                    { width: 300, columns: 2 },
                    { width: 600, columns: 3 }
                ],
            },
            _meta: {
                deliveryKey: 'stylitics/classic-example',
                name: 'Stylitics - Classic Example',
                schema: 'https://demostore.amplience.com/content/stylitics/classic'
            }
        }

        expect(fromContentItem(item)).toEqual({
            view: 'classic',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6,
                item_number: 'BP508_NA6445',
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: false,
                swipeableCarouselNextItemPeek: 0.3,
                hideAnchorItem: false,
                clickableImageMnM: false,
                bundleCounter: true,
                clickableModalDots: true,
                bundleProductList: 'product-list-on-click',
                clickableCarouselDots: true,
                clickableCarouselAdvancementRate: 1,
                clickableCarouselNextItemPeek: 0,
                clickableCarouselPreviousItemPeek: 0,
                clickableCarouselGutterWidth: 16,
                swipeableCarouselLeftPadding: 0,
                swipeableCarouselArrows: true,
                dynamicLabelBackground: true,
                swipeableCarouselGutterWidth: 8,
                labelStyle: '2',
                labelBorderColor: '#333333'
            },
            price: {
                hideDoubleZeroCents: true,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            navigation: {
                clickItemLinkDesktop: 'new-tab',
                clickItemLinkMobile: 'same-tab'
            },
            text: {
                viewDetailsCTA: 'More Details...',
                itemLinkCTA: 'Shop!',
                itemDetailsModalHeader: 'Details'
            },
            responsive: [
                [0, { columns: 1 }],
                [300, { columns: 2 }],
                [600, { columns: 3 }]
            ]
        } as WidgetInitArgs);
    });

    test('Convert all fields for hotspots', () => {
        const item: GenericWidgetContentItem<string> = {
            view: 'hotspots',
            account: 'demo-womens',
            sku: 'BQ292_EE3794',
            api: {
                min: 3,
                max: 6
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.275
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            hotspots: {
                display: {
                    hideAnchorItem: true,
                    clickableImageMnM: true,
                    bundleCounter: true,
                    clickableModalDots: false,
                    bundleProductList: 'product-list-on-hover',
                    clickableCarouselDots: true,
                    clickableCarouselAdvancementRate: 1,
                    clickableCarouselNextItemPeek: 0,
                    clickableCarouselPreviousItemPeek: 0,
                    hotspotsAppearOnLoad: true,
                    individualHotspots: false,
                    hotspotsOverlayOrder: [
                        'name',
                        'sales_price,price'
                    ]
                },
                text: {
                    viewDetailsCTA: 'Shop a look?',
                    itemLinkCTA: 'Buy',
                    itemDetailsModalHeader: 'Details'
                },
                responsive: []
            },
            _meta: {
                deliveryKey: 'stylitics/hotspots-example',
                name: 'Stylitics - Hotspots Example',
                schema: 'https://demostore.amplience.com/content/stylitics/hotspots'
            }
        }
    
        expect(fromContentItem(item)).toEqual({
            view: 'hotspots',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6,
                item_number: 'BQ292_EE3794',
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.275,
                hideAnchorItem: true,
                clickableImageMnM: true,
                bundleCounter: true,
                clickableModalDots: false,
                bundleProductList: 'product-list-on-hover',
                clickableCarouselDots: true,
                clickableCarouselAdvancementRate: 1,
                clickableCarouselNextItemPeek: 0,
                clickableCarouselPreviousItemPeek: 0,
                hotspotsAppearOnLoad: true,
                individualHotspots: false,
                hotspotsOverlayOrder: [
                    ['name'],
                    ['sales_price' , 'price']
                ]
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            text: {
                viewDetailsCTA: 'Shop a look?',
                itemLinkCTA: 'Buy',
                itemDetailsModalHeader: 'Details'
            }
        } as WidgetInitArgs);
    });

    test('Convert all fields for gallery', () => {
        const item: GenericWidgetContentItem<string> = {
            view: 'gallery',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.3
            },
            price: {
                hideDoubleZeroCents: false
            },
            gallery: {
                api: {
                    tags: 'mens_stylistspicks_gallery'
                },
                display: {
                    hideAnchorItem: true,
                    clickableImageMnM: true,
                    bundleCounter: false,
                    clickableModalDots: false,
                    bundleProductList: 'product-list-on-click',
                    swipeableCarouselLeftPadding: 0,
                    swipeableCarouselArrows: true,
                    mobileGalleryLayout: true,
                    swipeableCarouselGutterWidth: 0
                },
                navigation: {
                    clickItemLinkDesktop: 'new-tab',
                    clickItemLinkMobile: 'same-tab'
                },
                text: {
                    viewDetailsCTA: 'Check this look',
                    itemLinkCTA: 'Buy it',
                    itemDetailsModalHeader: 'Details'
                },
                responsive: [
                    { width: 0, columns: 1 },
                    { width: 300, columns: 2 },
                    { width: 600, columns: 3 }
                ]
            },
            _meta: {
                deliveryKey: 'stylitics/gallery-example',
                name: 'Stylitics - Gallery Example',
                schema: 'https://demostore.amplience.com/content/stylitics/gallery'
            }
        }
    
        expect(fromContentItem(item)).toEqual({
            view: 'gallery',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6,
                tags: 'mens_stylistspicks_gallery'
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.3,
                hideAnchorItem: true,
                clickableImageMnM: true,
                bundleCounter: false,
                clickableModalDots: false,
                bundleProductList: 'product-list-on-click',
                swipeableCarouselLeftPadding: 0,
                swipeableCarouselArrows: true,
                mobileGalleryLayout: true,
                swipeableCarouselGutterWidth: 0
            },
            price: {
                hideDoubleZeroCents: false
            },
            navigation: {
                clickItemLinkDesktop: 'new-tab',
                clickItemLinkMobile: 'same-tab'
            },
            text: {
                viewDetailsCTA: 'Check this look',
                itemLinkCTA: 'Buy it',
                itemDetailsModalHeader: 'Details'
            },
            responsive: [
                [0, { columns: 1 }],
                [300, { columns: 2 }],
                [600, { columns: 3 }]
            ],
            responsiveMobile: [
                [0, { columns: 1 }],
                [300, { columns: 2 }],
                [600, { columns: 3 }]
            ]
        } as WidgetInitArgs);
    });

    test('Convert all fields for mainAndDetail', () => {
        const item: GenericWidgetContentItem<string> = {
            view: 'mainAndDetail',
            account: 'demo-womens',
            sku: 'BP416_BK0001',
            api: {
                min: 3,
                max: 6
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.2
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'floor',
                salesPriceStyle: 'sales-price-only'
            },
            mainAndDetail: {
                display: {
                    swipeableCarouselArrows: true
                }
            },
            _meta: {
                deliveryKey: 'stylitics/main-and-detail-example',
                name: 'Stylitics - Main and Detail Example',
                schema: 'https://demostore.amplience.com/content/stylitics/main-and-detail'
            }
        }
    
        expect(fromContentItem(item)).toEqual({
            view: 'mainAndDetail',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6,
                item_number: 'BP416_BK0001'
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.2,
                swipeableCarouselArrows: true
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'floor',
                salesPriceStyle: 'sales-price-only'
            }
        } as WidgetInitArgs);
    });

    test('Convert all fields for moodboard', () => {
        const item: GenericWidgetContentItem<string> = {
            view: 'moodboard',
            account: 'demo-womens',
            sku: 'BP331_BK0001',
            api: {
                min: 3,
                max: 6
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.25
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            moodboard: {
                display: {
                    bundleCounter: true,
                    swipeableCarouselLeftPadding: 0,
                    swipeableCarouselArrows: false,
                    dynamicLabelBackground: true,
                    showArrowsMnM: true,
                    moodboardImageType: 'non-editorial',
                    mobileCtaClickOnly: true,
                    hideAnchorItemCard: false,
                    coerceMoodboardImageAspectRatio: 'square',
                    labelStyle: '2',
                    labelBorderColor: '#333333',
                    maxGridSize: 0
                },
                navigation: {
                    clickItemLinkDesktop: 'new-tab',
                    clickItemLinkMobile: 'same-tab'
                },
                text: {
                    bundleCounterLabel: 'Set',
                    itemLinkCTA: 'Shopping',
                    itemDetailsModalHeader: 'Details'
                },
                responsive: [
                    { width: 0, columns: 1 },
                    { width: 300, columns: 2 },
                    { width: 600, columns: 3 }
                ],
            },
            _meta: {
                deliveryKey: 'stylitics/moodboard-example-2',
                name: 'Stylitics - Moodboard Example 2',
                schema: 'https://demostore.amplience.com/content/stylitics/moodboard'
            }
        }
    
        expect(fromContentItem(item)).toEqual({
            view: 'moodboard',
            account: 'demo-womens',
            api: {
                min: 3,
                max: 6,
                item_number: 'BP331_BK0001',
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: true,
                swipeableCarouselDots: true,
                bundleBackgroundColor: '#FEFEFE',
                swipeableCarouselNextItemPeek: 0.25,
                bundleCounter: true,
                swipeableCarouselLeftPadding: 0,
                swipeableCarouselArrows: false,
                dynamicLabelBackground: true,
                showArrowsMnM: true,
                moodboardImageType: 'non-editorial',
                mobileCtaClickOnly: true,
                hideAnchorItemCard: false,
                coerceMoodboardImageAspectRatio: 'square',
                labelStyle: '2',
                labelBorderColor: '#333333',
                maxGridSize: 0
            },
            price: {
                hideDoubleZeroCents: false,
                roundingStyle: 'round',
                salesPriceStyle: 'strikethrough'
            },
            navigation: {
                clickItemLinkDesktop: 'new-tab',
                clickItemLinkMobile: 'same-tab'
            },
            text: {
                bundleCounterLabel: 'Set',
                itemLinkCTA: 'Shopping',
                itemDetailsModalHeader: 'Details'
            },
            responsive: [
                [0, { touchColumns: 1 }],
                [300, { touchColumns: 2 }],
                [600, { touchColumns: 3 }]
            ]
        } as WidgetInitArgs);
    });

    test('Doesn\'t break when extras object is not used', () => {
        const item: any = {
            _meta: {
                schema: 'https://demostore.amplience.com/content/stylitics/classic'
            },
            view: 'classic',
            account: 'account',
            sku: 'AN_SKU_1',
            api: {},
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: false,
                swipeableCarouselDots: false
            },
            price: {
                hideDoubleZeroCents: false
            },
        }

        expect(fromContentItem(item)).toEqual({
            account: 'account',
            api: {
                item_number: 'AN_SKU_1',
            },
            display: {
                imglazyLoadNextScreen: true,
                disableMnM: false,
                swipeableCarouselDots: false
            },
            price: {
                hideDoubleZeroCents: false,
            },
            view: 'classic',
        } as any);
    });
});