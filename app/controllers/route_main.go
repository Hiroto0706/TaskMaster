package controllers

import (
	"fmt"
	"log"
	"main/app/models"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// const layout = "2022-09-01 12:00:00.000000+09:00"

func top(w http.ResponseWriter, r *http.Request) {
	_, err := session(w, r)
	if err != nil {
		generateHTML(w, nil, "layout", "top", "mypage_btn", "lists")
	} else {
		http.Redirect(w, r, "/index", 302)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	sess, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		user, _ := sess.GetUserBySession()
		task, _ := user.GetTaskByStatusTrue()

		var category models.Category
		if task.CategoryID != 0 {
			category, err = models.GetCategory(task.CategoryID)
			if err != nil {
				log.Println(err)
			}
		}

		tasks, err := user.GetTasksByUser()
		if err != nil {
			log.Println(err)
		}

		for i, _ := range tasks {
			category, _ := models.GetCategory(tasks[i].CategoryID)
			tasks[i].Category = category
		}

		var dates []string
		var duration models.Duration
		for i, _ := range tasks {
			date := fmt.Sprintf("%d/%d/%d", tasks[i].StartTime.Year(), int(tasks[i].StartTime.Month()), tasks[i].StartTime.Day())

			result := models.Include(dates, date)

			if duration.Date != date && result == false {
				dates = append(dates, date)
				duration.Date = date
			}
		}

		var durations []models.Duration
		for i, _ := range dates {
			var duration models.Duration
			duration.Date = dates[i]

			var sum float64
			for j := 0; j < len(tasks); j++ {
				targetDate := models.GetTargetDate(tasks[j].StartTime)

				if targetDate == duration.Date {
					duration.Tasks = append(duration.Tasks, tasks[j])

					sum += tasks[j].SubTime.Minutes()
				}
			}

			hour := fmt.Sprintf("%d", int(sum)/60)

			if (int(sum) % 60) < 10 {
				min := fmt.Sprintf("0%d", (int(sum) % 60))
				duration.Sum = fmt.Sprintf("%s h %s min", hour, min)
			} else {
				min := fmt.Sprintf("%d", int(sum)%60)
				duration.Sum = fmt.Sprintf("%s h %s min", hour, min)
			}

			durations = append(durations, duration)
		}

		categories, err := user.GetCategoriesByUserID()
		if err != nil {
			log.Println(err)
		}

		var tasksForSearch []models.Task
		for _, task := range tasks {
			if len(tasksForSearch) >= 15 {
				break
			} else {
				title := task.Title
				category, _ := models.GetCategory(task.CategoryID)

				if len(tasksForSearch) == 0 {
					tasksForSearch = append(tasksForSearch, task)
				} else {
					var flag = false
					for _, target := range tasksForSearch {
						targetCategory, _ := models.GetCategory(target.CategoryID)

						if title == target.Title && targetCategory.Name == category.Name {
							flag = true
							break
						}
					}

					if flag == false {
						tasksForSearch = append(tasksForSearch, task)
					}
				}
			}
		}

		colors, _ := models.GetColors()

		task.Tasks = tasksForSearch
		task.Categories = categories
		task.User = user
		task.UserID = user.ID
		task.Durations = durations
		task.Category = category
		task.Colors = colors

		generateHTML(w, task, "layout", "index", "mypage_btn_public", "lists_public")
	}
}

func create(w http.ResponseWriter, r *http.Request) {
	sess, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		user, err := sess.GetUserBySession()
		if err != nil {
			log.Println(err)
		}

		task := models.Task{
			Title:     r.PostFormValue("task"),
			StartTime: time.Now(),
		}

		category := models.Category{
			Name: r.PostFormValue("category"),
		}

		valid, _ := models.CheckCategory(user.ID, category.Name)

		if valid == false {
			err = models.CreateCategory(category.Name, user.ID)
			if err != nil {
				log.Println(err)
			}
		}

		category, err = user.GetCategoryByName(category.Name)
		if err != nil {
			log.Println(err)
		}

		err = models.CreateTask(task.Title, user.ID, category.ID)
		if err != nil {
			log.Println("err!create!")
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}

func delete(w http.ResponseWriter, r *http.Request, id int) {
	_, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		task, err := models.GetTask(id)
		if err != nil {
			log.Println(err)
		}

		err = task.DeleteTask()
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/index", 302)
	}
}

func update(w http.ResponseWriter, r *http.Request, id int) {
	_, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		task, err := models.GetTask(id)
		if err != nil {
			log.Println(err)
		}

		duration, _ := time.ParseDuration(r.PostFormValue("duration"))

		startHour, _ := strconv.Atoi(r.PostFormValue("start-time-hour"))
		startMinute, _ := strconv.Atoi(r.PostFormValue("start-time-minute"))
		endHour, _ := strconv.Atoi(r.PostFormValue("end-time-hour"))
		endMinute, _ := strconv.Atoi(r.PostFormValue("end-time-minute"))

		year, _ := strconv.Atoi(r.PostFormValue("year"))
		month, _ := strconv.Atoi(r.PostFormValue("month"))
		day, _ := strconv.Atoi(r.PostFormValue("day"))

		var startTime time.Time
		var endTime time.Time
		if task.CalculateSub() != duration {
			startTime = time.Date(year, time.Month(month), day, startHour, startMinute, 0, 0, time.Local)
			addMinute := duration.Minutes()
			endTime = startTime
			endTime = endTime.Add(time.Minute * time.Duration(addMinute))
		} else {
			startTime = time.Date(year, time.Month(month), day, startHour, startMinute, 0, 0, time.Local)
			endTime = time.Date(year, time.Month(month), day, endHour, endMinute, 0, 0, time.Local)

			if startHour > endHour {
				endTime = endTime.Add(time.Hour * 24)
			}
		}

		task.Title = r.PostFormValue("task")
		task.Category.Name = r.PostFormValue("category")
		task.StartTime = startTime
		task.EndTime = endTime
		task.Status = false

		category, err := models.GetCategory(task.CategoryID)
		if err != nil {
			log.Println(err)
		}

		category.Name = task.Category.Name

		err = task.UpdataTask()
		if err != nil {
			log.Println(err)
		}

		err = category.UpdataCategory()
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}

func stop(w http.ResponseWriter, r *http.Request, id int) {
	sess, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		_, err = sess.GetUserBySession()
		if err != nil {
			log.Println(err)
		}

		nums := strings.Split(r.PostFormValue("time"), ":")

		hour, _ := strconv.Atoi(nums[0])
		min, _ := strconv.Atoi(nums[1])
		sec, _ := strconv.Atoi(nums[2])

		task, _ := models.GetTask(id)
		task.Title = r.PostFormValue("task")
		task.EndTime = task.EndTime.Add(time.Hour * time.Duration(hour))
		task.EndTime = task.EndTime.Add(time.Minute * time.Duration(min))
		task.EndTime = task.EndTime.Add(time.Second * time.Duration(sec))

		category, _ := models.GetCategory(task.CategoryID)
		category.Name = r.PostFormValue("category")
		task.Category = category
		task.Category.Name = category.Name

		err = category.UpdataCategory()
		if err != nil {
			log.Println(err)
		}

		err = task.UpdataTask()
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}

func createCategory(w http.ResponseWriter, r *http.Request) {
	sess, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		user, err := sess.GetUserBySession()
		if err != nil {
			log.Println(err)
		}

		category := r.PostFormValue("new-category")
		log.Println(category)

		err = models.CreateCategory(category, user.ID)
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}
