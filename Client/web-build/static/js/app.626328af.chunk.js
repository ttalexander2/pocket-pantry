(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{302:function(e,t,n){"use strict";n.d(t,"a",(function(){return Y}));n(243);var r=n(0),c=n.n(r),a=n(9),l=n.n(a),o=n(11),i=n.n(o),u=n(10),s=n.n(u),f=n(12),m=n.n(f),p=n(5),h=n.n(p),d=n(17),y=function(e){return r.createElement(d.g,null,r.createElement(d.c,{leftComponent:{text:"Pocket Pantry",style:{color:"#fff"}},centerComponent:{text:e.name,style:{color:"#fff"}}}))};function E(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var v=[{name:"sushi",date:"xx/xx"},{name:"nigiri",date:"xx/xx"},{name:"ramen",date:"xx/xx"},{name:"tempura",date:"xx/xx"}],g=[{name:"sushi"},{name:"ramen"}],R=[{name:"sushi"}],b=function(e){s()(n,e);var t=E(n);function n(){return l()(this,n),t.apply(this,arguments)}return i()(n,[{key:"render",value:function(){return r.createElement(d.g,null,r.createElement(y,{name:"Dashboard"}),r.createElement(d.f,{h1:!0},"Hello, World!"),r.createElement(d.b,null,r.createElement(d.b.Title,null,"Food to be Expired This Week"),r.createElement(d.b.Divider,null),v.map((function(e){return r.createElement(d.f,null,"- ",e.date,": ",e.name)}))),r.createElement(d.b,null,r.createElement(d.b.Title,null,"Food Favorites"),r.createElement(d.b.Divider,null),g.map((function(e){return r.createElement(d.f,null,"- ",e.name)}))),r.createElement(d.b,null,r.createElement(d.b.Title,null,"Your Recommended Recipe of the Day"),r.createElement(d.b.Divider,null),R.map((function(e){return r.createElement(d.f,null," ",e.name)}))))}}]),n}(r.Component),x=n(23);function C(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var S=function(e){s()(n,e);var t=C(n);function n(){return l()(this,n),t.apply(this,arguments)}return i()(n,[{key:"render",value:function(){return r.createElement(d.g,null,r.createElement(d.e,{placeholder:"Food Name"}))}}]),n}(r.Component);function D(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var w=[{name:"Rice",subtitle:"120 Grains"},{name:"Pasta",subtitle:"232 Shells"}],P=function(e){s()(n,e);var t=D(n);function n(){var e;l()(this,n);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).state={formVisible:!1},e}return i()(n,[{key:"render",value:function(){var e=this;return r.createElement(d.g,{style:{flex:1,flexDirection:"row"}},r.createElement(y,{name:"Pantry"}),r.createElement(d.b,{style:{width:"45%"}},r.createElement(d.b.Title,null,"Food Items That You Have"),r.createElement(d.b.Divider,null),w.map((function(e){return r.createElement(x.a,null,"- ",e.name,": ",e.subtitle)}))),r.createElement(d.a,{title:"Add an Item",onPress:function(){e.setState({formVisible:!e.state.formVisible})}}),this.state.formVisible&&r.createElement(S,null))}}]),n}(r.Component);function O(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var k=function(e){s()(n,e);var t=O(n);function n(){return l()(this,n),t.apply(this,arguments)}return i()(n,[{key:"render",value:function(){return r.createElement(d.g,null,r.createElement(y,{name:"Calendar"}))}}]),n}(r.Component),T=n(3),J=n(54),I=n(298),N=n(2),A=n(53);function F(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var L=function(e){s()(n,e);var t=F(n);function n(){var e;l()(this,n);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).state={recipeResults:{results:[]},recipeContent:{},queryStr:"",selected:null,data:["SELECTED","NOT SELECTED"]},e.renderJson=function(){return[]},e}return i()(n,[{key:"render",value:function(){var e=this;return r.createElement(d.g,null,r.createElement(y,{name:"Cookbook"}),r.createElement(T.a,null,r.createElement(d.e,{placeholder:"Ingredient",onChangeText:function(t){e.setState({queryStr:t})}}),r.createElement(d.a,{title:"Search",onPress:function(){e.getJson()}})),r.createElement(T.a,{style:H.fixed},null!=this.state.selected&&r.createElement(d.b,{style:{width:"50%"}},r.createElement(d.b.Title,null,this.state.selected.trim()),r.createElement(d.b.Divider,null),r.createElement(d.f,null,this.state.recipeContent.hasOwnProperty("title")?r.createElement(T.a,null,this.state.recipeContent.hasOwnProperty("image")&&r.createElement(d.d,{source:{uri:this.state.recipeContent.image},style:{width:200,height:200},PlaceholderContent:r.createElement(A.a,null)}),r.createElement(d.f,{h4:!0},this.state.recipeContent.hasOwnProperty("yield")&&this.state.recipeContent.yield),r.createElement(d.f,{h3:!0},"Ingredients"),r.createElement(T.a,null,this.state.recipeContent.hasOwnProperty("ingredients")&&this.state.recipeContent.ingredients.map((function(e){return r.createElement(d.f,null,"- ",e)}))),r.createElement(d.f,{h3:!0},"Instructions"),r.createElement(d.f,null,this.state.recipeContent.hasOwnProperty("instructions")&&this.state.recipeContent.instructions)):JSON.stringify(this.state.recipeContent)))),r.createElement(J.a,null,r.createElement(T.a,{style:H.container},r.createElement(T.a,{style:H.item},this.state.recipeResults.results.map((function(t){return r.createElement(d.b,null,r.createElement(d.b.Title,null,t.title.trim()),r.createElement(d.b.Divider,null),r.createElement(d.d,{resizeMode:"cover",source:{uri:t.thumbnail}}),r.createElement(d.f,null,"Ingredients: ",t.ingredients),r.createElement(d.f,{style:{color:"blue"},onPress:function(){return I.a.openURL(t.href)}},t.href),r.createElement(d.a,{title:"Open",onPress:function(){e.setState({selected:t.title}),e.scrapeRecipe(t.href)}}))}))))))}},{key:"getJson",value:function(){var e=this,t={ingredients:this.state.queryStr.split(", ")},n=new Headers;n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*");var r=JSON.stringify(t);fetch("http://localhost:42069/api/recipes",{method:"POST",headers:n,body:r,redirect:"follow"}).then((function(e){return e.text()})).then((function(t){return e.setState({recipeResults:JSON.parse(t)})})).catch((function(e){return console.log("error",e)}))}},{key:"scrapeRecipe",value:function(e){var t=this,n=new Headers;n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*");var r=JSON.stringify({url:e});fetch("http://localhost:42069/api/recipes/scrape",{method:"POST",headers:n,body:r,redirect:"follow"}).then((function(e){return e.text()})).then((function(e){try{t.setState({recipeContent:JSON.parse(e)})}catch(n){t.setState({recipeContent:e})}})).catch((function(e){return console.log("error",e)}))}}]),n}(r.Component),H=N.a.create({container:{flex:1,flexDirection:"row",flexWrap:"wrap",paddingBottom:10,alignItems:"flex-start"},item:{left:"50%",width:"50%"},fixed:{position:"absolute",left:0,top:139,display:"flex",alignItems:"stretch",width:"50%",height:"100%"}});function V(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var c=h()(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return m()(this,n)}}var j=function(e){s()(n,e);var t=V(n);function n(){return l()(this,n),t.apply(this,arguments)}return i()(n,[{key:"render",value:function(){return r.createElement(d.g,null,r.createElement(y,{name:"Grocery List"}))}}]),n}(r.Component),q=n(245),G=n(454),W=Object(G.a)();function Y(){return c.a.createElement(q.a,null,c.a.createElement(W.Navigator,null,c.a.createElement(W.Screen,{name:"Dashboard",component:b}),c.a.createElement(W.Screen,{name:"Pantry",component:P}),c.a.createElement(W.Screen,{name:"Calendar",component:k}),c.a.createElement(W.Screen,{name:"Cookbook",component:L}),c.a.createElement(W.Screen,{name:"Grocery List",component:j})))}},308:function(e,t,n){e.exports=n(450)}},[[308,1,2]]]);
//# sourceMappingURL=app.626328af.chunk.js.map