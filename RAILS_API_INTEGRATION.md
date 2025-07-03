# Rails Backend API Integration

This React frontend is configured to work with a Rails backend API. Follow these instructions to set up the Rails backend.

## API Configuration

The frontend expects the Rails API to be running on `http://localhost:3001` by default. You can change this by:

1. Creating a `.env` file in the project root:
```
REACT_APP_API_URL=http://localhost:3001/api
```

2. Or by modifying `src/config/apiConfig.js`

## Required Rails API Endpoints

Your Rails backend should implement the following API endpoints:

### 1. Get All Todos
```
GET /api/todos
```

**Response:**
```json
{
  "todos": [
    {
      "id": 1,
      "text": "Learn React",
      "completed": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Create Todo
```
POST /api/todos
Content-Type: application/json
```

**Request Body:**
```json
{
  "todo": {
    "text": "New todo item",
    "completed": false
  }
}
```

**Response:**
```json
{
  "todo": {
    "id": 2,
    "text": "New todo item",
    "completed": false,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### 3. Update Todo
```
PUT /api/todos/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "todo": {
    "text": "Updated todo text",
    "completed": true
  }
}
```

**Response:**
```json
{
  "todo": {
    "id": 1,
    "text": "Updated todo text",
    "completed": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:01:00Z"
  }
}
```

### 4. Delete Todo
```
DELETE /api/todos/:id
```

**Response:** Status 204 No Content or 200 OK

## Rails Backend Setup Example

Here's an example of how to set up your Rails backend:

### 1. Routes (config/routes.rb)
```ruby
Rails.application.routes.draw do
  namespace :api do
    resources :todos, only: [:index, :create, :update, :destroy]
  end
end
```

### 2. Controller (app/controllers/api/todos_controller.rb)
```ruby
class Api::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  def index
    @todos = Todo.all
    render json: { todos: @todos }
  end

  def create
    @todo = Todo.new(todo_params)
    
    if @todo.save
      render json: { todo: @todo }, status: :created
    else
      render json: { errors: @todo.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: { todo: @todo }
    else
      render json: { errors: @todo.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:text, :completed)
  end
end
```

### 3. Model (app/models/todo.rb)
```ruby
class Todo < ApplicationRecord
  validates :text, presence: true, length: { minimum: 1, maximum: 255 }
  validates :completed, inclusion: { in: [true, false] }
end
```

### 4. Migration
```ruby
class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :text, null: false
      t.boolean :completed, default: false, null: false
      t.timestamps
    end
  end
end
```

### 5. CORS Configuration (Gemfile)
```ruby
gem 'rack-cors'
```

**config/application.rb:**
```ruby
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000' # React app URL
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
```

## Testing the Integration

1. Start your Rails server: `rails server -p 3001`
2. Start the React app: `npm start`
3. The React app will automatically connect to your Rails API

## Error Handling

The frontend includes comprehensive error handling for:
- Network connection issues
- API server errors
- Invalid responses
- Timeout issues

All errors are displayed to the user with retry options. 