PiPlot - plot stuff using a Raspberry Pi
========================================

![Raspberry Pi](src/img/logo.svg)

> Raspery Pi powered gift tag plotting mechanism

Built by [Mark Durrant](https://github.com/markdurrant) ([@M6_D6]) and
[Florian Rathgeber](https://github.com/kynan) ([@frathgeber]) for
the [Christmas IoT hackathon] run by [resion.io](https://resin.io) at
[Fablab London].

[@M6_D6]: https://twitter.com/M6_D6
[@frathgeber]: https://twitter.com/frathgeber
[Christmas IoT hackathon]: http://fablablondon.org/events/xmas-iot-hackathon-with-resin-io/
[Fablab London]: http://fablablondon.org

Getting started
---------------

Install [node](http://nodejs.org/) & [gulp](http://gulpjs.com/)

    brew install node
    npm install -g gulp

Install packages:

    npm i

Build the CSS from scss sources:

    gulp sass

Run Gulp for a local dev server with livereload for the frontend:

    gulp

Or run the backend express server:

    npm start
