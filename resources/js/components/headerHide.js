// Options
var options = {
    offset: {
        up: 10,
        down: 150
    },
    tolerance : {
        up : 10,
        down : 3
    }
};

import Headroom from "headroom.js";
const header = document.querySelector('[data-header]');
var headroom = new Headroom(header, options);
headroom.init();