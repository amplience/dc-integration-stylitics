export interface ContentItem {
    _meta: {
        deliveryKey?: string,
        name?: string,
        schema: string
    }
}

export interface LocalizedString extends ContentItem {
    _meta: {
        schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value'
    },
    values: {
        locale: string,
        value: string
    }[]
}