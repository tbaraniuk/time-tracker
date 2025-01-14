import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project } from '../projects/project.entity';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.tracks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @CreateDateColumn()
  createdAt: Date;
}
