jquery.sinebob
==============

jquery.sinebob.js: A Simple jQuery Plugin for Creating Easy Sine/Cosine Effects

Ever notice that, even with jQuery’s Easing plugin and CSS3 transforms, it’s not really easy to make sine effects in your front end projects? Being a game designer, I’m a sucker for sine, so this has been bothering me for awhile. Sooo… I finally decided to do something about it. This is an extremely simple jQuery plugin that allows you to add bobbing effects (horizontal or vertical), sine fades, sine scaling, sine rotating, and rotoscaling. Example usage is as follows:

Default vertical bobbing effect:
$("div").sinebob();

More options:
$("div").sinebob({direction:”left”,offset:60,length:120,interval:10});

Alternate bobbing effect (a simpler implementation with better timing control but less accuracy):
$("div").sinebob({mode:”simple”,ticks:3});

Sine Fading:
$("div").sinebob({mode:”fade”});

Scaling:
$("div").sinebob({mode:"scale",offset:10,length:1});

Rotation:
$("div").sinebob({mode:"rotate",offset:0,length:10});

Rotoscaling (both rotation and scale):
$("div").sinebob({mode:"rotoscale",offset:2,length:10,s_offset:10, s_length:2});

NEW! Text sinewave scroller (beta):
$("div").sinebob({mode:"text",length:10,increment:0.1,speed:15});
