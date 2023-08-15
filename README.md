# @amplience/dc-integration-stylitics

![Stylitics Widgets)](./docs/media/stylitics-main.png)

A library for managing Stylitics widgets within modern web frameworks, configuring them with content items from Amplience, as well as a collection of content types and schemas you can install to make integrating Stylitics with Amplience considerably easier.

## ⚙️ Features
- Convert Content Item into Stylitics arguments
- Automatically create Stylitics Widget
- Import schemas, types, samples items in a Dynamic Content Hub
- Use provided templates for Content Rendering Service visualisation and cards

## 🏁 Quickstart

Setting up the Stylitics integration library is a simple import or include of the integration.

Once imported, the following two methods can be used:

- `fromContentItem`: Convert from a content item containing Stylitics widget configuration into arguments you can provide to create the widget.
- `createWidget`: Create a Stylitics widget with a given set of arguments, including view type and account. Automatically loads necessary scripts for the view type asynchronously, and keeps them loaded for future requests.

These can be used regardless of implementation type (NodeJS project, Simple HTML/JS/CSS project or even using the Amplience Content Rendering Service)

The examples below show how your would use in each implementation type. We would recommend using the [Amplience DC Delivery SDK](https://github.com/amplience/dc-delivery-sdk-js) to fetch your content

### NodeJS Usage Example

Install the package from NPM:

`npm i @amplience/dc-integration-stylitics`

You can use it in your project as follows:

```typescript
import { fromContentItem, createWidget } from '@amplience/dc-integration-stylitics';

// Fetch from DC, in the format found in the automation.
const contentItem = {
    ...
}

const element = document.getElementById('widget');

const args = fromContentItem(contentItem);
const widget = await createWidget(element, args);

widget.start();
```

Similar to using the Stylitics widget manually, you can set overrides before starting the widget, refresh it with new arguments, or `destroy()` it when finished.

### Usage HTML / JS / CSS
For projects that don't use node, you can import a pre-packaged script that places the module in the global scope as `ampStylitics`:

```html
<script src="https://unpkg.com/@amplience/dc-integration-stylitics/dist/ampStylitics.browser.umd.min.js"></script>

<div id="widget"></div>

<script>
    // Fetch from DC, in the format found in the automation.
    const contentItem = {
        ...
    }

    const element = document.getElementById('widget');

    const args = ampStylitics.fromContentItem(contentItem);
    ampStylitics.createWidget(element, args).then(
        widget => widget.start()
    );
</script>
```

#### Example

In the `/examples` folder you will see an implementation with the following files that includes fetching an item, instantiating the widget and support for real-time visualisation:

HTML Example: `examples/stylitics-generic-html.html`
JS used to fetch content / visualisation: `examples/stylitics-widget.js`

## 🌍 Useful Links
- [Automation](./docs/automation.md)
- [Developing and Building Locally](./docs/developing+building+locally.md)
- [FAQ](./docs/faq.md)
- [ChangeLog](./CHANGELOG.md) 
- [Contributing](./CONTRIBUTING.md)
- [Support](./support.md)
- [Licensing](./LICENSE)
