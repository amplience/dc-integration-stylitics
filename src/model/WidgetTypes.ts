import { WidgetArgs } from "./WidgetArgumentTypes";

export type StyliticsAction = 'click' | 'view' | 'swap' | 'mount';
export type StyliticsSubject = 'bundle' | 'bundles' | 'item' | 'replacement' | 'replacements';

/**
 * Interface for a generic Stylitics Widget instance.
 */
export interface StyliticsWidget {
    /**
     * Remove the widget completely from the page, should you need to.
     */
    destroy: () => void,

    /**
     * IMPORTANT: Clients should consult with their account managers before toggling these tracking functions, as it may impact analytics results.
     */
    doNotTrack: () => void,

    /**
     * Add a callback to be called for an event type, likely for customization or metrics purposes.
     * @param action Choose one
     * @param subject Choose one
     * @param method Callback function that will be called with relevant arguments when the event occurs
     */
    on: (action: StyliticsAction, subject: StyliticsSubject, method: Function) => void,

    /**
     * Override the default behavior for an event type. For instance, use this to open a "quickview" on click.
     * @param action Only click behaviors can be overriden for now
     * @param subject Choose one
     * @param method Callback function that will be called with relevant arguments when the event occurs
     */
    override: (action: 'click', subject: 'bundle' | 'item', method: Function) => void,

    /**
     * Reload the widget passing in new params. Often useful if you would like to switch to a new colorway ID.
     * @param args Updated widget arguments
     */
    refresh: (args: WidgetArgs) => void,

    /**
     * Call after initialization and after any calls to .on or .override Starts the process of fetching outfits from Stylitics in order to populate the widget.
     */
    start: () => void,

    /**
     * Send a tracking event when a user adds an item to the cart.
     */
    trackAddItemToCart: (itemId: string) => void,

    /**
     * Send a tracking event when a user clicks on an item outside of the Stylitics Widget, for instance, in a "quickview".
     */
    trackClickItem: (remoteId: string) => void,

    /**
     * Send a tracking event when a user clicks a jumplink.
     */
    trackClickJumpLink: () => void,

    /**
     * Print information about the widget to the browser console.
     */
    info: () => void,
}