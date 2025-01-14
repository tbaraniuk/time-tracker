import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Track } from '../tracks/track.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Track, (track) => track.project, { cascade: true })
  tracks: Track[];

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
