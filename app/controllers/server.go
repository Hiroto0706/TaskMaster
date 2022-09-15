package controllers

import (
	"fmt"
	"html/template"
	"main/app/models"
	"main/config"
	"net/http"
	"regexp"
	"strconv"
)

func generateHTML(w http.ResponseWriter, data interface{}, filenames ...string) {
	var files []string
	for _, file := range filenames {
		files = append(files, fmt.Sprintf("app/views/templates/%s.html", file))
	}

	templates := template.Must(template.ParseFiles(files...))
	templates.ExecuteTemplate(w, "layout", data)
}

func session(w http.ResponseWriter, r *http.Request) (sess models.Session, err error) {
	cookie, err := r.Cookie("_cookie")
	if err == nil {
		sess = models.Session{UUID: cookie.Value}
		if ok, _ := sess.CheckSession(); !ok {
			err = fmt.Errorf("Invalid session")
		}
	}
	return sess, err
}

var validPath = regexp.MustCompile("^/index/(delete|update|mypage|stop)/([0-9]+)$")

func parseURL(fn func(http.ResponseWriter, *http.Request, int)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		q := validPath.FindStringSubmatch(r.URL.Path)
		if q == nil {
			http.NotFound(w, r)
			return
		}

		qi, err := strconv.Atoi(q[2])
		if err != nil {
			http.NotFound(w, r)
			return
		}

		fn(w, r, qi)
	}
}

func StartMainServer() error {
	files := http.FileServer(http.Dir(config.Config.Static))
	http.Handle("/static/", http.StripPrefix("/static/", files))

	http.HandleFunc("/", top)
	http.HandleFunc("/signup", signup)
	http.HandleFunc("/signin", signin)
	http.HandleFunc("/authenticate", authenticate)
	http.HandleFunc("/logout", logout)

	http.HandleFunc("/index", index)
	http.HandleFunc("/index/mypage/", parseURL(mypage))
	http.HandleFunc("/index/create", create)
	http.HandleFunc("/index/stop/", parseURL(stop))
	http.HandleFunc("/index/delete/", parseURL(delete))
	http.HandleFunc("/index/update/", parseURL(update))
	http.HandleFunc("/index/create-category", createCategory)

	http.HandleFunc("/calender", calender)
	http.HandleFunc("/timeline", timeline)
	return http.ListenAndServe(":"+config.Config.Port, nil)
}
