package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type todo struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

var todos = []todo{
	{ID: "0", Title: "First todo", Description: "Go to the shop"},
	{ID: "1", Title: "Second todo", Description: "Buy groceries"},
	{ID: "2", Title: "Third todo", Description: "Go home"},
}

func getTodos(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, todos)
}

func createTodo(c *gin.Context) {
	var newTodo todo
	if err := c.BindJSON(&newTodo); err != nil {
		return
	}
	randomID := uuid.New()
	newTodo.ID = randomID.String()
	todos = append(todos, newTodo)
	c.IndentedJSON(http.StatusCreated, newTodo)
}

func updateTodo(c *gin.Context) {

}

func deleteTodo(c *gin.Context) {
	id := c.Param("id")
	index := -1
	var deletedTodo todo
	for i, t := range todos {
		if t.ID == id {
			index = i
			deletedTodo = t
			break
		}
	}

	if index == -1 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	todos = append(todos[:index], todos[index+1:]...)

	c.IndentedJSON(http.StatusOK, deletedTodo)
}


func main() {
	r := gin.Default()
    r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"}, // Include Content-Type
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:5173"
		},
		MaxAge: 12 * time.Hour,
	}))
	
	r.GET("/todos", getTodos)
	r.POST("/todos", createTodo)
	r.DELETE("/todos/:id", deleteTodo)

	r.Run()
}
