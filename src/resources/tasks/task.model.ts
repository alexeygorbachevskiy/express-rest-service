import { v1 as uuid } from 'uuid';
import {
  Entity,
  Column as TColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Column, { IColumn } from '../boards/column.model';
import Board, { IBoard } from '../boards/board.model';
import User from '../users/user.model';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

@Entity({ name: 'task' })
class Task implements ITask {
  constructor(
    {
      id = uuid(),
      title = 'TITLE',
      order = 0,
      description = 'DESCRIPTION',
      userId = null,
      boardId = null,
      columnId = null,
    } = {} as ITask
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn('varchar', { length: 50 })
  title: string;

  @TColumn('integer')
  order: number;

  @TColumn('varchar', { length: 50 })
  description: string;

  @TColumn({ type: 'varchar', nullable: true })
  userId: string | null;

  @TColumn({ type: 'varchar', nullable: true })
  boardId: string | null;

  @TColumn({ type: 'varchar', nullable: true })
  columnId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user!: User;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: IBoard;

  @ManyToOne(() => Column, { onDelete: 'SET NULL' })
  column!: IColumn;

  static fromRequest(body: ITask): ITask {
    return new Task(body);
  }
}

export default Task;
