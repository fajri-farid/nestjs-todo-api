import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as admin from 'firebase-admin';
import { removeUndefined } from './utils/removeUndefined';

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodosService {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {
    this.collection = this.firebaseApp.firestore().collection('todos');
  }

  async findAll(): Promise<Todo[]> {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Todo,
      );
    } catch (err) {
      console.error('FIREBASE ERROR:', err);
      throw err;
    }
  }

  async findByFilters(
    isCompleted?: boolean,
    limit?: number,
    search?: string,
    sortBy: 'createdAt' | 'updatedAt' = 'createdAt',
    orderBy: 'asc' | 'desc' = 'desc',
  ): Promise<Todo[]> {
    let query: FirebaseFirestore.Query = this.collection;

    // Filter status
    if (isCompleted !== undefined) {
      query = query.where('isCompleted', '==', isCompleted);
    }

    // Search by title
    if (search) {
      query = query
        .where('title', '>=', search)
        .where('title', '<=', search + '\uf8ff');
    }

    // Sort by field - Firestore hanya bisa single sort
    query = query.orderBy(
      sortBy,
      orderBy as FirebaseFirestore.OrderByDirection,
    );

    // Ambil semua data dulu
    const snapshot = await query.get();
    let results = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Todo,
    );

    // **DUAL SORTING di memory** - ini yang bikin sorting jadi beda
    // Priority 1: Incomplete todos first
    // Priority 2: Sort by selected field
    results = results.sort((a, b) => {
      // Incomplete todos (false) come first
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // Same completion status, sort by field
      const fieldA = new Date(a[sortBy]).getTime();
      const fieldB = new Date(b[sortBy]).getTime();

      return orderBy === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });

    // Apply limit after sorting
    if (limit) {
      results = results.slice(0, limit);
    }

    return results;
  }

  async findOneById(id: string): Promise<Todo> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return { id: doc.id, ...doc.data() } as Todo;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const now = new Date();

    const docRef = await this.collection.add({
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted ?? false,
      createdAt: now,
      updatedAt: now,
    });

    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Todo;
  }

  async updateOneById(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    await docRef.update({
      ...removeUndefined(updateTodoDto),
      updatedAt: new Date(),
    });

    const updated = await docRef.get();
    return { id: updated.id, ...updated.data() } as Todo;
  }

  async deleteOneById(id: string): Promise<void> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await docRef.delete();
  }
}
