import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: [] = await res.json();

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: "Id not found" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      API_KEY: `${API_KEY}`,
    },
  });

  return NextResponse.json({ mesage: `todo:${id} is deleted`, status: true });
}
export async function POST(request: Request) {
  const { userId, titles }: Partial<Todo> = await request.json();

  if (!userId) return NextResponse.json({ message: "userId is required" });

  if (!titles) return NextResponse.json({ message: "title is required" });

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      API_KEY: `${API_KEY}`,
    },
    body: JSON.stringify({ userId: userId, titles: titles, completed: false }),
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}
