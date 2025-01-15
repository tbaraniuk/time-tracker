import { IsNumber, IsPositive, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Project } from '../projects/project.entity';

@Entity({ name: 'tracks' })
export class Track {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Column()
  total: number;

  @ApiProperty()
  @IsString()
  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.tracks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Column()
  projectId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
