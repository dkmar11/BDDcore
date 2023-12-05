FROM alpine:3.18
WORKDIR /test
COPY . .
RUN ["sh", "node.bash"]
