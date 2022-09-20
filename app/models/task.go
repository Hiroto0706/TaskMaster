package models

import (
	"fmt"
	"log"
	"time"
)

const layout = "2022-09-01 12:00:00.000000+09:00"

type Task struct {
	ID         int           `json:"id"`
	Title      string        `json:"title"`
	UserID     int           `json:"user_id"`
	CategoryID int           `json:"category_id"`
	Status     bool          `json:"status"`
	StartTime  time.Time     `json:"start_time"`
	EndTime    time.Time     `json:"end_time"`
	CreatedAt  time.Time     `json:"created_at"`
	SubTime    time.Duration `json:"subtime"`
	Category   Category      `json:"category"`
	Tasks      []Task        `json:"tasks"`
	Categories []Category    `json:"categories"`
	User       User          `json:"user"`
	Durations  []Duration    `json:"durations"`
	Colors     []Color       `json:"colors"`
}

type Duration struct {
	Date        string `json:"date"`
	Sum         string `json:"sum"`
	Tasks       []Task `json:"tasks"`
	ParentTasks []ParentTask
}

type ParentTask struct {
	ID           int
	Title        string
	CategoryName string
	CategoryID   int
	SumTime      string
	Len          int
	Tasks        []Task
	Category     Category
	Color        Color
}

func CreateTask(title string, userId int, categoryId int) (err error) {
	cmd := `insert into tasks (
		title,
		user_id,
		category_id,
		status,
		start_time,
		end_time,
		created_at) values (?, ?, ?, ?, ?, ?, ?)`

	_, err = Db.Exec(cmd, title, userId, categoryId, 1, time.Now(), time.Now(), time.Now())
	if err != nil {
		log.Println(err)
	}

	return err
}

func GetTask(id int) (task Task, err error) {
	task = Task{}
	cmd := `select id, title, user_id, category_id, status, start_time, end_time, created_at from tasks where id = ?`
	err = Db.QueryRow(cmd, id).Scan(
		&task.ID,
		&task.Title,
		&task.UserID,
		&task.CategoryID,
		&task.Status,
		&task.StartTime,
		&task.EndTime,
		&task.CreatedAt)

	task.SubTime = task.CalculateSub()

	return task, err
}

func (u *User) GetTasksByUser() (tasks []Task, err error) {
	cmd := `select id, title, user_id, category_id, status, start_time, end_time, created_at from tasks where user_id = ? order by start_time desc`
	rows, err := Db.Query(cmd, u.ID)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		var task Task
		err = rows.Scan(
			&task.ID,
			&task.Title,
			&task.UserID,
			&task.CategoryID,
			&task.Status,
			&task.StartTime,
			&task.EndTime,
			&task.CreatedAt)

		if err != nil {
			log.Println(err)
		}

		task.SubTime = task.CalculateSub()

		tasks = append(tasks, task)
	}
	rows.Close()

	return tasks, err
}

func (t *Task) UpdataTask() (err error) {
	// log.Println(t.Status)
	cmd := `update tasks set title = ?, category_id = ?, status = ?, start_time = ?, end_time = ? where id = ?`
	_, _ = Db.Exec(cmd, t.Title, t.CategoryID, t.Status, t.StartTime, t.EndTime, t.ID)
	if err != nil {
		log.Fatalln(err)
	}

	return err
}

func (t *Task) DeleteTask() (err error) {
	cmd := `delete from tasks where id = ?`
	_, err = Db.Exec(cmd, t.ID)
	if err != nil {
		log.Fatalln(err)
	}

	return err
}

func GetTargetDate(date time.Time) (formatDate string) {
	formatDate = fmt.Sprintf("%d/%d/%d", date.Year(), int(date.Month()), date.Day())

	return formatDate
}

func (t *Task) CalculateSub() (sub time.Duration) {
	t1 := t.StartTime
	t2 := t.EndTime
	sub = t2.Sub(t1)

	IntSub := int(sub)

	sub = time.Duration(IntSub)
	// log.Println(sub)

	return sub
}

func Include(slice []string, target string) bool {
	for _, str := range slice {
		if str == target {
			return true
		}
	}
	return false
}

func IncludeParentTasForTitle(parentTasks []ParentTask, target string) bool {
	for _, tar := range parentTasks {
		if tar.Title == target {
			return true
		}
	}
	return false
}
func IncludeParentTasForCategory(parentTasks []ParentTask, target string) bool {
	for _, tar := range parentTasks {
		if tar.CategoryName == target {
			return true
		}
	}
	return false
}

func TimeToString(t time.Time) string {
	str := t.Format(layout)
	return str
}

func StringToTime(str string) time.Time {
	t, _ := time.Parse(layout, str)
	return t
}

func (u *User) GetTaskByStatusTrue() (task Task, err error) {
	cmd := `select id, title, user_id, category_id, status, start_time, end_time, created_at from tasks where status = ? and user_id = ? order by created_at desc`

	_ = Db.QueryRow(cmd, 1, u.ID).Scan(
		&task.ID,
		&task.Title,
		&task.UserID,
		&task.CategoryID,
		&task.Status,
		&task.StartTime,
		&task.EndTime,
		&task.CreatedAt)

	return task, err
}

func (u *User) GetTasksByName(title string, category string, date string, categoryID int) (tasks []Task, err error) {
	cmd := `select id, title, user_id, category_id, status, start_time, end_time, created_at from tasks where user_id = ? and title = ? and category_id = ? order by start_time desc`
	rows, err := Db.Query(cmd, u.ID, title, categoryID)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		var task Task
		err = rows.Scan(
			&task.ID,
			&task.Title,
			&task.UserID,
			&task.CategoryID,
			&task.Status,
			&task.StartTime,
			&task.EndTime,
			&task.CreatedAt)

		if err != nil {
			log.Println(err)
		}

		targetDate := GetTargetDate(task.StartTime)
		if targetDate == date {
			task.SubTime = task.CalculateSub()

			category, err := GetCategory(categoryID)
			if err != nil {
				log.Println(err)
			}
			task.Category = category

			categories, _ := u.GetCategoriesByUserID()
			task.Categories = categories

			tasks = append(tasks, task)
		}
	}
	rows.Close()

	return tasks, err
}
