(this["webpackJsonpmi-new-aeroset"]=this["webpackJsonpmi-new-aeroset"]||[]).push([[0],{140:function(e){e.exports=JSON.parse('{"a":14}')},212:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n(0),o=n.n(r),a=n(12),c=n.n(a),s=n(51),l=n(74),u=n(123);s.a.use(u.a).use(l.e).init({fallbackLng:"en",initImmediate:!1,lng:"ru",debug:!0,interpolation:{escapeValue:!1}});s.a;var d=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(167);var p=n(46),b=n(17),m=n(50),j=n(39),f=n.n(j),O=Object(m.b)({name:"pointCloudSection",initialState:{isActive:!0,pointsCloudFile:null},reducers:{pointCloudLoadFile:function(e,t){return f()(e,{pointsCloudFile:{$set:t.payload}})},showPointCloudFiltersPanel:function(e){return f()(e,{isActive:{$set:!0}})},closePointCloudFiltersPanel:function(e){return f()(e,{isActive:{$set:!1}})}}}),g=O.actions,x=O.reducer,y=g.pointCloudLoadFile,v=g.showPointCloudFiltersPanel,w=g.closePointCloudFiltersPanel,_=x;var C=Object(m.b)({name:"pointCloudFiltersPanel",initialState:{filterXFromLimit:-100,filterXToLimit:100,filterYFromLimit:-100,filterYToLimit:100,filterZFromLimit:-100,filterZToLimit:100},reducers:{changeXFromLimit:function(e,t){return f()(e,{filterXFromLimit:{$set:t.payload}})},changeXToLimit:function(e,t){return f()(e,{filterXToLimit:{$set:t.payload}})},changeYFromLimit:function(e,t){return f()(e,{filterYFromLimit:{$set:t.payload}})},changeYToLimit:function(e,t){return f()(e,{filterYToLimit:{$set:t.payload}})},changeZFromLimit:function(e,t){return f()(e,{filterZFromLimit:{$set:t.payload}})},changeZToLimit:function(e,t){return f()(e,{filterZToLimit:{$set:t.payload}})}}}),k=function(e){return e.ui.panels.pointCloudFiltersPanel},T=C.actions,P=C.reducer,S=T.changeXFromLimit,L=T.changeXToLimit,I=T.changeYFromLimit,E=T.changeYToLimit,N=T.changeZFromLimit,V=T.changeZToLimit,R=P;var F=n(129),z=n.n(F),A=(window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||b.d,Object(m.a)({reducer:Object(b.c)({ui:Object(b.c)({sections:Object(b.c)({pointCloudSection:_}),panels:Object(b.c)({pointCloudFiltersPanel:R})})}),preloadedState:{},middleware:[z.a],devTools:!1})),M=function(){return Object(p.b)()},D=n(152),B=n(130),G=n(6),W=n(131);function Z(){var e=Object(B.a)(["\n  ",";\n  \n   html, body {\n    padding: 0;\n    margin: 0;\n    height: 100%;\n    min-height: 100%;\n    min-width: 100%;\n    width: 100%;\n    font-family: 'Roboto', 'Segoe UI',sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    overflow:hidden;\n    box-sizing: border-box;\n    *, *:before, *:after {\n    box-sizing: inherit;\n    touch-action: none;\n    -ms-touch-action: none;\n    }\n  }\n\n  code {\n    font-family: source-code-pro, monospace;\n  }\n"]);return Z=function(){return e},e}var H=Object(G.createGlobalStyle)(Z(),W.normalize),X=n(280),Y=n(261),$=n(27),U=n(151),q={app:{colors:{main:{white:"#ffffff",lightGray:"#f7f7f7",mediumGray:"#969696",darkGray:"#363835",lightBlue:"#bee7f1",mediumBlue:"#7dd0e4",darkBlue:"#137cbf"},palette:{white:"#ffffff",black:"",gray:"",blue1:{dark:"",light:"",medium:""},blue2:{dark:"",light:"",medium:""},blue3:{dark:"",light:"",medium:""},green:{dark:"",light:"",medium:""},orange:{dark:"",light:"",medium:""},purple1:{dark:"",light:"",medium:""},purple2:{dark:"",light:"",medium:""},red:{dark:"",light:"",medium:""},yellow:{dark:"",light:"",medium:""}}},font:"Roboto",sizes:{header:48,headerMobile:56,instrumentalPanel:32,footer:30},lang:"ru"}};var J,K,Q=(J=Object($.a)({},q),Object(U.a)(Object($.a)(Object($.a)({},J),q))),ee=function(e){var t=e.children;return Object(i.jsx)(X.b,{injectFirst:!0,children:Object(i.jsx)(Y.a,{theme:Q,children:Object(i.jsx)(G.ThemeProvider,{theme:Q,children:t})})})};!function(e){e[e.white=0]="white",e[e.lightGray=1]="lightGray",e[e.mediumGray=2]="mediumGray",e[e.darkGray=3]="darkGray",e[e.lightBlue=4]="lightBlue",e[e.mediumBlue=5]="mediumBlue",e[e.darkBlue=6]="darkBlue"}(K||(K={}));var te,ne,ie,re,oe,ae=n(73),ce=n(281),se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return function(t){return Object(ce.a)(["theme","app"].concat(Object(ae.a)(e)),t)}},le=function(e){return se(["colors","main",K[e]])},ue=function(e){return se(["sizes",e])},de=G.default.main.withConfig({displayName:"styles__Area",componentId:"p4p3g6-0"})(["height:calc(100vh - ","px);}","{height:calc(100vh - ","px);}background:",";"],(function(e){return ue("header")(e)+ue("footer")(e)+ue("instrumentalPanel")(e)}),(function(e){return e.theme.breakpoints.down("sm")}),(function(e){return ue("headerMobile")(e)}),le(K.lightBlue)),he=n(283),pe=n(265),be=n(88),me=n.n(be),je=n(287),fe=n(264),Oe=n(288),ge=G.default.div.withConfig({displayName:"style__HeaderPanelContainer",componentId:"sc-1qwcvkf-0"})(["background:",";height:","px;display:flex;align-items:center;flex-direction:row-reverse;padding-left:16px;padding-right:16px;"],le(K.mediumGray),ue("header")),xe=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t;return Object(i.jsx)(ge,{children:Object(i.jsx)(je.a,{title:t("user_account"),children:Object(i.jsx)(fe.a,{size:"small",color:"primary",style:{marginLeft:10},children:Object(i.jsx)(me.a,{style:{color:"white",fontSize:35}})})})})})),ye=n(92),ve=n.n(ye),we=n(93),_e=n.n(we),Ce=n(149),ke=n.n(Ce),Te=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=M();return Object(i.jsxs)("div",{children:[Object(i.jsxs)(r.Fragment,{children:[Object(i.jsx)("input",{color:"primary",type:"file",onChange:function(e){var t;e.preventDefault();var i=null===(t=e.target.files)||void 0===t?void 0:t[0];i&&void 0!==i&&n(y(i))},id:"icon-button-file",style:{display:"none"}}),Object(i.jsx)(je.a,{title:t("load_file_with_point_cloud"),children:Object(i.jsx)("label",{htmlFor:"icon-button-file",children:Object(i.jsx)(fe.a,{component:"span",size:"small",color:"primary",children:Object(i.jsx)(ve.a,{style:{color:"white"}})})})})]}),Object(i.jsx)(je.a,{title:t("open_panel_point_cloud_filters"),children:Object(i.jsx)(fe.a,{size:"small",color:"primary",onClick:function(){return n(v())},style:{verticalAlign:"bottom",marginLeft:8},children:Object(i.jsx)(_e.a,{style:{color:"white"}})})}),Object(i.jsx)(je.a,{title:t("point_cloud_clear"),children:Object(i.jsx)(fe.a,{size:"small",color:"primary",onClick:function(){return null},style:{verticalAlign:"bottom",marginLeft:8},children:Object(i.jsx)(ke.a,{style:{color:"white"}})})})]})})),Pe=G.default.div.withConfig({displayName:"style__Panel",componentId:"cf9oyy-0"})(["background:",";height:","px;display:flex;flex-direction:row;align-items:center;padding-left:16px;padding-right:16px;"],le(K.mediumGray),ue("instrumentalPanel")),Se=n(269),Le=n(148),Ie=n.n(Le),Ee=Object(G.default)(Se.a).withConfig({displayName:"style__AppDivider",componentId:"ghjmxl-0"})(["background-color:",";"],le(K.mediumGray)),Ne=Object(G.default)(Se.a).withConfig({displayName:"style__AppDividerLight",componentId:"ghjmxl-1"})(["background-color:",";"],le(K.lightGray)),Ve=Object(G.default)(Se.a).withConfig({displayName:"style__AppDividerBold",componentId:"ghjmxl-2"})(["background-color:",";width:1.15px;height:24px;margin-left:8px;margin-right:8px;"],le(K.lightGray)),Re=Object(G.default)(Ie.a).withConfig({displayName:"style__AppCloseIcon",componentId:"ghjmxl-3"})(["color:",";"],le(K.white)),Fe=Object(G.withTheme)((function(e){return Object(i.jsxs)(Pe,{children:[Object(i.jsx)(Te,{}),Object(i.jsx)(Ve,{orientation:"vertical"})]})})),ze=G.default.div.withConfig({displayName:"style__FooterContainer",componentId:"sc-1g1pkgy-0"})(["background:",";height:","px;display:flex;flex-direction:row;align-items:center;"],le(K.mediumGray),ue("footer")),Ae=n(30),Me=n(278),De=(n(178),n(44)),Be=n(45),Ge=n(53),We=n(139),Ze=n.n(We),He=Object(Ge.injectable)()(te=function(){function e(){Object(De.a)(this,e),this.eventEmitter=new Ze.a.EventEmitter}return Object(Be.a)(e,[{key:"subscribe",value:function(e,t){this.eventEmitter.listeners(e).map((function(e){return e.name})).includes(t.name)||this.eventEmitter.addListener(e,t)}},{key:"unsubscribe",value:function(e,t){this.eventEmitter.removeListener(e,t)}},{key:"send",value:function(e,t){this.eventEmitter.emit(e,[t])}}]),e}())||te,Xe=function(){function e(){Object(De.a)(this,e),this._engine=null,this._scene=null,this._camera=null,this._light=null,this._pointsCloudSystem=null}return Object(Be.a)(e,[{key:"pointsCloudSystem",get:function(){return this._pointsCloudSystem},set:function(e){this._pointsCloudSystem=e}},{key:"light",get:function(){return this._light},set:function(e){this._light=e}},{key:"camera",get:function(){return this._camera},set:function(e){this._camera=e}},{key:"scene",get:function(){return this._scene},set:function(e){this._scene=e}},{key:"engine",set:function(e){this._engine=e},get:function(){return this._engine}}]),e}(),Ye=Object(Ge.injectable)()(ne=function(){function e(){Object(De.a)(this,e),this._scene=new Xe}return Object(Be.a)(e,[{key:"scene",get:function(){return this._scene}}]),e}())||ne,$e=Symbol.for("API_PROVIDER_SERVICE"),Ue=Symbol.for("EventBusService"),qe=Symbol.for("VERSION_SERVICE"),Je=n(55),Ke=n.n(Je),Qe=n(72),et=n(140),tt=n(105),nt=n.n(tt),it=Object(Ge.injectable)()((oe=re=function(){function e(){Object(De.a)(this,e),this.Initialize()}return Object(Be.a)(e,[{key:"Initialize",value:function(){var t=Object(Qe.a)(Ke.a.mark((function t(){var n,i,r;return Ke.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=nt()().year(),i=nt()().month()+1,r=0,i<=3?r=1:i<=6?r=2:i<=9?r=3:i<=12&&(r=4),e._version="".concat(n,".").concat(r,".").concat(et.a);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"GetVersion",value:function(){return e._version}}]),e}(),re._version="None",ie=oe))||ie,rt=new Ge.Container({autoBindInjectable:!0,defaultScope:"Singleton",skipBaseClassChecks:!0});rt.bind(Ue).to(He).inSingletonScope(),rt.bind($e).to(Ye).inSingletonScope(),rt.bind(qe).to(it).inSingletonScope();var ot=rt,at="SHOW_SNACKBAR",ct="SHOW_NEW_VERSION_EVENT",st="CLOSE_DRAWER_EVENT",lt="OPEN_BOTTOM_DRAWER_EVENT",ut="START_PROGRESS_EVENT",dt="STOP_PROGRESS_EVENT",ht=G.default.section.withConfig({displayName:"style__ProgressContainer",componentId:"sc-1sy7rrr-0"})(["margin-left:16px;width:500px;visibility:",";"],(function(e){return e.isOpen?"visible":"collapse"})),pt=n(277),bt=Object(G.withTheme)((function(e){var t=Object(r.useState)({title:"",isOpen:!1}),n=Object(Ae.a)(t,2),o=n[0],a=n[1];function c(e){var t=e[0];a({title:t,isOpen:!0})}function s(e){e[0];a({title:"",isOpen:!1})}Object(r.useEffect)((function(){var e=ot.get(Ue);return e.subscribe(ut,c),e.subscribe(dt,s),function(){e.unsubscribe(ut,c),e.unsubscribe(dt,s)}}));var l=o.title,u=o.isOpen,d=Object(U.a)({palette:{primary:{main:pt.a[500]},secondary:{main:"#42baf5"}}});return Object(i.jsx)(ht,{isOpen:u,children:Object(i.jsx)(G.ThemeProvider,{theme:d,children:Object(i.jsx)(Me.a,{title:l,color:"secondary"})})})})),mt=Object(G.withTheme)((function(e){return Object(i.jsx)(ze,{children:Object(i.jsx)(bt,{})})})),jt=n(8);function ft(e,t){var n=new jt.Scene(e),i=function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,t,n,i){return t+t+n+n+i+i}));var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}(le(K.mediumBlue)({theme:t}));return i&&null!==i&&(n.clearColor=new jt.Color4(i.r/255,i.g/255,i.b/255,1)),function(e,t){var n=function(e,t,n,r){var o=new jt.DynamicTexture("DynamicTexture",50,r,!0);o.hasAlpha=!0,o.drawText(e,5,40,"bold 36px Arial",t,"transparent",!0);var a=i.CreatePlane("TextPlane",n,r,!0),c=new jt.StandardMaterial("TextPlaneMaterial",r);return c.specularColor=new jt.Color3(0,0,0),c.diffuseTexture=o,a.material=c,a.material.backFaceCulling=!1,a},i=jt.Mesh;i.CreateLines("axisX",[jt.Vector3.Zero(),new jt.Vector3(t,0,0),new jt.Vector3(.95*t,.05*t,0),new jt.Vector3(t,0,0),new jt.Vector3(.95*t,-.05*t,0)],e).color=new jt.Color3(1,0,0),n("X","red",t/10,e).position=new jt.Vector3(.9*t,-.05*t,0),i.CreateLines("axisY",[jt.Vector3.Zero(),new jt.Vector3(0,t,0),new jt.Vector3(-.05*t,.95*t,0),new jt.Vector3(0,t,0),new jt.Vector3(.05*t,.95*t,0)],e).color=new jt.Color3(0,1,0),n("Y","green",t/10,e).position=new jt.Vector3(0,.9*t,-.05*t),i.CreateLines("axisZ",[jt.Vector3.Zero(),new jt.Vector3(0,0,t),new jt.Vector3(0,-.05*t,.95*t),new jt.Vector3(0,0,t),new jt.Vector3(0,.05*t,.95*t)],e).color=new jt.Color3(0,0,1),n("Z","blue",t/10,e).position=new jt.Vector3(0,.05*t,.9*t)}(n,2),e.runRenderLoop((function(){n.render()})),window.addEventListener("resize",(function(){e.resize()})),n}function Ot(e,t,n){var i=0,r=null;e.onPointerObservable.add((function(e,t){var o=e.event,a=.9*Math.max(-1,Math.min(1,o.wheelDelta||-o.detail||o.deltaY));(a>0&&i<14||a<0)&&(i+=a,function(e,t,n){if(n){var i=Math.abs(e.orthoLeft-e.orthoRight),r=Math.abs(e.orthoTop-e.orthoBottom),o=r/i,a=(e.orthoLeft-n.x)/i;e.orthoLeft-=a*t;var c=(e.orthoRight-n.x)/i;e.orthoRight-=c*t;var s=(e.orthoTop-n.y)/r;e.orthoTop-=s*t*o;var l=(e.orthoBottom-n.y)/r;e.orthoBottom-=l*t*o,e.panningSensibility=6250/Math.abs(i/2)}}(n,a,r))}),jt.PointerEventTypes.POINTERWHEEL),e.onPointerObservable.add((function(){r=jt.Vector3.Unproject(new jt.Vector3(e.pointerX,e.pointerY,0),t.getRenderWidth(),t.getRenderHeight(),n.getWorldMatrix(),n.getViewMatrix(),n.getProjectionMatrix())}),jt.PointerEventTypes.POINTERMOVE)}var gt=G.default.canvas.withConfig({displayName:"style__Canvas",componentId:"sc-123iew8-0"})(["outline:none;display:block;margin:0;padding:0;width:100%;","{height:calc(100vh - ","px);}","{height:calc(100vh - ","px);}touch-action:none;"],(function(e){return e.theme.breakpoints.up("sm")}),(function(e){return ue("header")(e)+ue("footer")(e)+ue("instrumentalPanel")(e)}),(function(e){return e.theme.breakpoints.down("sm")}),(function(e){return ue("headerMobile")(e)})),xt=n(38),yt=function(){function e(t,n,i,r){Object(De.a)(this,e),this._x=0,this._y=0,this._z=0,this._parameter=0,this._x=t,this._y=n,this._z=i,this._parameter=r}return Object(Be.a)(e,[{key:"x",get:function(){return this._x},set:function(e){this._x=e}},{key:"y",get:function(){return this._y},set:function(e){this._y=e}},{key:"z",get:function(){return this._z},set:function(e){this._z=e}},{key:"parameter",get:function(){return this._parameter},set:function(e){this._parameter=e}}]),e}();function vt(e){for(var t=e.length,n=125e3,i=0,r=0,o=n,a=0,c=0;;){var s=e.slice(r,o),l=Math.min.apply(Math,Object(ae.a)(s)),u=Math.max.apply(Math,Object(ae.a)(s));if(a=l<a?l:a,c=u>c?u:c,r+=n,o+=n,(i+=s.length)>=t)break}return{min:a,max:c}}function wt(e,t,n,i,r){return _t.apply(this,arguments)}function _t(){return(_t=Object(Qe.a)(Ke.a.mark((function e(t,n,i,r,o){var a,c,s,l,u;return Ke.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Ct(n,o),c=new jt.PointsCloudSystem("pcs",3,t,{updatable:!1}),s=r-i,l=function(e,t,n){var r=a[t],o=(r.parameter-i)/s*100,c=0,l=0,u=0;o<=0?(c=0,l=0,u=0):o>0&&o<=25?(c=255,l=0-10.2*(0-o),u=0):o>25&&o<=50?(c=255- -10.2*(25-o),l=255,u=0):o>50&&o<=75?(c=0,l=255,u=0-5.1*(50-o)):o>75&&o<=100?(c=0,l=255- -10.2*(75-o),u=255):o>100&&(c=0,l=0,u=0),e.position=new jt.Vector3(r.x,r.y,r.z),e.color=new jt.Color4(c/255,l/255,u/255,1)},u=a.length,c.addPoints(u,l),e.next=8,c.buildMeshAsync();case 8:return e.sent,e.abrupt("return",c);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ct(e,t){return e.filter((function(e){var n=e.x,i=e.y,r=e.z;return n>=t.filterXFromLimit&&n<=t.filterXToLimit&&i>=t.filterYFromLimit&&i<=t.filterYToLimit&&r>=t.filterZFromLimit&&r<=t.filterZToLimit}))}var kt,Tt=G.default.div.withConfig({displayName:"style__PointCloudContainer",componentId:"sc-8ynvxi-0"})(['pointerEvents:"none";position:fixed;height:100%;width:100%;left:0;top:61.5px;background:transparent;pointer-events:none;']),Pt=Object(xt.a)([k,function(e){return e.ui.sections.pointCloudSection.pointsCloudFile}],(function(e,t){return{pointCloudFilters:e,file:t}})),St=function(){var e=Object(p.c)(Pt),t=e.pointCloudFilters,n=e.file;if(n&&null!==n){var r=ot.get(Ue);r.send(ut,s.a.t("point_cloud_process")),function(e,t){var n=new FileReader;n.onload=function(){var e=Object(Qe.a)(Ke.a.mark((function e(i){var r,o,a,c,l,u,d,h,p,b,m,j,f,O,g;return Ke.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],n.result.split("\n").forEach((function(e){o.push(e.slice(0,-1))})),a=o.map((function(e){var t=e.split(";"),n=Number.parseFloat(t[0]?t[0].replace(",","."):"0"),i=Number.parseFloat(t[1]?t[1].replace(",","."):"0"),r=Number.parseFloat(t[2]?t[2].replace(",","."):"0"),o=Number(t[3]?t[3].replace(",","."):"0");return new yt(n,i,r,o)})),c=a.map((function(e){return e.parameter})),l=vt(c),u=l.max,d=l.min,h=d,p=u,b=ot.get(Symbol.for("API_PROVIDER_SERVICE")),m=b.scene.scene,(j=b.scene).pointsCloudSystem&&null!==b.scene.pointsCloudSystem&&(j.pointsCloudSystem.dispose(),j.pointsCloudSystem=null),e.next=15,wt(m,a,h,p,t);case 15:f=e.sent,O=null===(r=b.scene.pointsCloudSystem)||void 0===r?void 0:r.mesh,b.scene.pointsCloudSystem=f,g=ot.get(Ue),O===f.mesh&&O||g.send(at,{message:s.a.t("point_cloud_successfully_uploaded"),alertType:"success"});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var i=e;n.readAsText(i)}(n,t),r.send(dt,null)}return Object(i.jsx)(Tt,{})},Lt=n(150),It=n.n(Lt),Et=n(95),Nt=G.default.section.withConfig({displayName:"style__PanelContainer",componentId:"k8tkzm-0"})(["width:","px;height:","px;background:",";border-radius:5px;pointer-events:auto;visibility:",";"],(function(e){return e.width}),(function(e){return e.height}),le(K.lightGray),(function(e){return e.isActive?"visible":"hidden"})),Vt=G.default.strong.withConfig({displayName:"style__PanelHeaderContainer",componentId:"k8tkzm-1"})([""]),Rt=G.default.div.withConfig({displayName:"style__PanelHeader",componentId:"k8tkzm-2"})(["cursor:move;background:",";border-top-left-radius:5px;border-top-right-radius:5px;color:",";text-align:center;height:30px;"],le(K.darkBlue),le(K.white)),Ft=G.default.div.withConfig({displayName:"style__PanelHeaderText",componentId:"k8tkzm-3"})(["margin-left:8px;align-content:center;display:inline-block;"]),zt=Object(G.default)(Et.a).withConfig({displayName:"style__PanelHeaderTypography",componentId:"k8tkzm-4"})([""]),At=G.default.div.withConfig({displayName:"style__PanelBodyContainer",componentId:"k8tkzm-5"})(["margin:16px;"]),Mt=G.default.div.withConfig({displayName:"style__PointCloudPanelLineContainer",componentId:"ya4hb4-0"})(["margin-top:12px;"]),Dt=n(279),Bt=n(289),Gt=Object(xt.a)([k],(function(e){return{filter:e}})),Wt=Object(G.withTheme)((function(e){var t=M(),n=Object(Oe.a)().t,r=Object(p.c)(Gt).filter;return Object(i.jsxs)(At,{children:[Object(i.jsxs)(Mt,{children:[Object(i.jsx)(Dt.a,{label:n("point_cloud_x_from"),type:"number",name:"x-from",step:"0.1",value:r.filterXFromLimit,onChange:function(e){var n=e.target.value;Object(Bt.a)(n)&&t(S(n))},style:{width:100,height:20},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"}),Object(i.jsx)(Dt.a,{id:"outlined-number",label:n("point_cloud_x_to"),type:"number",name:"x-to",step:"0.1",value:r.filterXToLimit,onChange:function(e){return t(L(e.target.value))},style:{width:100,marginLeft:24},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"})]}),Object(i.jsxs)(Mt,{children:[Object(i.jsx)(Dt.a,{id:"outlined-number",label:n("point_cloud_y_from"),type:"number",name:"y-from",step:"0.1",value:r.filterYFromLimit,onChange:function(e){return t(I(e.target.value))},style:{width:100,height:20},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"}),Object(i.jsx)(Dt.a,{id:"outlined-number",label:n("point_cloud_y_to"),type:"number",name:"y-to",step:"0.1",value:r.filterYToLimit,onChange:function(e){return t(E(e.target.value))},style:{width:100,marginLeft:24},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"})]}),Object(i.jsxs)(Mt,{children:[Object(i.jsx)(Dt.a,{id:"outlined-number",label:n("point_cloud_z_from"),type:"number",name:"z-from",step:"0.1",value:r.filterZFromLimit,onChange:function(e){return t(N(e.target.value))},style:{width:100,height:20},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"}),Object(i.jsx)(Dt.a,{id:"outlined-number",label:n("point_cloud_z_to"),type:"number",name:"z-to",step:"0.1",value:r.filterZToLimit,onChange:function(e){return t(V(e.target.value))},style:{width:100,marginLeft:24},InputLabelProps:{shrink:!0},inputProps:{step:.1},variant:"standard"})]})]})})),Zt=Object(xt.a)([function(e){return e.ui.sections.pointCloudSection.isActive}],(function(e){return{isActive:e}})),Ht=Object(G.withTheme)((function(e){var t=M(),n=Object(Oe.a)().t,r=Object(p.c)(Zt);return Object(i.jsx)(It.a,{bounds:"parent",handle:"strong",defaultPosition:{x:16,y:16},children:Object(i.jsx)(Nt,{isActive:r.isActive,width:257,height:240,children:Object(i.jsxs)("section",{children:[Object(i.jsx)(Vt,{children:Object(i.jsxs)(Rt,{children:[Object(i.jsx)(Ft,{children:Object(i.jsx)(zt,{variant:"subtitle1",children:n("point_cloud_filters")})}),Object(i.jsx)(je.a,{title:n("close"),style:{float:"right"},children:Object(i.jsx)("label",{children:Object(i.jsx)(fe.a,{component:"span",size:"small",onClick:function(){return t(w())},color:"primary",children:Object(i.jsx)(Re,{})})})})]})}),Object(i.jsx)(Wt,{})]})})})})),Xt=G.default.div.withConfig({displayName:"style__PanelsContainer",componentId:"eh9t6j-0"})(["position:fixed;height:calc(100vh - ","px);background:transparent;pointer-events:none;left:0;top:81px;right:0;"],(function(e){return ue("header")(e)+ue("footer")(e)+ue("instrumentalPanel")(e)})),Yt=Object(G.withTheme)((function(e){return Object(i.jsx)(Xt,{children:Object(i.jsx)(Ht,{})})})),$t=(n(114),Object(G.withTheme)((function(e){function t(t){(function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))})()||(console.log("canvas is not supported!"),alert("canvas is not supported!"));var n=ot.get(Symbol.for("API_PROVIDER_SERVICE")).scene,i=new jt.Engine(t,!0);n.engine=i;var r=ft(i,e.theme);n.scene=r;var o=function(e,t){var n=new jt.ArcRotateCamera("Camera",0,0,-100,new jt.Vector3(1,2,-3),t);n.setPosition(new jt.Vector3(0,0,-100)),n.target=new jt.Vector3(0,0,0),n.orthoLeft=-8,n.orthoRight=8;var i=e.height/e.width;return n.orthoTop=n.orthoRight*i,n.orthoBottom=n.orthoLeft*i,n.attachControl(e,!1),n.alpha+=Math.PI,n.mode=jt.Camera.ORTHOGRAPHIC_CAMERA,n.wheelPrecision=100,n.useNaturalPinchZoom=!0,n.minZ=.01,n.maxZ=1e3,n.lowerRadiusLimit=n.radius,n.upperRadiusLimit=n.radius,n.inputs.addMouseWheel(),n.inputs.addPointers(),n}(t,r);n.camera=o;var a=function(e){var t=new jt.HemisphericLight("light",new jt.Vector3(0,1,0),e);return t.intensity=.7,t}(r);n.light=a,Ot(r,i,o)}return Object(i.jsxs)("div",{onPointerDown:function(e){return console.log(e)},children:[Object(i.jsx)(gt,{ref:function(e){void 0!=e&&e&&t(e)}}),Object(i.jsx)(St,{}),Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(Yt,{})})]})}))),Ut=G.default.div.withConfig({displayName:"style__HeaderMobilePanelContainer",componentId:"sc-15vg9o0-0"})(["background:",";height:","px;flexGrow:1;"],le(K.lightGray),ue("headerMobile")),qt=n(143),Jt=n.n(qt),Kt=n(267),Qt=n(268),en=n(284),tn=n(145),nn=n.n(tn),rn=n(270),on=n(271),an=n(272),cn=n(146),sn=n.n(cn),ln=n(273),un=n(274),dn=n(275),hn=n(276);!function(e){e[e.None=0]="None",e[e.PointCloud=1]="PointCloud"}(kt||(kt={}));var pn=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=M(),a=Object(r.useState)({subMenuIsOpen:!1}),c=Object(Ae.a)(a,2),s=c[0],l=c[1],u=s.subMenuIsOpen,d=function(){var e=ot.get(Ue);e.send(lt,{contentType:kt.PointCloud}),e.send(st,{})};return Object(i.jsxs)(o.a.Fragment,{children:[Object(i.jsxs)(on.a,{button:!0,onClick:function(){l({subMenuIsOpen:!u})},children:[Object(i.jsx)(an.a,{children:Object(i.jsx)(sn.a,{})}),Object(i.jsx)(ln.a,{primary:t("point_cloud")}),u?Object(i.jsx)(un.a,{}):Object(i.jsx)(dn.a,{})]}),Object(i.jsx)(hn.a,{in:u,timeout:"auto",unmountOnExit:!0,children:Object(i.jsxs)(rn.a,{component:"div",disablePadding:!0,children:[Object(i.jsx)(on.a,{button:!0,style:{paddingLeft:32},children:Object(i.jsxs)(r.Fragment,{children:[Object(i.jsx)("input",{color:"primary",type:"file",onChange:function(e){var t;e.preventDefault();var i=null===(t=e.target.files)||void 0===t?void 0:t[0];i&&void 0!==i&&(ot.get(Ue).send(st,{}),n(y(i)))},id:"icon-button-file",style:{display:"none"}}),Object(i.jsx)("label",{htmlFor:"icon-button-file",children:Object(i.jsx)(an.a,{children:Object(i.jsx)(ve.a,{})})}),Object(i.jsx)("label",{htmlFor:"icon-button-file",children:Object(i.jsx)(ln.a,{primary:t("load_file_with_point_cloud")})})]})}),Object(i.jsxs)(on.a,{button:!0,style:{paddingLeft:32},children:[Object(i.jsx)(an.a,{onClick:d,children:Object(i.jsx)(_e.a,{})}),Object(i.jsx)(ln.a,{onClick:d,primary:t("open_panel_point_cloud_filters")})]})]})})]})})),bn=G.default.section.withConfig({displayName:"style__DrawerContainer",componentId:"sc-1gp9wxq-0"})(["width:250px;"]),mn=G.default.div.withConfig({displayName:"style__DrawerHeader",componentId:"sc-1gp9wxq-1"})(["display:flex;justify-content:flex-end;align-items:center;padding:",";","{height:104px;}","{height:56px;}"],(function(e){return e.theme.spacing(0,1)}),(function(e){return e.theme.breakpoints.up("sm")}),(function(e){return e.theme.breakpoints.down("sm")})),jn=Object(G.default)(Et.a).withConfig({displayName:"style__DrawerHeaderTitle",componentId:"sc-1gp9wxq-2"})(["color:",";margin-right:auto;margin-left:16px;"],le(K.darkBlue)),fn=function(e){var t=Object(Oe.a)().t,n=e.isDark;return Object(i.jsxs)("div",{style:{color:n?"black":"white"},children:["     ",t("version"),": ",ot.get(qe).GetVersion()]})},On=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=Object(r.useState)({isOpen:!1}),o=Object(Ae.a)(n,2),a=o[0],c=o[1],s=a.isOpen;Object(r.useEffect)((function(){c({isOpen:e.isOpen})}),[e.isOpen]);var l=function(){ot.get(Ue).send(st,{})};return Object(i.jsx)(en.a,{anchor:"left",open:s,onClose:l,children:Object(i.jsxs)(bn,{children:[Object(i.jsxs)(mn,{children:[Object(i.jsx)(jn,{variant:"h5",children:t("aeroset")}),Object(i.jsx)(je.a,{title:t("close"),children:Object(i.jsx)(fe.a,{onClick:l,children:Object(i.jsx)(nn.a,{onClick:l})})})]}),Object(i.jsx)(Se.a,{}),Object(i.jsx)(rn.a,{component:"nav","aria-labelledby":"nested-list-subheader",style:{width:"100%"},children:Object(i.jsx)(pn,{})}),Object(i.jsx)("div",{style:{position:"absolute",bottom:8,left:8},children:Object(i.jsx)(fn,{isDark:!0})})]})})})),gn=G.default.section.withConfig({displayName:"style__DrawerBottomContainer",componentId:"sc-6kgsav-0"})(["height:270px;align-content:center;"]),xn=G.default.div.withConfig({displayName:"style__DrawerBottomHeader",componentId:"sc-6kgsav-1"})(["display:flex;vertical-align:center;justify-content:flex-end;align-items:center;padding:",";"],(function(e){return e.theme.spacing(0,1)})),yn=G.default.div.withConfig({displayName:"style__MobilePanelContainer",componentId:"sc-6kgsav-2"})(["visibility:",";"],(function(e){return e.currentType&&e.stateType&&e.currentType.valueOf()===e.stateType.valueOf()?"visible":"collapse"})),vn=n(147),wn=n.n(vn),_n=G.default.div.withConfig({displayName:"style__PointCloudPanelMobileContainer",componentId:"sc-1mg0wh4-0"})(["width:100%;display:flex;justify-content:center"]),Cn=Object(G.withTheme)((function(e){return Object(i.jsx)(_n,{children:Object(i.jsx)(Wt,{})})})),kn=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=Object(r.useState)({isOpen:!1,visiblePanel:kt}),o=Object(Ae.a)(n,2),a=o[0],c=o[1],s=a.isOpen,l=a.visiblePanel;Object(r.useEffect)((function(){var e=ot.get(Ue);return e.subscribe(lt,u),function(){e.unsubscribe(lt,u)}}),[]);var u=function(e){var t=e[0];c({visiblePanel:t.contentType,isOpen:!0})},d=function(){c(Object($.a)(Object($.a)({},a),{},{isOpen:!1}))};return Object(i.jsx)(en.a,{anchor:"bottom",open:s,onClose:d,children:Object(i.jsxs)(gn,{children:[Object(i.jsxs)(xn,{children:[Object(i.jsx)("div",{style:{marginRight:"auto"},children:Object(i.jsx)(Et.a,{variant:"h6",children:Object(i.jsx)(yn,{currentType:kt.PointCloud,stateType:l,children:t("point_cloud_filters")})})}),Object(i.jsx)(je.a,{title:t("close"),children:Object(i.jsx)(fe.a,{onClick:d,children:Object(i.jsx)(wn.a,{onClick:d})})})]}),Object(i.jsx)(Ee,{}),Object(i.jsx)(yn,{currentType:kt.PointCloud,stateType:l,children:Object(i.jsx)(Cn,{})})]})})})),Tn=n(144),Pn=n.n(Tn),Sn=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=Object(r.useState)({drawerIsOpen:!1}),o=Object(Ae.a)(n,2),a=o[0],c=o[1];Object(r.useEffect)((function(){var t=ot.get(Ue);return t.subscribe(st,s),c({isOpen:e.isOpen}),function(){t.unsubscribe(st,s)}}),[e.isOpen]);var s=function(e){c({drawerIsOpen:!1})};return Object(i.jsxs)(Ut,{children:[Object(i.jsx)(Kt.a,{position:"fixed",children:Object(i.jsxs)(Qt.a,{style:{background:e.theme.app.colors.main.mediumGray},children:[Object(i.jsx)(je.a,{title:t("menu"),children:Object(i.jsx)(fe.a,{size:"medium",color:"primary","aria-label":"open drawer",style:{verticalAlign:"middle"},onClick:function(){c({drawerIsOpen:!0})},children:Object(i.jsx)(Jt.a,{style:{color:"white",fontSize:35}})})}),Object(i.jsx)(Et.a,{variant:"h6",style:{display:"block",flexGrow:1,marginLeft:16},children:"'Scheme name'"}),Object(i.jsx)(je.a,{title:t("actions"),children:Object(i.jsx)(fe.a,{size:"small",color:"primary",style:{marginLeft:10},children:Object(i.jsx)(Pn.a,{style:{color:"white",fontSize:35}})})}),Object(i.jsx)(je.a,{title:t("user_account"),children:Object(i.jsx)(fe.a,{size:"small",color:"primary",style:{marginLeft:10},children:Object(i.jsx)(me.a,{style:{color:"white",fontSize:35}})})})]})}),Object(i.jsx)(On,{isOpen:a.drawerIsOpen}),Object(i.jsx)(kn,{})]})})),Ln=n(286),In=n(282),En=G.default.div.withConfig({displayName:"style__SnackbarWrapper",componentId:"sc-1522knk-0"})(["width:100%;height:100%;"]),Nn=n(262),Vn=Object(G.withTheme)((function(e){var t=Object(Oe.a)().t,n=Object(r.useState)({open:!1,alertType:"success",message:"",isVersionSnackbar:!1}),o=Object(Ae.a)(n,2),a=o[0],c=o[1];Object(r.useEffect)((function(){var e=ot.get(Ue);return e.subscribe(at,s),e.subscribe(ct,l),function(){e.unsubscribe(at,s),e.unsubscribe(ct,l)}}),[]);var s=function(e){var t=e[0],n=t.message,i=t.alertType,r=t.callback;c(Object($.a)(Object($.a)({},a),{},{open:!0,message:n,alertType:i,callback:r}))},l=function(e){var t=e[0],n=t.message,i=t.alertType,r=t.callback;c({open:!0,message:n,alertType:i,callback:r,isVersionSnackbar:!0})},u=a.open,d=a.message,h=(a.callback,a.alertType),p=a.isVersionSnackbar,b=Object(i.jsx)(Nn.a,{color:"primary",size:"small",onClick:function(){return location.reload(),!1},children:t("update")});return Object(i.jsxs)(En,{children:[Object(i.jsx)(Ln.a,{style:{position:"absolute",alignContent:"center"},anchorOrigin:{vertical:"bottom",horizontal:"right"},open:u,onClose:function(e,t){"timeout"===t&&c(Object($.a)(Object($.a)({},a),{},{open:!1}))},autoHideDuration:p?null:5e3,children:Object(i.jsx)(In.a,{onClose:function(){c(Object($.a)(Object($.a)({},a),{},{open:!1}))},severity:h,style:{verticalAlign:"middle"},closeText:t("close"),action:p?b:null,children:d})}),Object(i.jsx)("div",{children:e.children})]})})),Rn=Object(G.withTheme)((function(e){return Object(i.jsxs)(Vn,{children:[Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)("div",{style:{position:"absolute",left:8,top:8},children:Object(i.jsx)(fn,{})})}),Object(i.jsxs)(pe.a,{container:!0,spacing:0,alignItems:"stretch",direction:"column",children:[Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(xe,{})})}),Object(i.jsx)(he.a,{mdUp:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(Sn,{})})}),Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(Ne,{})}),Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(Fe,{})})}),Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(Ne,{})})}),Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(de,{children:Object(i.jsx)($t,{})})}),Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(Ne,{})})}),Object(i.jsx)(he.a,{smDown:!0,children:Object(i.jsx)(pe.a,{item:!0,xs:12,children:Object(i.jsx)(mt,{})})})]})]})})),Fn=n(257),zn=n(128),An=n.n(zn);function Mn(e,t){t._;var n=ot.get(Ue),i={message:s.a.t("new_version"),alertType:"info"};n.send("SHOW_NEW_VERSION_EVENT",i)}c.a.render(Object(i.jsx)(p.a,{store:A,children:Object(i.jsx)(D.a,{children:Object(i.jsxs)(o.a.StrictMode,{children:[Object(i.jsx)(H,{}),Object(i.jsx)(Fn.a,{}),Object(i.jsx)(ee,{children:Object(i.jsx)(r.Suspense,{fallback:"",children:Object(i.jsx)(Rn,{})})})]})})}),document.getElementById("root")),window.onerror=function(e,t,n){return!1},function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/custom-sw.js");console.log(t),d?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):h(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):h(t,e)}))}}({onUpdate:function(e){return console.log("New Version"),An()(e,{render:Mn})}})}},[[212,1,2]]]);
//# sourceMappingURL=main.5559e4f0.chunk.js.map