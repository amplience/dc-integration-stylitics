# Support

This is an open source integration which you are free to use and customise for your implementation. Amplience supports this integration for the expected behaviour in the project documentation.

The roles between the three key parts of the integration can be summarised as:

1. Amplience Platform
2. Stylitics Platform
3. Integration Scripts

Support is directly via the [Amplience Support Desk](https://support.amplience.com) as a first line.

## Ownership between vendors
The library works by enabling teams to configure their Stylitics widgets in content not code in the Amplience CMS (Dynamic Content). There are clear roles:

- **Amplience Platform**: Managing the content and delivering the content configurations to the library to load the right content from Stylitics  
- **Stylitics Platform**: Loading and rendering of the widget onto the page based on the configuration from Amplience and the available content from Stylitics. All front end rendering is the responsibility of the Stylitics widgets.
- **Amplience Stylitics Integration Scripts**: These take the data from Amplience for the configuration, load the right widget scripts into the page and embed the Stylitics widgets with the configuration provided.

### Examples
As an example, you may embed the integration on your page and you have some CSS / rendering issues. These would be the responsibility of the Stylitics Widgets and your front end.

Another example would be that no widget is being displayed on your application. This could be a result of:
1. No data exists for this product in Stylitics
2. There is a bug in the implementation code or code conflict with your front end
3. The data is not being delivered to the front end.

## Hosting
The integration libraries are hosted in `npm` for node applications and `unpkg` for javascript use. SLAs and uptime are subject to their SLAs and uptime.

Should you want to host files on your own HTTPS hosting environments, please feel free to do so and update any URLs used.

> Note: We also host some example visualisations in an Amplience S3 bucket. In an implementation we would expect these to point to your application.

## Watch
We recommend that you watch this repository so that you can be notified of updates and releases.

## Customisations
We expect customers to amend their configurations to point to Stylitics specific accounts and products.

There are also integrations in the your front end application which you would adopt as a normal Stylitics integration which may include but would not be limited to:

- CSS overrides
- Analytics implementaton
- Event tracking / overrides
- Custom configuration properties
