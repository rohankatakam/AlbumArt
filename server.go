package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/{artist}/{album}", gng)
	// Where ORIGIN_ALLOWED is like `scheme://dns[:port]`, or `*` (insecure)
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	// start server listen
	// with error handling
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func gng(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.Header().Set("Content-Type", "application/json")
	var buffer bytes.Buffer
	albumData, err := getAlbum(vars["artist"], vars["album"])
	if err != nil {
		buffer.WriteString(albumData)
		json.NewEncoder(w).Encode("Bad Request")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	buffer.WriteString(albumData)
	json.NewEncoder(w).Encode(buffer.String())
	w.WriteHeader(http.StatusOK)

	return
}
