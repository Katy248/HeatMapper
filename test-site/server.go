package main

import (
	// "log"
	"net/http"

	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	router := gin.Default()

	/* corsConfig := cors.Config{
		AllowMethods: []string{"POST", "GET"},
		// AllowHeaders:     []string{"*"},
		// ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		// MaxAge: 12 * time.Hour,
	} */

	router.Use(CORSMiddleware())

	router.StaticFS("/", http.Dir("out"))

	router.Run(":1488")

	/* http.Handle("/", http.FileServer(http.Dir("./out")))
	http.HandleFunc("/test", CORS(staticFileHandler))
	log.Println("Starting server at port 1488")
	if err := http.ListenAndServe(":1488", nil); err != nil {
		log.Fatal(err)
	} */
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
