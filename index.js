"use strict";

/**
 * @name DomNodeDraggable
 * @function
 * @param {String} selector The element query selector.
 * @param {Object} options An object containing:
 *
 *  - `onStart` (Function): Function to run on drag start.
 *  - `onStop` (Function): Function to run on drag stop.
 *  - `onDrag` (Function): Function to run on drag move.
 *  - `allowX` (Boolean): Allows dragging along on the X axis.
 *  - `allowY` (Boolean): Allows dragging along on the Y axis.
 */
var DomNodeDraggable = function DomNodeDraggable(selector, options) {

    options = Object(options);

    // Handlers
    options.onStart = options.onStart || function () {};
    options.onStop = options.onStop || function () {};
    options.onDrag = options.onDrag || function () {};

    var elemBeingDragged;

    var allElms = document.querySelectorAll(selector);
    for (var i = 0; i < allElms.length; ++i) {
        (function (elem) {

            // create an instance of the object for this dom element
            elem._domNodeDraggable = {
                drag: false
            };

            // listen for mousedown
            elem.addEventListener("mousedown", function (e) {

                // set true for drag field
                elem._domNodeDraggable.drag = true;

                // set the mouse position on the page
                elem._domNodeDraggable.mousePos = {
                    x: e.clientX,
                    y: e.clientY
                };

                // set the element position
                elem._domNodeDraggable.elPos = {
                    x: elem.offsetLeft,
                    y: elem.offsetTop
                };

                // call start handler
                options.onStart.call(this, e, elem);
                elemBeingDragged = elem;
            });

            // listen for mouse up
            elem.addEventListener("mouseup", function (e) {

                // drag: false
                elem._domNodeDraggable.drag = false;
                elemBeingDragged = null;

                // call stop handler
                options.onStop.call(this, e, elem);
            });

            // listen for mouse move
            document.addEventListener("mousemove", function (e) {
                if (elemBeingDragged) {
                    // if drag is NOT true, return
                    if (!elemBeingDragged._domNodeDraggable.drag) {
                        return;
                    }

                    // if drag handler returns false, don't do anything
                    if (options.onDrag.call(this, e, elemBeingDragged) === false) {
                        return;
                    }

                    var positionX = elemBeingDragged._domNodeDraggable.elPos.x + e.clientX - elemBeingDragged._domNodeDraggable.mousePos.x;
                    if (options.allowX && positionX >= 0) {
                        if ((options.minX || options.minX === 0) && positionX >= options.minX) {
                            elemBeingDragged.style.left = positionX + 'px';
                        } else {
                            elemBeingDragged.style.left = positionX + 'px';
                        }
                    }

                    if (options.allowY) {
                        elemBeingDragged.style.top = elemBeingDragged._domNodeDraggable.elPos.y + e.clientY - elemBeingDragged._domNodeDraggable.mousePos.y + "px";
                    }
                }

            });
        })(allElms[i]);
    }
};

module.exports = DomNodeDraggable;