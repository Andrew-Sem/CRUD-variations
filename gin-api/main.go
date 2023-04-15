package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
    "github.com/gin-contrib/cors"
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
	todos = append(todos, newTodo)
	c.IndentedJSON(http.StatusCreated, newTodo)
}

func updateTodo(c *gin.Context) {

}

func main() {
	r := gin.Default()
    r.Use(cors.New(cors.Config{
            AllowOrigins:     []string{"https://foo.com"},
            AllowMethods:     []string{"PUT", "PATCH"},
            AllowHeaders:     []string{"Origin"},
            ExposeHeaders:    []string{"Content-Length"},
            AllowCredentials: true,
            AllowOriginFunc: func(origin string) bool {
                return origin == "http://localhost:5173"
            },
            MaxAge: 12 * time.Hour,
        }))
	r.GET("/todos", getTodos)
	r.POST("/todos", createTodo)

	r.Run()
}
