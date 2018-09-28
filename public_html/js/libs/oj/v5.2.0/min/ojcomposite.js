/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","promise","ojs/ojcustomelement","ojs/ojcomposite-knockout"],function(e){e.Composite={},e.Composite.getMetadata=function(t){var o=e.Composite.getComponentMetadata(t);return o?Promise.resolve(o):null},e.Composite.getComponentMetadata=function(t){var o=e.BaseCustomElementBridge.getRegistered(t);return o&&o.composite?e.BaseCustomElementBridge.__GetDescriptor(t)[e.BaseCustomElementBridge.DESC_KEY_META]:null},e.Composite.register=function(t,o){e.CompositeElementBridge.register(t,o)},e.Composite.getContainingComposite=function(t,o){for(var i=null;t;)if((t=e.CompositeTemplateRenderer.getEnclosingComposite(t))&&"oj-module"!==t.nodeName.toLowerCase()){if(o&&!(16&t.compareDocumentPosition(o)))break;i=t}return i},e.Composite.getBindingProviderName=function(t){return t?t[e.Composite.__BINDING_PROVIDER]:null},e.Composite.__COMPOSITE_PROP="__oj_composite",e.Composite.__BINDING_PROVIDER="__oj_binding_prvdr",e.CompositeElementBridge={},e.CompositeElementBridge.proto=Object.create(e.BaseCustomElementBridge.proto),e.CollectionUtils.copyInto(e.CompositeElementBridge.proto,{beforePropertyChangedEvent:function(t,o,i){var r={property:o};e.CollectionUtils.copyInto(r,i,void 0,!0),e.CompositeTemplateRenderer.invokeViewModelMethod(this._VIEW_MODEL,"propertyChanged",[r])},AddComponentMethods:function(t){var o=function(t,o,i,r,n,s){if(!o.SaveEarlyPropertySet(i,r)){var a=o.SetProperty(t,i,r,n,s);if(a.propertySet)if(a.isSubproperty)e.CompositeElementBridge._getPropertyTracker(o,a.property).valueHasMutated()}};t.setProperty=function(t,i){var r=e.BaseCustomElementBridge.getInstance(this);o(this,r,t,i,this,!0)},t.getProperty=function(t){return e.BaseCustomElementBridge.getInstance(this).GetProperty(this,t,this)},t._propsProto.setProperty=function(e,t){o(this._ELEMENT,this._BRIDGE,e,t,this,!1)},t._propsProto.getProperty=function(e){return this._BRIDGE.GetProperty(this,e,this)},t.getNodeBySubId=function(t){var o=e.BaseCustomElementBridge.getInstance(this),i=o._getViewModel(this);return i.getNodeBySubId?i.getNodeBySubId(t,o._getNodeBySubId.bind(this)):o._getNodeBySubId.bind(this)(t)},t.getSubIdByNode=function(t){var o=e.BaseCustomElementBridge.getInstance(this),i=o._getViewModel(this);return i.getSubIdByNode?i.getSubIdByNode(t,o._getSubIdByNode.bind(this)):o._getSubIdByNode.bind(this)(t)}},CreateComponent:function(t){var o={},i=e.BaseCustomElementBridge.getSlotMap(t,!0);for(var r in i)o[r]=i[r].length;this._SLOT_MAP=i;var n={element:t,props:Promise.resolve(this._PROPS),properties:this._PROPS,slotNodeCounts:Promise.resolve(o),slotCounts:o,unique:e.BaseCustomElementBridge.__GetUnique()};n.uniqueId=t.id?t.id:n.unique,this._VM_CONTEXT=n;var s=e.BaseCustomElementBridge.__GetDescriptor(t.tagName)[e.BaseCustomElementBridge.DESC_KEY_VIEW_MODEL];s="function"==typeof s?new s(n):e.CompositeTemplateRenderer.invokeViewModelMethod(s,"initialize",[n])||s,this._VIEW_MODEL=s;var a=e.CompositeTemplateRenderer.invokeViewModelMethod(s,"activated",[n])||Promise.resolve(!0),d=this;a.then(function(i){var r={props:d._PROPS,slotMap:d._SLOT_MAP,slotNodeCounts:o,unique:d._VM_CONTEXT.unique,uniqueId:d._VM_CONTEXT.uniqueId,viewModel:d._VIEW_MODEL,viewModelContext:d._VM_CONTEXT};Object.defineProperty(t,e.Composite.__BINDING_PROVIDER,{value:"knockout"}),e.Components&&e.Components.unmarkPendingSubtreeHidden(t);var n=e.BaseCustomElementBridge.__GetCache(t.tagName),s=e.CompositeElementBridge._getDomNodes(n.view,t);e.CompositeTemplateRenderer.renderTemplate(r,t,s),d.__READY_TO_FIRE=!0,d.resolveDelayedReadyPromise()}).catch(function(e){d._throwError(t,e)})},DefineMethodCallback:function(t,o,i){t[o]=function(){var t=i.internalName||o,r=e.BaseCustomElementBridge.getInstance(this)._getViewModel(this);return r[t].apply(r,arguments)}},DefinePropertyCallback:function(t,o,i){var r=function(t,r){if(!this._BRIDGE.SaveEarlyPropertySet(o,t)){var n=e.CompositeElementBridge._getPropertyTracker(this._BRIDGE,o),s=n.peek();if(!e.BaseCustomElementBridge.__CompareOptionValues(o,i,t,s)&&(r&&(t=this._BRIDGE.ValidatePropertySet(this._ELEMENT,o,t)),i._eventListener&&this._BRIDGE.SetEventListenerProperty(this._ELEMENT,o,t),n(t),!i._derived)){var a=r?"external":"internal";e.BaseCustomElementBridge.__FirePropertyChangeEvent(this._ELEMENT,o,t,s,a)}}},n=function(t){var r=e.CompositeElementBridge._getPropertyTracker(this._BRIDGE,o),n=t?r.peek():r();return void 0===n&&r(n=this._BRIDGE.GetDefaultValue(i)),n};i._derived||e.BaseCustomElementBridge.__DefineDynamicObjectProperty(t._propsProto,o,function(){return n.bind(this,!1)()},function(e){r.bind(this)(e,!1)}),e.BaseCustomElementBridge.__DefineDynamicObjectProperty(t,o,function(){var t=e.BaseCustomElementBridge.getInstance(this);return n.bind(t._PROPS,!0)()},function(t){var o=e.BaseCustomElementBridge.getInstance(this);r.bind(o._PROPS)(t,!0)})},GetMetadata:function(e){return e._metadata},HandleDetached:function(t){e.BaseCustomElementBridge.proto.HandleDetached.call(this,t),e.CompositeTemplateRenderer.invokeViewModelMethod(this._VIEW_MODEL,"detached",[t]),e.CompositeTemplateRenderer.invokeViewModelMethod(this._VIEW_MODEL,"disconnected",[t])},HandleReattached:function(t){e.BaseCustomElementBridge.proto.HandleReattached.call(this,t),e.CompositeTemplateRenderer.invokeViewModelMethod(this._VIEW_MODEL,"connected",[this._VM_CONTEXT])},InitializeElement:function(t){e.BaseCustomElementBridge.proto.InitializeElement.call(this,t),e.Components&&e.Components.markPendingSubtreeHidden(t);var o=e.BaseCustomElementBridge.__GetCache(t.tagName);if(!o.view){var i=e.BaseCustomElementBridge.__GetDescriptor(t.tagName)[e.BaseCustomElementBridge.DESC_KEY_VIEW];o.view||("string"==typeof i&&(o.view=e.CompositeElementBridge._getDomNodes(i,t)),o.view=i)}if(!o.css){var r=e.BaseCustomElementBridge.__GetDescriptor(t.tagName)[e.BaseCustomElementBridge.DESC_KEY_CSS];if(r){var n=document.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=r:n.appendChild(document.createTextNode(r)),document.head.appendChild(n),o.css=!0}}e.BaseCustomElementBridge.__InitProperties(t,this._PROPS)},InitializePrototype:function(t){e.BaseCustomElementBridge.proto.InitializePrototype.call(this,t),Object.defineProperty(t,"_propsProto",{value:{}})},InitializeBridge:function(t){e.BaseCustomElementBridge.proto.InitializeBridge.call(this,t),t._propsProto&&(this._PROPS=Object.create(t._propsProto),this._PROPS._BRIDGE=this,this._PROPS._ELEMENT=t)},_getNodeBySubId:function(t){var o=e.CompositeElementBridge.__GetSubIdMap(this)[t.subId];if(o){if(o.alias){var i=e.CollectionUtils.copyInto({},t,void 0,!0);i.subId=o.alias;var r=o.node;return r.getNodeBySubId?r.getNodeBySubId(i):e.Components.__GetWidgetConstructor(r)("getNodeBySubId",i)}return o.node}return null},_getSubIdByNode:function(t){if(!this.contains(t))return null;var o=e.CompositeElementBridge.__GetNodeMap(this),i=e.Composite.getContainingComposite(t,this);if(null!=i){var r;if(r=o[a=i.node.getAttribute("data-oj-subid-map")])if(i.getSubIdByNode)if(d=i.getSubIdByNode(t)){var n=r.map[d.subId];return d.subId=n,d}return null}for(var s=t;s!==this;){var a;if(a=s.getAttribute("data-oj-subid-map")||s.getAttribute("data-oj-subid"))break;s=s.parentNode}if(r=o[a]){if(!r.map)return{subId:a};var d,m=r.node;if(d=m.getSubIdByNode?m.getSubIdByNode(t):e.Components.__GetWidgetConstructor(m)("getSubIdByNode",t))return d.subId=r.map[d.subId],d}return null},_getViewModel:function(e){return this._VIEW_MODEL||this._throwError(e,"Cannot access methods before element is upgraded."),this._VIEW_MODEL}}),e.CompositeElementBridge.register=function(t,o){var i={};if(i[e.BaseCustomElementBridge.DESC_KEY_META]=e.CompositeElementBridge._getResource(o,e.BaseCustomElementBridge.DESC_KEY_META),i[e.BaseCustomElementBridge.DESC_KEY_VIEW]=e.CompositeElementBridge._getResource(o,e.BaseCustomElementBridge.DESC_KEY_VIEW),i[e.BaseCustomElementBridge.DESC_KEY_CSS]=e.CompositeElementBridge._getResource(o,e.BaseCustomElementBridge.DESC_KEY_CSS),i[e.BaseCustomElementBridge.DESC_KEY_VIEW_MODEL]=e.CompositeElementBridge._getResource(o,e.BaseCustomElementBridge.DESC_KEY_VIEW_MODEL),i[e.BaseCustomElementBridge.DESC_KEY_PARSE_FUN]=o[e.BaseCustomElementBridge.DESC_KEY_PARSE_FUN],e.BaseCustomElementBridge.__Register(t,i,e.CompositeElementBridge.proto,!0)){var r=i[e.BaseCustomElementBridge.DESC_KEY_META];if(r||(e.Logger.warn("Composite registered'"+t.toLowerCase()+"' without Metadata."),r={}),null==i[e.BaseCustomElementBridge.DESC_KEY_VIEW])throw new Error("Cannot register composite '"+t.toLowerCase()+"' without a View.");i._metadata=e.BaseCustomElementBridge.__ProcessEventListeners(r,!1),customElements.define(t.toLowerCase(),e.CompositeElementBridge.proto.getClass(i))}},e.CompositeElementBridge._getDomNodes=function(t,o){if("string"==typeof t)return e.__HtmlUtils.stringToNodeArray(t);if(e.CompositeElementBridge._isDocumentFragment(t)){for(var i=t.cloneNode(!0),r=[],n=0;n<i.childNodes.length;n++)r.push(i.childNodes[n]);return r}if(Array.isArray(t)){for(i=[],n=0;n<t.length;n++)i.push(t[n].cloneNode(!0));return i}e.BaseCustomElementBridge.getInstance(o)._throwError(o,"The composite View is not one of the following supported types: string, Array of DOM nodes, DocumentFragment")},e.CompositeElementBridge._generateSubIdMap=function(t,o){if(!t._SUBID_MAP){for(var i={},r={},n=o.children,s=0;s<n.length;s++)e.CompositeElementBridge._walkSubtree(i,r,n[s]);t._NODE_MAP=r,t._SUBID_MAP=i}},e.CompositeElementBridge._walkSubtree=function(t,o,i){if(!i.hasAttribute("slot")&&(e.CompositeElementBridge._addNodeToSubIdMap(t,o,i),!e.BaseCustomElementBridge.getRegistered(i.tagName)&&!e.Components.__GetWidgetConstructor(i)))for(var r=i.children,n=0;n<r.length;n++)e.CompositeElementBridge._walkSubtree(t,o,r[n])},e.CompositeElementBridge._addNodeToSubIdMap=function(e,t,o){var i=o.getAttribute("data-oj-subid"),r=o.getAttribute("data-oj-subid-map");if(r){var n=JSON.parse(r);if("object"==typeof n&&!(n instanceof Array)){var s=n,a={};for(var d in s)e[d]={alias:s[d],node:o},a[s[d]]=d;t[r]={map:a,node:o}}}else i&&(e[i]={node:o},t[i]={node:o})},e.CompositeElementBridge.__GetSubIdMap=function(t){var o=e.BaseCustomElementBridge.getInstance(t);return e.CompositeElementBridge._generateSubIdMap(o,t),o._SUBID_MAP},e.CompositeElementBridge.__GetNodeMap=function(t){var o=e.BaseCustomElementBridge.getInstance(t);return e.CompositeElementBridge._generateSubIdMap(o,t),o._NODE_MAP},e.CompositeElementBridge._getPropertyTracker=function(t,o){return t._TRACKERS||(t._TRACKERS={}),t._TRACKERS[o]||(t._TRACKERS[o]=e.CompositeTemplateRenderer.createTracker()),t._TRACKERS[o]},e.CompositeElementBridge._getResource=function(e,t){var o=e[t];if(null!=o){if(o.hasOwnProperty("inline"))return o.inline;if(o.hasOwnProperty("promise"))throw new Error("The 'promise' resource type for descriptor key '"+t+"' is no longer supported. The resource should be passed directly as the value instead.");return o}},e.CompositeElementBridge._isDocumentFragment=function(e){return window.DocumentFragment?e instanceof DocumentFragment:e&&11===e.nodeType}});