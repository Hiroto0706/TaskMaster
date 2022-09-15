package models

import (
	"log"
	"time"
)

type Color struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

func CreateColor(name string, status string) (err error) {
	cmd := `insert into colors (
		name,
		status,
		created_at) values (?, ?, ?)`

	_, err = Db.Exec(cmd, name, status, time.Now())
	if err != nil {
		log.Println(err)
	}

	return err
}

func GetColors() (colors []Color, err error){
	cmd := `select id, name, status, created_at from colors`

	rows, err := Db.Query(cmd)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		var color Color
		err = rows.Scan(
			&color.ID,
			&color.Name,
			&color.Status,
			&color.CreatedAt)

		if err != nil {
			log.Println(err)
		}

		colors = append(colors, color)
	}
	rows.Close()

	return colors, err
}
