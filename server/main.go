package main

import (
	"fmt"
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

func DeleteTask(c *gin.Context) {
	var taskBody Task
	c.BindJSON(&taskBody)
	for i := 0; i < len(task); i++ {
		if task[i].Id == c.Param("idToDelete") {
			task = append(task[:i], task[i+1:]...)
		}
	}
	c.JSON(200, gin.H{
		"message": "Task Delete",
	})
}

func UpdateTask(c *gin.Context) {
	var taskBody Task
	c.BindJSON(&taskBody)
	fmt.Println("task id: ", taskBody.Title)
	for i := 0; i < len(task); i++ {
		if task[i].Id == c.Param("this.state.idEdit") {
			task[i].Title = taskBody.Title
			task[i].Task = taskBody.Task
		}
	}
	c.JSON(200, gin.H{
		"response": "Task Updated",
	})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	task = append(task, Task{Id: "a", Title: "hello", Task: "repeat"})
	task = append(task, Task{Id: "te", Title: "Doom", Task: "rocket"})

	router.POST("/api/v1/newTask", NewTask)
	router.GET("/api/v1/getTask", GetTasks)
	router.PUT("/api/v1/updateTask/:this.state.idEdit", UpdateTask)
	router.DELETE("/api/v1/deleteTask/:idToDelete", DeleteTask)

	router.Run()
}
