import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Task from "@/app/lib/taskModel";


export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}


export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  const newTask = await Task.create(data);
  return NextResponse.json(newTask, { status: 201 });
}
