FROM resin/rpi-raspbian:wheezy

# Install Python.
RUN apt-get update && apt-get install -y git ghostscript inkscape pstoedit python python-gtk2 python-glade2 python-cairo
RUN git clone https://github.com/kynan/graphtecprint

RUN udevd > udev.log 2&>1 &
RUN echo /bin/bash > /start
RUN chmod +x /start
