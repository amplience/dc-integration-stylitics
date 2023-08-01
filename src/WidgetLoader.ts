import { WidgetInitArgs } from "./ArgumentConverter";
import { StyliticsWidget } from "./model/WidgetTypes";

interface ViewLoadHandler {
    onLoad: () => void;
    onError: () => void;
}

interface ViewMapping {
    script: string,
    name: string,

    loaded?: boolean,
    error?: boolean,
    loadMethods?: ViewLoadHandler[]
}

const styliticsViewMapping : { [key: string]: ViewMapping } = {
    classic: {
        script: "https://web-assets.stylitics.com/v3-classic/latest/classic.release.js",
        name: "StyliticsClassicWidget"
    },
    hotspots: {
        script: "https://web-assets.stylitics.com/v3-hotspots/latest/hotspots.release.js",
        name: "StyliticsHotspotsWidget"
    },
    moodboard: {
        script: "https://web-assets.stylitics.com/v3-moodboard/latest/moodboard.release.js",
        name: "StyliticsMoodboardWidget"
    },
    gallery: {
        script: "https://web-assets.stylitics.com/v3-gallery/latest/gallery.release.js",
        name: "StyliticsGalleryWidget"
    },
    mainAndDetail: {
        script: "https://web-assets.stylitics.com/v3-main-and-detail/latest/main-and-detail.release.js",
        name: "StyliticsMainAndDetailWidget"
    }
}

/**
 * Ensure the given Stylitics view has its script loaded.
 * Only one instance of this module should exist with no stylitics scripts
 * manually included for this to function properly.
 * @param view The Stylitics view to ensure is loaded
 * @returns A promise that is resolved when the view is loaded
 */
function ensureViewLoaded(view: ViewMapping): Promise<void> {
    return new Promise((resolve, reject) => {
        if (view.loaded) {
            if (view.error) {
                reject();
            } else {
                resolve();
            }
        } else if (view.loadMethods == null) {
            view.loadMethods = [{onLoad: resolve, onError: reject}];
    
            var styliticsScript = document.createElement('script');
            styliticsScript.onload = function () {
                view.loaded = true;
    
                for (const method of view.loadMethods) {
                    method.onLoad();
                }
            };
            styliticsScript.onerror = function () {
                if (!view.loaded) {
                    view.error = true;
                    view.loaded = true;

                    for (const method of view.loadMethods) {
                        method.onError();
                    }
                }
            };
            styliticsScript.src = view.script;
            document.head.appendChild(styliticsScript);
        } else {
            view.loadMethods.push({onLoad: resolve, onError: reject});
        }
    });
}

/**
 * Create a stylitics widget instance. When all configuration is complete, run `start()` on it.
 * This may load scripts for the stylitics widget, which will be done asynchronously.
 * @param element Element to place the stylitics widget within.
 * @param args Arguments to forward to the stylitics widget.
 * @returns Stylitics Widget instance, for additional configuration, starting and proper disposal.
 */
export async function createWidget(element: HTMLElement, args: WidgetInitArgs): Promise<StyliticsWidget> {
    const styliticsObj = styliticsViewMapping[args.view] || styliticsViewMapping['classic']

    try {
        await ensureViewLoaded(styliticsObj);
    } catch {
        throw new Error(`Could not load widget script for ${styliticsObj.name}.`);
    }

    const widgetType = window[styliticsObj.name] as any;
    if (widgetType) {
        let widgetInstance = new widgetType(args.account, element, args);
        widgetInstance.start();

        return widgetInstance;
    } else {
        throw new Error(`Could not load widget ${styliticsObj.name}.`);
    }
}