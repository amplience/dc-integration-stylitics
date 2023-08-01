function loadWidgets(account, locale, vse) {
    // Elements to place widgets in are present on the page with classname `amp-stylitics-container`.

    const widgetRegistry = {}

    let client;

    function ensureClient() {
        // Get the parameters from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        vse = vse || urlParams.get('vse')

        // Insantiate the SDK
        var ampSDKConfig = {
            locale: locale || urlParams.get('locale'),
            hubName: account || urlParams.get('ampAccount') || 'nmdemostore'
        }
        if (vse) ampSDKConfig.stagingEnvironment = vse
        client = new ampDynamicContent.ContentClient(ampSDKConfig);
    }

    function initWidget(element, id, body, onDone) {
        const args = ampStylitics.fromContentItem(body);
        ampStylitics.createWidget(element, args).then(widgetInstance => {
            widgetInstance.start();

            widgetRegistry[id] = {
                element,
                widgetInstance
            };

            if (onDone) onDone();
        });
    }

    function getId(body) {
        if (typeof body['@id'] === 'string') {
            const lastSlash = body['@id'].lastIndexOf('/');
            return body['@id'].substring(lastSlash + 1);
        }

        if (body._meta?.deliveryId) {
            return body._meta.deliveryId;
        }

        return '';
    }

    const elements = document.getElementsByClassName('amp-stylitics-container');

    let rtvInited = false;
    function initRtv() {
        if (!rtvInited) {
            rtvInited = true;
            const visSDK = window.dcVisualizationSdk;
            if (visSDK) {
                // If the Amplience Visualization SDK is loaded
                // try and listen for changes to the content to perform realtime vis.
                visSDK.init().then((sdk) => {
                    const modelChange = (model) => {
                        // handle form model change
                        const match = widgetRegistry[model.content._meta.deliveryId];
                        const body = model.content;

                        if (match) {
                            match.widgetInstance.destroy();
                            delete widgetRegistry[model.content._meta.deliveryId];
                            initWidget(match.element, getId(body), body);
                        }
                    };

                    sdk.form.get().then(modelChange);
                    sdk.form.changed(modelChange);
                });
            }
        }
    }

    for (const element of elements) {
        if (element.dataset) {
            if (element.dataset.widgetId) {
                // Load widget from amplience content.
                // Assumes dc-delivery-sdk is loaded.
                ensureClient();

                client
                .getContentItemById(element.dataset.widgetId)
                .then((content) => {
                    const body = content.body;

                    initWidget(element, element.dataset.widgetId, body, initRtv);
                })
                .catch((error) => {
                    console.log('content not found', error);
                });
            } else if (element.dataset.ampStyliticsData) {
                // Try to load widget from dataset attributes.

                const json = decodeURIComponent(element.dataset.ampStyliticsData);

                try {
                    const body = JSON.parse(json);

                    initWidget(element, getId(body), body, initRtv);
                } catch { }
            }
        }
    }
}

loadWidgets();