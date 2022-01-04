package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
)

func getAlbum(artist string, album string) (string, error) {
	if artist == "" || album == "" {
		return "", errors.New("blank input")
	}

	// Make HTTP GET request
	builtUrl := "https://genius.com/albums/" + (artist) + "/" + (album)
	html, err := getHTML(builtUrl)
	if err != nil {
		return "", errors.New(err.Error())
	}
	img := getImgUrl(html)
	return img, nil
}

// if your img's are properly formed with doublequotes then use this, it's more efficient.
// var imgRE = regexp.MustCompile(`<img[^>]+\bsrc="([^"]+)"`)
func getImgUrl(htm string) string {
	imgRE := regexp.MustCompile(`<img[^>]+\bsrc=["']([^"']+)["']`)
	imgs := imgRE.FindStringSubmatch(htm)
	return "https://images.genius.com/" + imgs[1][71:]
}

// Codes artist and album for URL
/*
func code(artistAlbum string) string {
	re := regexp.MustCompile(`[^a-zA-Z0-9]+`)
	s := re.ReplaceAllString(artistAlbum, "-")
	s = strings.ReplaceAll(s, " ", "-")
	return s
}
*/

func getHTML(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("GET error: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("Status error: %v", resp.StatusCode)
	}

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("Read body: %v", err)
	}

	return string(data), nil
}
