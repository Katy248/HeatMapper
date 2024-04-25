OUTPUT_DIR := out/
all:

build: $(OUTPUT_DIR) $(OUTPUT_DIR)/style.css
	cp index.html $(OUTPUT_DIR)/index.html

run: 
	go run server.go

clear:
	rm -rf $(OUTPUT_DIR)

$(OUTPUT_DIR)/style.css: css/style.css index.html 
	npx tailwindcss -i $< -o $@ --minify

$(OUTPUT_DIR):
	mkdir $@
