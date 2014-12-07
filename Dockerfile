FROM resin/rpi-raspbian:wheezy

ADD . /app

# Install Python.
RUN apt-get update && apt-get install -y git ghostscript inkscape pstoedit python
RUN git clone -b resin https://github.com/kynan/graphtecprint

RUN udevd > udev.log 2&>1 &
RUN echo node /app/server.js > /start
RUN chmod +x /start
