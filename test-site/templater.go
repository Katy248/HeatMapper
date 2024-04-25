package main

import (
	"flag"
	"fmt"
	"html/template"
)

type Config struct {
	file string
}

func main() {
	tmpl, err := template.ParseFiles("layout.html")
}
