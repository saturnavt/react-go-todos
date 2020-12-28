package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Task struct {
	Id    string `json:"id"`
	Title string `json:"title"`
	Task  string `json:"task"`
}

var task []Task

func NewTask(c *gin.Context) {
	var taskBody Task
	c.BindJSON(&taskBody)

	// fmt.Println(taskBody)
	timeId := time.Now()
	task = append(task, Task{Id: timeId.String(), Title: taskBody.Title, Task: taskBody.Task})
	c.JSON(200, gin.H{
		"message": "Task Created",
	})
}

func GetTasks(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": task,
	})
}

func main() {
	task = append(task, Task{Id: "a", Title: "hello", Task: "repeat"})
	task = append(task, Task{Id: "te", Title: "Doom", Task: "rocket"})
	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/api/v1/newTask", NewTask)
	router.GET("/api/v1/getTask", GetTasks)
	router.Run()
}
