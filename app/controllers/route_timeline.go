package controllers

import "net/http"

func timeline(w http.ResponseWriter, r *http.Request) {
	_, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	}else {
		generateHTML(w, nil, "layout", "timeline", "mypage_btn_public", "lists_public")
	}
}