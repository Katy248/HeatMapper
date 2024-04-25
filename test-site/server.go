package main

import (
	"log"
	"net/http"
)

func staticFileHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/test" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// log.Println(w, "Hello!")
}

func main() {
	log.Println("Init")
	http.Handle("/", http.FileServer(http.Dir("./out")))
	http.HandleFunc("/test", staticFileHandler)
	log.Println("Starting server at port 1488")
	if err := http.ListenAndServe(":1488", nil); err != nil {
		log.Fatal(err)
	}
}
