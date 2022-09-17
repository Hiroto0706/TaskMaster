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
				// log.Println(err)
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

		// duration start
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
					tasks[j].Categories, _ = user.GetCategoriesByUserID()
					duration.Tasks = append(duration.Tasks, tasks[j])

					sum += tasks[j].SubTime.Minutes()

					parentTask := models.ParentTask{
						ID:           tasks[j].ID,
						Title:        tasks[j].Title,
						CategoryName: tasks[j].Category.Name,
						CategoryID:   tasks[j].CategoryID,
					}

					if len(duration.ParentTasks) == 0 {
						duration.ParentTasks = append(duration.ParentTasks, parentTask)
					} else {
						valid1 := models.IncludeParentTasForTitle(duration.ParentTasks, parentTask.Title)
						valid2 := models.IncludeParentTasForCategory(duration.ParentTasks, parentTask.CategoryName)

						if valid1 == false || valid2 == false {
							duration.ParentTasks = append(duration.ParentTasks, parentTask)
						}
					}
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

			for j, _ := range duration.ParentTasks {
				// log.Println(duration.ParentTasks[j])
				tasks, _ := user.GetTasksByName(duration.ParentTasks[j].Title, duration.ParentTasks[j].CategoryName, dates[i], duration.ParentTasks[j].CategoryID)

				category, _ := models.GetCategory(duration.ParentTasks[j].CategoryID)
				color, _ := models.GetColor(category.ColorID)

				duration.ParentTasks[j].Len = len(tasks)
				duration.ParentTasks[j].Tasks = tasks
				duration.ParentTasks[j].Category = category
				duration.ParentTasks[j].Color = color

				sum = 0
				for k, _ := range duration.ParentTasks[j].Tasks {
					tasks[k].SubTime = tasks[k].CalculateSub()
					sum += tasks[k].SubTime.Seconds()
				}

				hour := fmt.Sprintf("%d", int(sum)/60/60)

				var min string
				if ((int(sum) / 60) % 60) < 10 {
					min = fmt.Sprintf("0%d", (int(sum)/60)%60)
				} else {
					min = fmt.Sprintf("%d", (int(sum)/60)%60)
				}

				var sec string
				if (int(sum) % 60) < 10 {
					sec = fmt.Sprintf("0%d", int(sum)%60)
				} else {
					sec = fmt.Sprintf("%d", int(sum)%60)
				}

				duration.ParentTasks[j].SumTime = fmt.Sprintf("%s:%s:%s", hour, min, sec)
			}

			durations = append(durations, duration)

			// log.Println(duration.ParentTasks, duration.Date)
		}
		// duration end

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
					task.SubTime = task.CalculateSub()
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
						task.SubTime = task.CalculateSub()
						tasksForSearch = append(tasksForSearch, task)
					}
				}
			}
		}

		allColors, _ := models.GetColors()
		var colors []models.Color
		for i := 0; i < 9; i++ {
			colors = append(colors, allColors[i])
		}

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

		colorStr := r.PostFormValue("color")
		// log.Println(colorStr)
		var color int
		if colorStr == "0" {
			color = 10
		} else {
			color, _ = strconv.Atoi(colorStr)
		}

		// log.Println(color)

		category := models.Category{
			Name:    r.PostFormValue("category"),
			ColorID: color,
		}

		// log.Println(category)

		valid, _ := models.CheckCategory(user.ID, category.Name)
		// log.Println(valid)

		if valid == false && category.Name != "" {
			categorySum := user.CategorySum()
			log.Println(categorySum)

			if categorySum < 15 {
				err = models.CreateCategory(category.Name, category.ColorID, user.ID)
				if err != nil {
					log.Println(err)
				}
			}
		}

		category, err = user.GetCategoryByCategoryName(category.Name)
		if err != nil {
			log.Println(err)
		}

		category.ColorID = color

		err = category.UpdataCategory()
		if err != nil {
			log.Println(err)
		}

		// log.Println(category)

		err = models.CreateTask(task.Title, user.ID, category.ID)
		if err != nil {
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
	sess, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		user, _ := sess.GetUserBySession()

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

		// log.Println(task.Category.Name)

		// fmt.Println(task.Title, task.Category.Name)

		category, err := user.GetCategoryByCategoryName(task.Category.Name)
		if err != nil {
			log.Println(err)
		}

		// log.Println(category)

		// colorId, _ := strconv.Atoi(r.PostFormValue("color"))
		// if colorId == 0 {
		// 	colorId = 10
		// }

		// category.ColorID = colorId
		// category.Name = task.Category.Name
		task.CategoryID = category.ID

		err = task.UpdataTask()
		if err != nil {
			log.Println(err)
		}

		// if category.ID == 0 {
		// 	err = models.CreateCategory(category.Name, category.ColorID, user.ID)

		// 	category, _ = user.GetCategoryByName(category.Name, category.ColorID)
		// }

		// log.Println(category)

		// err = category.UpdataCategory()
		// if err != nil {
		// 	log.Println(err)
		// }

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

		color, _ := strconv.Atoi(r.PostFormValue("color"))

		category, _ := models.GetCategory(task.CategoryID)
		category.ColorID = color
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

		categoryName := r.PostFormValue("new-category")
		// log.Println(categoryName)

		categoryColor := 10

		// log.Println(categoryColor)

		categorySum := user.CategorySum()
		// log.Println(categorySum)

		if categorySum < 15 {
			err = models.CreateCategory(categoryName, categoryColor, user.ID)
			if err != nil {
				log.Println(err)
			}
		}

		http.Redirect(w, r, "/", 302)
	}
}

func updateCategory(w http.ResponseWriter, r *http.Request, id int) {
	_, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		categoryName := r.PostFormValue("category-name")
		categoryColor, _ := strconv.Atoi(r.PostFormValue("category-color"))

		category, err := models.GetCategory(id)
		if err != nil {
			log.Println(err)
		}

		category.Name = categoryName
		category.ColorID = categoryColor

		err = category.UpdataCategory()
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}

func deleteCategory(w http.ResponseWriter, r *http.Request, id int) {
	_, err := session(w, r)
	if err != nil {
		http.Redirect(w, r, "/", 302)
	} else {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}

		category, _ := models.GetCategory(id)

		err = category.DeleteCategory()
		if err != nil {
			log.Println(err)
		}

		http.Redirect(w, r, "/", 302)
	}
}
