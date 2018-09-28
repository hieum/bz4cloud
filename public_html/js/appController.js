/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko, moduleUtils) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'home': {label: 'Home', isDefault: true},
         'acceptOrdersSearch': {label: 'acceptOrdersSearch'}
       });
       
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({'view':[], 'viewModel':null});

      self.loadModule = function() {
        ko.computed(function() {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({'viewPath':viewPath}),
            moduleUtils.createViewModel({'viewModelPath':modelPath})
          ]);
          masterPromise.then(
            function(values){
              self.moduleConfig({'view':values[0],'viewModel':values[1]});
            }
          );
        });
      };

      // Navigation setup
     self.listItems = [
                        {
                            id:"home",
                            label:"Home",
                            iconStyleClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24"
                        },
                        {
                            id:"acceptOrders",
                            label:"受注管理",
                            iconStyleClass: "oj-navigationlist-item-icon demo-education-icon-24 demo-icon-font-24",
                            children:[
                                {
                                    id:"acceptOrdersSearch",
                                    label:"注文照会（受注）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"acceptOrdersRegist",
                                    label:"注文登録（受注）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"deliveryOrders",
                                    label:"納品管理",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"moneyReceipts",
                                    label:"受金・入金",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"aggregateOrders",
                                    label:"集計（受注）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                }
                            ]
                        },
                        {
                            id:"sendOrders",
                            label:"発注管理",
                            iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24",
                            children:[
                                {
                                    id:"sendOrdersSearch",
                                    label:"注文照会（発注）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"sendOrdersRegist",
                                    label:"注文登録（発注）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                }
                            ]
                        },
                        {
                            id:"client",
                            label:"取引先管理",
                            disabled:false,
                            iconStyleClass: "oj-navigationlist-item-icon demo-palette-icon-24 demo-icon-font-24",
                            children:[
                                {
                                    id:"customer",
                                    label:"受注先（得意先）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"supplyer",
                                    label:"発注先（仕入先）",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                }
                            ]
                        },
                        {
                            id:"item",
                            label:"商品管理",
                            iconStyleClass: "oj-navigationlist-item-icon demo-library-icon-24 demo-icon-font-24",
                            children:[
                                {
                                    id:"itemSearch",
                                    label:"商品照会",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                },
                                {
                                    id:"itemRegist",
                                    label:"商品登録",
                                    iconStyleClass: "oj-navigationlist-item-icon demo-catalog-icon-24 demo-icon-font-24"
                                }
                            ]
                        },
                        {
                            id:"statistics",
                            label:"統計",
                            iconStyleClass: "oj-navigationlist-item-icon demo-library-icon-24 demo-icon-font-24"
                        },
                        {
                            id:"qa",
                            label:"問い合わせ",
                            iconStyleClass: "oj-navigationlist-item-icon demo-library-icon-24 demo-icon-font-24"
                        },
                        {
                            id:"infomation",
                            label:"お知らせ",
                            iconStyleClass: "oj-navigationlist-item-icon demo-library-icon-24 demo-icon-font-24"
                        },
                        {
                            id:"setup",
                            label:"設定",
                            iconStyleClass: "oj-navigationlist-item-icon demo-library-icon-24 demo-icon-font-24"
                        }
                    ];
        self.itemOnly = function(context) {
                    return context['leaf'];
                };
                
        self.listener = function(event) {
            if(event.detail["key"] != self.router.stateId()){
                 self.toggleDrawer();
            }
        };

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
