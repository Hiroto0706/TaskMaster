package controllers

import (
	"log"
	"main/app/models"
	"net/http"
)

func graph(w http.ResponseWriter, r *http.Request) {
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
		task.Category = category
		task.Colors = colors

		generateHTML(w, task, "layout", "graph", "mypage_btn_public", "lists_public")
	}
}
