// todo.ts

export type ThemeMode = "light" | "dark";

export interface Theme {
  mode: ThemeMode;
  padding: string;
  borderRadius: string;
  fontSize: string;
}

export const lightTheme: Theme = {
  mode: "light",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "16px",
};

export const darkTheme: Theme = {
  mode: "dark",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "16px",
};

export function getTheme(mode: ThemeMode): Theme {
  return mode === "dark" ? darkTheme : lightTheme;
}

// ------------------------------------
// Todo types and logic
// ------------------------------------

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoList {
  private todos: Todo[] = [];

  constructor(private theme: Theme) {}

  add(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  toggle(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  remove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  print(): void {
    console.log(`--- TODO LIST (${this.theme.mode} theme) ---`);
    this.todos.forEach(todo => {
      const status = todo.completed ? "v" : "x";
      console.log(`${status} ${todo.text}`);
    });
  }
}

// Example usage
const theme = getTheme("light");
const todos = new TodoList(theme);

todos.add("Learn TypeScript");
todos.add("Build a themed Todo list");
todos.toggle(1);
todos.print();
