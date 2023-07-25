# dc-integration-stylitics

A library for managing stylitics widgets within modern web frameworks, configuring them with content items from Amplience, as well as a collection of content types and schemas you can install to make integrating Stylitics with Amplience considerably easier.

## Usage

```typescript
import { fromContentItem, createWidget } from 'dc-integration-stylitics';

// Fetch from DC, in the format found in the automation.
const contentItem = {
    ...
}

const element = document.getElementById('widget');

const args = fromContentItem(contentItem);
const widget = await createWidget(element, args);

widget.start();
```

Similar to using the Stylitics widget manually, you can set overrides before starting the widget, refresh it with new arguments, or dispose it when finished.

### Usage (standalone)
For projects that don't use node, you can import a prepackaged script that places the module in the global scope as `ampStylitics`:

```html
<script src="https://unpkg.com/dc-integration-stylitics/dist/ampStylitics.browser.umd.min.js"></script>

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

## Development

Node 18.x or later should be used to build the project.

`npm run build`

This builds the project in a variety of configurations:
- `main`: es6/commonjs target.
- `module`: esnext target.
- `dist`: Webpack distributions meant for loading in the browser. These load the module into the global scope as `ampStylitics`.

## Unit tests

`npm run test`