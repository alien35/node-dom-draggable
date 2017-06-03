# Node DOM Draggable
Simple library to allow dragging elements across the DOM. Ideal for cases you don't want to add Jquery UI or other such big libaries to your Node.js project.



Example usage
----

    const nDD = require('./../../dom-node-draggable/index');

    ndd('.track-block', {
                allowX: true,
                allowY: true,
                onStart: function(ev, el) {
                    console.log('start')
                },
                onDrag: function(ev, el) {
                    console.log('on drag')
                },
                onStop: function(event, element) {
                    console.log('stop')
                    })
                }
            });



License
----

ISC

Author
----

Alexander Leon

TODO
----

Allow multiple elements to be targeted at once. Will definitely get to this when the time is right. (Am using it for a personal project that will eventually need multiple targeting.)