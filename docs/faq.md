# FAQ
This page lists commonly asked questions for implementation.

### What versions of the Stylitics Widgets does the integration load
This implementation loads widgets from the `latest` release from Stylitics of their `v3` widgets.

Exact URLs used are listed in the table below:

|Widget|URL|
|:----|:----|
|Classic|https://web-assets.stylitics.com/v3-classic/latest/classic.release.js|
|Hotspots|https://web-assets.stylitics.com/v3-hotspots/latest/hotspots.release.js|
|Moodboard|https://web-assets.stylitics.com/v3-moodboard/latest/moodboard.release.js|
|Gallery|https://web-assets.stylitics.com/v3-gallery/latest/gallery.release.js|
|Main and Detail|https://web-assets.stylitics.com/v3-main-and-detail/latest/main-and-detail.release.js|

> Note: The Generic component loads the right widget as per its selected view type

### I would like to limit the configuration for my business teams

This example provides all configuration options as it is easier to remove rather than to add. In order to make life easier we have added all of these to a [re-usable partial](https://amplience.com/developers/docs/schema-reference/schema-examples/partials/simple-partial/) which can be found here:

`amplience-automation/automation-files/schema/schemas/stylitics-schema.json.hbs`

There are mandatory properties for the widgets to work which are:
* `sku`
* `account`
* `tags` (if using tags to drive the gallery)

For everything else you are free to remove from each item. The recommended manner is to keep the individual items in the partial but for each widget there is its own object. For example, all Gallery partials are in a `gallery` object.

As an example, if you wanted to remove the option to configure the bundle counter display from the gallery widget, then you would find this in the `gallery` and remove it:

```json
"gallery": {
    "title": "Gallery Widget",
    "type": "object",
    "properties": {
        ...
         "display": {
            "title": "Display Properties",
            "type": "object",
            "properties": {
                ...
                "bundleCounter": {
                    "title": "Bundle Counter Visibility (with MnM)",
                    "allOf": [
                        {
                            "$ref": "#/definitions/bundleCounter"
                        }
                    ]
                },
                ...
            }
        ...
    }
}
```

### I am seeing some funny characters in the HTML rendering of my widget

The Stylitics widgets require the HTML page to have UTF-8 encoding enabled. Simply add the following to the `<head>` tag of your HTML.

```html
<meta charset="utf-8" />
```
For reference of how to do this you can see `examples/stylitics-generic-html.html`.

### I do not have the Content Rendering Service from Amplience - can I remove the default visualisations?

Sure, simply remove the visualisations for all of the Content Types in `amplience-automation/automation-files/type`.
