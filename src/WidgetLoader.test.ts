import { WidgetInitArgs } from "./ArgumentConverter";
import { createWidget } from './WidgetLoader';

describe('createWidget', function() {
    afterEach(() => {
        global.document = {} as any;
        global.window = {} as any;
    });

    const exampleArgs = {
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
    } as WidgetInitArgs;

    test('Load a hotspots view, check async loading behaviour', async () => {
        const createElement = jest.fn();
        const appendChild = jest.fn();
        const StyliticsHotspotsWidget = jest.fn();

        const scriptTag = {} as any;

        global.document = {
            createElement,
            head: {
                appendChild
            }
        } as any

        global.window = {
            StyliticsHotspotsWidget
        } as any

        const element = { its: 'anObject' } as any;
        const args = { ...exampleArgs, view: 'hotspots' } as any;
    
        // createElement returns an object, where we call "onload" when the script is loaded
        createElement.mockImplementation(() => scriptTag);
        StyliticsHotspotsWidget.mockImplementation(function () {
            this.start = () => {}
        });

        let done = false;

        const widget1Promise = createWidget(element, args);
        widget1Promise.then(() => done = true);

        // First call will create the script.
        expect(createElement).toHaveBeenCalledWith('script');
        expect(typeof scriptTag.onload).toEqual('function');
        expect(typeof scriptTag.onerror).toEqual('function');

        // Waiting on script to load.
        expect(done).toBeFalsy();

        // Try create a second widget. Shouldn't create a new element.
        // Should wait for script to load.
        const widget2Promise = createWidget(element, args);
        expect(createElement).toHaveBeenCalledTimes(1);
        expect(appendChild).toHaveBeenCalledTimes(1);

        scriptTag.onload();

        await expect(widget1Promise).resolves.toBeTruthy();

        expect(typeof (await widget1Promise).start).toEqual('function');
        expect(StyliticsHotspotsWidget).toHaveBeenCalledWith('account', element, args)

        await expect(widget2Promise).resolves.toBeTruthy();

        // Finally, should be able to create a widget after the script has loaded.

        const widget3Promise = createWidget(element, args);
        expect(createElement).toHaveBeenCalledTimes(1);
        expect(appendChild).toHaveBeenCalledTimes(1);

        await expect(widget3Promise).resolves.toBeTruthy();
    });

    test('Load a classic view when the view doesn\'t exist', async () => {
        const createElement = jest.fn();
        const appendChild = jest.fn();
        const StyliticsClassicWidget = jest.fn();

        const scriptTag = {} as any;

        global.document = {
            createElement,
            head: {
                appendChild
            }
        } as any

        global.window = {
            StyliticsClassicWidget
        } as any

        const element = { its: 'anObject' } as any;

        const args = { ...exampleArgs, view: 'gsfdgsff' } as any;

        // createElement returns an object, where we call "onload" when the script is loaded
        createElement.mockImplementation(() => scriptTag);
        StyliticsClassicWidget.mockImplementation(function () {
            this.start = () => {}
        });

        const widget1Promise = createWidget(element, args);

        scriptTag.onload();

        await expect(widget1Promise).resolves.toBeTruthy();

        expect(typeof (await widget1Promise).start).toEqual('function');
        expect(StyliticsClassicWidget).toHaveBeenCalledWith('account', element, args);
    });

    test('Error when widget is not in target script', async () => {
        const createElement = jest.fn();
        const appendChild = jest.fn();

        // Explicitly do not set StyliticsClassicWidget

        const scriptTag = {} as any;

        global.document = {
            createElement,
            head: {
                appendChild
            }
        } as any

        global.window = {} as any;

        const element = { its: 'anObject' } as any;
        const args = { ...exampleArgs, view: 'moodboard' } as any;

        // createElement returns an object, where we call "onload" when the script is loaded
        createElement.mockImplementation(() => scriptTag);

        const widget1Promise = createWidget(element, args);

        scriptTag.onload();

        await expect(widget1Promise).rejects.toMatchInlineSnapshot(`[Error: Could not load widget StyliticsMoodboardWidget.]`);
    });

    test('Error when widget script fails to load', async () => {
        const createElement = jest.fn();
        const appendChild = jest.fn();

        const scriptTag = {} as any;

        global.document = {
            createElement,
            head: {
                appendChild
            }
        } as any

        global.window = {} as any;

        const element = { its: 'anObject' } as any;
        const args = { ...exampleArgs, view: 'gallery' } as any;

        // createElement returns an object, where we call "onload" when the script is loaded
        createElement.mockImplementation(() => scriptTag);

        const widget1Promise = createWidget(element, args);

        // Errors when the script can't be loaded or has some error initializing.
        scriptTag.onerror();

        await expect(widget1Promise).rejects.toMatchInlineSnapshot(`[Error: Could not load widget script for StyliticsGalleryWidget.]`);
    });
});