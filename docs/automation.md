# Automation

Included in the automation folder are types and example content you can install in your Amplience Dynamic Content and Content Hub instances to get started with Stylitics.

Functionality of the automation includes:
 - Content Type Schemas
 - Content Types
 - Sample Content for demo accounts and demo sku's from Stylitics
 - Default Icons
 - Default Cards
 - Default Visualisations


## Prerequisites for automation

## Mandatory
In order for this automation to work, you must have the following:
- An Amplience Dynamic Content Account.
- A valid API key for this hub with a minumum of a 'Developer' [role](https://amplience.com/developers/docs/concepts/permissions/roles/)

## Other assumptions

### Default Repository
The automation assumes that you have a repository in your Dynamic Content hub with a 'name' of `content`. This is default in most account setups.

If you have a different setup, or would like to apply this to multiple repositories simply do the following before running any automation:

1. Browse to `amplience-automation/automation-files/type`
2. Open up all of the `*.hbs` files
3. Find the `repositories` object and ammend the name to the repository name (s) in your account
4. Save the files and run the automation


## Customisations & Implementation

### Icons, Card & Visualisations

The automation comes with default icons, cards and visualisations. These are stand-alone examples to enable you to see get started quickly.

When using for your implementation it is likely that you will want to ammend these to point to your application. You can ammend directly in each content-type in the Amplience Dynamic Content UI, or ammend in the automation.

#### 

1. Browse to `amplience-automation/automation-files/type`
2. Open up all of the `*.hbs` files
3. Depending on what you would like to change, see the attributes `icons`, `cards` or `visualizations` object and ammend as appropriate.
4. Save the files and run the automation


### Account

This automation comes with a dropdown and selector for some demo accounts from stylitics to get you up and running fast and test a technical implementation and rendering in your application.

If you are a stylitics customer, will have different account(s) that you are using.

If you have already automated in you can either re-automate with changes, or simply change in the Amplience Dynamic Content UI.

#### Amplience UI
In your account go to content type schemas and edit the 'partial' named `{schemabaseui}/lib/stylitics`.

You will see a JSON object called 'account' which has the following content:

``` json
"account": {
    "title": "Account",
    "type": "string",
    "enum": [
        "demo",
        "demo-home-labels",
        "demo-home",
        "demo-kidboys",
        "demo-kidgirls",
        "demo-labels-classic",
        "demo-mens",
        "demo-womens"
    ],
    "default": "demo"
}
```

Simply ammend to the accounts in use for your stylitics implementation. You can remove the default value or choose one that applies to you and save.

In order for this to change to take effect, you will have to also sync your stylitics content-types.

>Note: If you would prefer this as a text field to input rather than a list to select from you can change to the example below. We would recommend a selection list to minimise user error:

```json
"account": {
    "title": "Account",
    "type": "string"
}
```