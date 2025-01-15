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
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@Entity({ name: 'projects' })
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsString()
  @Column()
  description: string;

  @OneToMany(() => Track, (track) => track.project, { cascade: true })
  tracks: Track[];

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Column()
  userId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
