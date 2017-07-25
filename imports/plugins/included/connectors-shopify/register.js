import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Shopify Connect",
  name: "reaction-shopify-connect",
  icon: "fa fa-exchange",
  autoEnable: true,
  settings: {
    apiKey: "",
    password: "",
    sharedSecret: "",
    shopNam: ""
  },
  registry: [{
    label: "Shopify Connect Settings",
    name: "settings/connectors/shopify",
    icon: "fa fa-exchange",
    route: "/dashboard/connectors/shopify",
    provides: "connectorSettings",
    container: "dashboard",
    template: "shopifyConnectSettings"
  }]
});