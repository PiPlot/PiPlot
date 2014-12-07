FROM resin/rpi-nodejs

ADD . /app

# Install Python.
RUN apt-get update && apt-get install -y git ghostscript inkscape pstoedit python
RUN git clone -b resin https://github.com/kynan/graphtecprint

# Install miso font
RUN mkdir /usr/share/fonts/truetype/miso
RUN cp -a /app/src/fonts/miso-skinny.otf /usr/share/fonts/truetype/miso
RUN fc-cache -f -v

# Run udevd to detect printer
RUN udevd > udev.log 2&>1 &

# Set the path for graphtecprint
ENV PATH /graphtecprint:${PATH}
