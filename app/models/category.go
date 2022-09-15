package models

import (
	"log"
	"time"
)

type Category struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	ColorID   int       `json:"color_id"`
	UserID    int       `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	Color     Color     `json:"color"`
}

func CreateCategory(name string, userId int) (err error) {
	cmd := `insert into categories (
		name,
		user_id,
		created_at) values (?, ?, ?)`

	_, err = Db.Exec(cmd, name, userId, time.Now())
	if err != nil {
		log.Println(err)
	}

	return err
}

func GetCategory(id int) (category Category, err error) {
	cmd := `select id, name, user_id, created_at from categories where id = ?`

	err = Db.QueryRow(cmd, id).Scan(
		&category.ID,
		&category.Name,
		&category.UserID,
		&category.CreatedAt)

	if err != nil {
		log.Println(err)
	}

	return category, err
}

func (u *User) GetCategoriesByUserID() (categories []Category, err error) {
	cmd := `select id, name, user_id, created_at from categories where user_id = ?`
	rows, err := Db.Query(cmd, u.ID)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		var category Category
		err = rows.Scan(
			&category.ID,
			&category.Name,
			&category.UserID,
			&category.CreatedAt)

		if err != nil {
			log.Println(err)
		}

		categories = append(categories, category)
	}

	rows.Close()

	return categories, err
}

func (c *Category) UpdataCategory() (err error) {
	cmd := `update categories set name = ? where id = ?`
	_, _ = Db.Exec(cmd, c.Name, c.ID)
	if err != nil {
		log.Fatalln(err)
	}

	return err
}

func (c *Category) DeleteCategory() (err error) {
	cmd := `delete from categories where id = ?`
	_, err = Db.Exec(cmd, c.ID)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (u *User) GetCategoryByName(name string) (category Category, err error) {
	cmd := `select id, name, user_id, created_at from categories where user_id = ? and name = ?`

	err = Db.QueryRow(cmd, u.ID, name).Scan(
		&category.ID,
		&category.Name,
		&category.UserID,
		&category.CreatedAt)

	if err != nil {
		log.Println(err)
	}

	return category, err
}

func CheckCategory(userId int, name string) (valid bool, err error) {
	cmd := `select id, name, user_id, created_at from categories where user_id = ? and name = ?`

	categories := []Category{}
	rows, err := Db.Query(cmd, userId, name)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		var category Category

		err = rows.Scan(
			&category.ID,
			&category.Name,
			&category.UserID,
			&category.CreatedAt)

		if err != nil {
			log.Println(err)
		}

		categories = append(categories, category)
	}

	// log.Println(categories)

	valid = false
	if len(categories) == 0 {
		valid = false
		// log.Println("noting!")
		return
	}

	valid = true
	// log.Println("true!!")

	return valid, err
}
