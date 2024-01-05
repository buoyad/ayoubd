.PHONY: all build

build: chat.ts socket.ts
	@echo "Copying protocol definitions..."
	@mkdir -p ../site/src/protocol && cp chat.ts socket.ts ../site/src/protocol
	@mkdir -p ../api/src/protocol && cp chat.ts socket.ts ../api/src/protocol

clean:
	@echo "Cleaning protocol definitions..."
	@rm -rf ../site/src/protocol
	@rm -rf ../api/src/protocol

all: build