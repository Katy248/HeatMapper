OUTPUT_DIR := out/
SOURCE_DIR := src/
SOURCES := $(wildcard $(SOURCE_DIR)/*)
all:

build: $(OUTPUT_DIR)/index.html $(OUTPUT_DIR)/mapper.js $(OUTPUT_DIR)/style.css
	
run: build
	go get .
	go run server.go
run-ws: build
	npx ws --cors.origin "*" --cors.allow-methods "*" --log.format dev

clear:
	rm -rf $(OUTPUT_DIR)

$(OUTPUT_DIR)/mapper.js: ../client/mapper.js $(OUTPUT_DIR)
	cp $< $@

$(OUTPUT_DIR)/index.html: $(SOURCE_DIR)/index.html $(OUTPUT_DIR)
	cp $< $@

$(OUTPUT_DIR)/style.css: $(SOURCE_DIR)/style.css $(SOURCE_DIR)/index.html $(OUTPUT_DIR)
	npx tailwindcss -i $< -o $@ --minify

$(OUTPUT_DIR):
	mkdir $@
